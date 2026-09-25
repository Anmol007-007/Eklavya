from typing import List, Optional
from sqlalchemy import String, Text, Numeric, Integer, Boolean, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base import Base, UUIDPrimaryKeyMixin, TimestampMixin

class ScholarshipScheme(Base, UUIDPrimaryKeyMixin, TimestampMixin):
    __tablename__ = "scholarship_schemes"

    scheme_code: Mapped[str] = mapped_column(String(50), unique=True, index=True, nullable=False)
    scheme_name: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    ministry: Mapped[str] = mapped_column(String(120), default="Ministry of Tribal Affairs", nullable=False)
    
    # Eligibility criteria rules
    max_income_limit: Mapped[Optional[float]] = mapped_column(Numeric(12, 2), nullable=True)
    max_age: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    allowed_castes: Mapped[dict] = mapped_column(JSON, default=list, nullable=False)  # e.g., ["ST", "OBC"]
    disbursal_amount: Mapped[float] = mapped_column(Numeric(10, 2), default=0.0, nullable=False)
    
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)

    # Relationships
    applications: Mapped[List["Application"]] = relationship("Application", back_populates="scheme")
