import asyncio
import logging
from typing import Dict, Any, Optional

logger = logging.getLogger("eklavya.integrations")

class MockAadhaarService:
    """Simulates UIDAI Aadhaar OTP and Demographic verification."""
    
    @staticmethod
    async def verify_demographics(aadhaar_raw: str, full_name: str, dob: str) -> Dict[str, Any]:
        await asyncio.sleep(0.1)  # Simulate network latency
        return {
            "verified": True,
            "uidai_auth_code": "UIDAI-AUTH-2026-992147",
            "name_match_score": 98.5,
            "status": "SUCCESS"
        }

class MockDigiLockerService:
    """Simulates DigiLocker certificate pull and digital signature verification."""

    @staticmethod
    async def fetch_issued_document(doc_type: str, student_aadhaar_hash: str) -> Dict[str, Any]:
        """Simulates pulling XML/PDF certificate directly from State e-District repository."""
        await asyncio.sleep(0.5)
        doc_uris = {
            "INCOME_CERT": f"in.gov.mp.edistrict-INCER-2026-{student_aadhaar_hash[:8]}",
            "CASTE_CERT": f"in.gov.mp.edistrict-CAST-2026-{student_aadhaar_hash[:8]}",
            "DOMICILE_CERT": f"in.gov.mp.edistrict-DOM-2026-{student_aadhaar_hash[:8]}",
            "MARKSHEET": f"in.gov.cbse.hsc-2023-{student_aadhaar_hash[:8]}",
        }
        
        return {
            "success": True,
            "uri": doc_uris.get(doc_type, f"in.gov.generic-{student_aadhaar_hash[:8]}"),
            "issuer": "Revenue Department, Govt of Madhya Pradesh",
            "digital_signature_valid": True,
            "issued_date": "2024-05-15",
            "document_hash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
            "download_url": f"https://mock.digilocker.gov.in/artifacts/{doc_type.lower()}_verified.pdf"
        }

class MockPFMSTrackerService:
    """Simulates Direct Benefit Transfer (DBT) tracking via PFMS."""

    @staticmethod
    async def get_disbursal_status(application_number: str) -> Dict[str, Any]:
        return {
            "application_number": application_number,
            "pfms_transaction_id": "PFMS-DBT-2026-0038491",
            "bank_status": "CREDITED",
            "utr_number": "UTR882910482910",
            "amount": 28000.00,
            "disbursal_date": "2026-08-14"
        }
