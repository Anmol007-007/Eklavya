import enum
import uuid
from datetime import datetime, timezone
from typing import Optional
from sqlalchemy import String, Integer, JSON, Enum, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column
from app.models.base import Base

class IdempotencyStatusEnum(str, enum.Enum):
    PROCESSING = "PROCESSING"
    COMPLETED = "COMPLETED"
    FAILED = "FAILED"

class IdempotencyRecord(Base):
    __tablename__ = "idempotency_records"

    # sync_uuid generated client-side is the primary key
    sync_uuid: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        index=True
    )
    user_id: Mapped[Optional[uuid.UUID]] = mapped_column(UUID(as_uuid=True), nullable=True)
    endpoint: Mapped[str] = mapped_column(String(200), nullable=False)
    request_hash: Mapped[str] = mapped_column(String(64), nullable=False)
    
    status: Mapped[IdempotencyStatusEnum] = mapped_column(
        Enum(IdempotencyStatusEnum, name="idempotency_status_enum"),
        default=IdempotencyStatusEnum.PROCESSING,
        nullable=False
    )
    response_code: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    response_body: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
        nullable=False
    )
