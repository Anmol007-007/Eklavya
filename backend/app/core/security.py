import hashlib
from datetime import datetime, timedelta, timezone
from typing import Any, Optional, Union
from jose import jwt
from passlib.context import CryptContext
from app.core.config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def create_access_token(subject: Union[str, Any], expires_delta: Optional[timedelta] = None) -> str:
    """Generates a signed JWT access token."""
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode = {"exp": expire, "sub": str(subject)}
    return jwt.encode(to_encode, settings.JWT_SECRET_KEY, algorithm=settings.JWT_ALGORITHM)

def decode_access_token(token: str) -> dict:
    """Decodes and validates a JWT token."""
    return jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=[settings.JWT_ALGORITHM])

def hash_aadhaar(aadhaar_raw: str) -> str:
    """
    Creates a irreversible cryptographic SHA-256 hash with salt for Aadhaar deduplication,
    complying with UIDAI storage regulations (no raw 12-digit Aadhaar stored).
    """
    salt = settings.JWT_SECRET_KEY[:16]
    return hashlib.sha256((salt + aadhaar_raw.strip()).encode("utf-8")).hexdigest()

def mask_aadhaar(aadhaar_raw: str) -> str:
    """Returns masked format XXXX-XXXX-1234 for display purposes."""
    clean = aadhaar_raw.replace("-", "").replace(" ", "").strip()
    if len(clean) == 12:
        return f"XXXX-XXXX-{clean[-4:]}"
    return "XXXX-XXXX-XXXX"
