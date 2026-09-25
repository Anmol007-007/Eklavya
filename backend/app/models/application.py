import enum
import uuid
from datetime import datetime, timezone
from typing import List, Optional
from sqlalchemy import String, DateTime, ForeignKey, Enum, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base import Base, UUIDPrimaryKeyMixin, TimestampMixin

class ApplicationStatusEnum(str, enum.Enum):
    DRAFT = "DRAFT"
    SUBMITTED = "SUBMITTED"
    INSTITUTE_VERIFIED = "INSTITUTE_VERIFIED"
    NODAL_APPROVED = "NODAL_APPROVED"
    DISBURSED = "DISBURSED"
    REJECTED = "REJECTED"

class Application(Base, UUIDPrimaryKeyMixin, TimestampMixin):
    __tablename__ = "applications"

    # Distributed offline client idempotency identifier
    sync_uuid: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        unique=True,
        index=True,
        nullable=False
    )
    application_number: Mapped[str] = mapped_column(String(50), unique=True, index=True, nullable=False)
    
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    scheme_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("scholarship_schemes.id"), nullable=False)
    
    academic_year: Mapped[str] = mapped_column(String(20), default="2026-2027", nullable=False)
    status: Mapped[ApplicationStatusEnum] = mapped_column(
        Enum(ApplicationStatusEnum, name="application_status_enum"),
        default=ApplicationStatusEnum.SUBMITTED,
        index=True,
        nullable=False
    )
    
    # Store-and-forward telemetry
    client_created_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
    submitted_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False
    )
    payload_snapshot: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)

    # Relationships
    user: Mapped["User"] = relationship("User", back_populates="applications")
    scheme: Mapped["ScholarshipScheme"] = relationship("ScholarshipScheme", back_populates="applications")
    documents: Mapped[List["ApplicationDocument"]] = relationship("ApplicationDocument", back_populates="application", cascade="all, delete-orphan")
    audit_logs: Mapped[List["AuditLog"]] = relationship("AuditLog", back_populates="application", cascade="all, delete-orphan")
