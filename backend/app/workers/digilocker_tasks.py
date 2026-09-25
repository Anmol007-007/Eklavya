import asyncio
import time
import logging
from typing import Dict, Any
from app.core.celery_app import celery_app
from app.core.database import AsyncSessionLocal
from app.models.application import Application, ApplicationStatusEnum
from app.models.document import ApplicationDocument, DocumentStatusEnum
from app.models.audit import AuditLog
from app.models.user import User
from app.services.mock_integrations import MockDigiLockerService
from sqlalchemy import select
from sqlalchemy.orm import selectinload

logger = logging.getLogger(__name__)

async def _process_digilocker_fetch_async(application_id_str: str) -> Dict[str, Any]:
    """Async business logic for DigiLocker document synchronization."""
    import uuid
    app_uuid = uuid.UUID(application_id_str)
    
    async with AsyncSessionLocal() as session:
        # Load application along with user and documents
        stmt = (
            select(Application)
            .options(selectinload(Application.documents), selectinload(Application.user))
            .where(Application.id == app_uuid)
        )
        res = await session.execute(stmt)
        application = res.scalars().first()

        if not application:
            logger.error(f"[DigiLocker Worker] Application {application_id_str} not found.")
            return {"success": False, "error": "Application not found"}

        user = application.user
        verified_count = 0

        # Simulate fetching government-issued certificates for pending documents
        for doc in application.documents:
            if doc.doc_status in (DocumentStatusEnum.UPLOADED_WEBP, DocumentStatusEnum.PENDING_FETCH):
                logger.info(f"[DigiLocker Worker] Querying DigiLocker API for {doc.doc_type.value}...")
                
                # Call DigiLocker Service simulation
                dl_result = await MockDigiLockerService.fetch_issued_document(
                    doc_type=doc.doc_type.value,
                    student_aadhaar_hash=user.aadhaar_hash
                )
                
                if dl_result.get("success"):
                    doc.doc_status = DocumentStatusEnum.VERIFIED_DIGILOCKER
                    doc.digilocker_uri = dl_result.get("uri")
                    doc.digilocker_metadata = {
                        "issuer": dl_result.get("issuer"),
                        "digital_signature_valid": dl_result.get("digital_signature_valid"),
                        "issued_date": dl_result.get("issued_date"),
                        "verified_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
                        "download_url": dl_result.get("download_url")
                    }
                    verified_count += 1

        # Record immutable audit entry
        audit_entry = AuditLog(
            application_id=application.id,
            action="DIGILOCKER_DOCUMENTS_VERIFIED",
            previous_status=application.status.value,
            new_status=application.status.value,
            actor_type="CELERY_DIGILOCKER_WORKER",
            actor_id="WORKER-DL-01",
            remarks=f"Asynchronously verified {verified_count} documents from DigiLocker repository.",
            metadata_json={"verified_count": verified_count}
        )
        session.add(audit_entry)

        # Advance status if key documents verified
        if verified_count >= 1 and application.status == ApplicationStatusEnum.SUBMITTED:
            prev_status = application.status.value
            application.status = ApplicationStatusEnum.INSTITUTE_VERIFIED
            
            stage_audit = AuditLog(
                application_id=application.id,
                action="STATUS_CHANGE",
                previous_status=prev_status,
                new_status=ApplicationStatusEnum.INSTITUTE_VERIFIED.value,
                actor_type="SYSTEM_WORKER",
                actor_id="WORKER-AUTO-VERIFIER",
                remarks="Auto-advanced to INSTITUTE_VERIFIED after successful DigiLocker certificate match."
            )
            session.add(stage_audit)

        await session.commit()
        logger.info(f"[DigiLocker Worker] Successfully processed application {application.application_number}")
        
        return {
            "success": True,
            "application_id": application_id_str,
            "verified_count": verified_count,
            "current_status": application.status.value
        }

@celery_app.task(name="tasks.fetch_digilocker_documents", bind=True, max_retries=3, default_retry_delay=10)
def fetch_digilocker_documents_task(self, application_id: str) -> Dict[str, Any]:
    """
    Celery background worker task triggered upon application submission.
    Pulls certificates from DigiLocker repository without blocking the HTTP sync thread.
    """
    try:
        logger.info(f"Starting Celery background job for application {application_id}")
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        result = loop.run_until_complete(_process_digilocker_fetch_async(application_id))
        loop.close()
        return result
    except Exception as exc:
        logger.error(f"Error in DigiLocker task for {application_id}: {exc}", exc_info=True)
        raise self.retry(exc=exc)
