import random
import string
import uuid
from datetime import datetime, timezone
from typing import Dict, Any, Tuple
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.models.user import User, CasteCategoryEnum
from app.models.scheme import ScholarshipScheme
from app.models.application import Application, ApplicationStatusEnum
from app.models.document import ApplicationDocument, DocumentTypeEnum, DocumentStatusEnum
from app.models.audit import AuditLog
from app.schemas.sync import OfflineApplicationSyncPayload, ApplicationSyncResponse
from app.services.idempotency_service import IdempotencyService
from app.core.security import hash_aadhaar, mask_aadhaar
from app.core.exceptions import SchemeNotFoundException
from app.workers.digilocker_tasks import fetch_digilocker_documents_task

class ApplicationSyncService:
    @staticmethod
    def generate_application_number() -> str:
        """Generates sovereign format reference: EKL-2026-XXXXXX."""
        rand_code = ''.join(random.choices(string.digits, k=6))
        return f"EKL-2026-{rand_code}"

    @classmethod
    async def process_sync_payload(
        cls,
        db: AsyncSession,
        payload: OfflineApplicationSyncPayload,
        client_ip: str = "127.0.0.1"
    ) -> ApplicationSyncResponse:
        """
        Executes atomic idempotent synchronization for offline mobile submissions.
        Guarantees that a duplicate sync_uuid produces zero duplicate rows while returning
        the previous successful outcome.
        """
        payload_dict = payload.model_dump()
        payload_hash = IdempotencyService.compute_payload_hash(payload_dict)
        endpoint = "/api/v1/applications/sync"

        # 1. Acquire or check idempotency state
        is_duplicate, cached_body = await IdempotencyService.acquire_or_check(
            db=db,
            sync_uuid=payload.sync_uuid,
            endpoint=endpoint,
            payload_hash=payload_hash
        )

        if is_duplicate and cached_body:
            # Return cached response instantly (Safe Replay)
            cached_body["is_cached_replay"] = True
            return ApplicationSyncResponse(**cached_body)

        try:
            # 2. Resolve Scheme
            scheme_stmt = select(ScholarshipScheme).where(ScholarshipScheme.scheme_code == payload.scheme_code)
            scheme_res = await db.execute(scheme_stmt)
            scheme = scheme_res.scalars().first()

            if not scheme:
                # Provide fallback default scheme if database is newly seeded
                scheme = ScholarshipScheme(
                    scheme_code=payload.scheme_code,
                    scheme_name=f"Unified Post-Matric Scholarship ({payload.student_details.caste_category.value})",
                    ministry="Ministry of Tribal Affairs",
                    max_income_limit=250000.00,
                    disbursal_amount=28000.00,
                    is_active=True
                )
                db.add(scheme)
                await db.flush()

            # 3. Resolve or Create User (Deduplicated via Aadhaar Hash)
            aadhaar_h = hash_aadhaar(payload.user_aadhaar_raw)
            aadhaar_m = mask_aadhaar(payload.user_aadhaar_raw)

            user_stmt = select(User).where(User.aadhaar_hash == aadhaar_h)
            user_res = await db.execute(user_stmt)
            user = user_res.scalars().first()

            if not user:
                user = User(
                    aadhaar_hash=aadhaar_h,
                    aadhaar_masked=aadhaar_m,
                    phone=payload.user_phone,
                    full_name=payload.student_details.full_name,
                    caste_category=payload.student_details.caste_category,
                    annual_family_income=payload.student_details.annual_family_income,
                    college_name=payload.student_details.college_name,
                    roll_number=payload.student_details.roll_number,
                    state=payload.student_details.state,
                    district=payload.student_details.district,
                    preferred_language=payload.student_details.preferred_language
                )
                db.add(user)
                await db.flush()
            else:
                # Update user profile with latest verified details
                user.college_name = payload.student_details.college_name
                user.roll_number = payload.student_details.roll_number
                user.annual_family_income = payload.student_details.annual_family_income
                await db.flush()

            # 4. Insert Application entity
            app_number = cls.generate_application_number()
            application = Application(
                sync_uuid=payload.sync_uuid,
                application_number=app_number,
                user_id=user.id,
                scheme_id=scheme.id,
                academic_year=payload.academic_year,
                status=ApplicationStatusEnum.SUBMITTED,
                client_created_at=payload.client_timestamp,
                submitted_at=datetime.now(timezone.utc),
                payload_snapshot=payload_dict
            )
            db.add(application)
            await db.flush()

            # 5. Insert Document records
            for doc_in in payload.documents:
                doc_record = ApplicationDocument(
                    application_id=application.id,
                    doc_type=doc_in.doc_type,
                    doc_status=DocumentStatusEnum.UPLOADED_WEBP if doc_in.file_url else DocumentStatusEnum.PENDING_FETCH,
                    file_url=doc_in.file_url,
                    file_hash_sha256=doc_in.file_hash_sha256,
                    mime_type=doc_in.mime_type,
                    file_size_kb=doc_in.file_size_kb,
                    digilocker_uri=doc_in.digilocker_uri
                )
                db.add(doc_record)
            await db.flush()

            # 6. Immutable Audit Log
            audit = AuditLog(
                application_id=application.id,
                action="OFFLINE_SYNC_INGESTED",
                previous_status="DRAFT",
                new_status=ApplicationStatusEnum.SUBMITTED.value,
                actor_type="STUDENT_MOBILE_CLIENT",
                actor_id=str(user.id),
                remarks=f"Offline application synced via sync_uuid {payload.sync_uuid}.",
                metadata_json={"ip": client_ip, "device": payload.client_metadata}
            )
            db.add(audit)
            await db.flush()

            # 7. Asynchronously trigger DigiLocker Verification task in Celery
            celery_task = fetch_digilocker_documents_task.delay(str(application.id))
            job_id = celery_task.id if celery_task else None

            # 8. Build success response
            response_data = ApplicationSyncResponse(
                success=True,
                message="Offline scholarship application received and queued for DigiLocker verification.",
                sync_uuid=payload.sync_uuid,
                application_number=application.application_number,
                status=application.status.value,
                server_timestamp=datetime.now(timezone.utc),
                is_cached_replay=False,
                digilocker_queued=True,
                digilocker_job_id=job_id
            )

            # 9. Mark idempotency record COMPLETED
            await IdempotencyService.mark_completed(
                db=db,
                sync_uuid=payload.sync_uuid,
                response_code=201,
                response_body=response_data.model_dump(mode="json")
            )

            # 10. Commit all operations in one atomic transaction
            await db.commit()
            return response_data

        except Exception as e:
            await db.rollback()
            # Mark idempotency record FAILED so client can retry safely
            async with AsyncSessionLocal() as failure_session:
                await IdempotencyService.mark_failed(failure_session, payload.sync_uuid)
                await failure_session.commit()
            raise e
