import enum
from datetime import date
from typing import List, Optional
from sqlalchemy import String, Date, Numeric, Enum
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base import Base, UUIDPrimaryKeyMixin, TimestampMixin

class CasteCategoryEnum(str, enum.Enum):
    ST = "ST"          # Scheduled Tribe
    SC = "SC"          # Scheduled Caste
    OBC = "OBC"        # Other Backward Class
    GENERAL = "GENERAL"

class User(Base, UUIDPrimaryKeyMixin, TimestampMixin):
    __tablename__ = "users"

    aadhaar_hash: Mapped[str] = mapped_column(String(64), unique=True, index=True, nullable=False)
    aadhaar_masked: Mapped[str] = mapped_column(String(16), nullable=False)
    phone: Mapped[str] = mapped_column(String(15), unique=True, index=True, nullable=False)
    
    # Demographics
    full_name: Mapped[str] = mapped_column(String(120), nullable=False)
    dob: Mapped[Optional[date]] = mapped_column(Date, nullable=True)
    gender: Mapped[Optional[str]] = mapped_column(String(20), nullable=True)
    caste_category: Mapped[CasteCategoryEnum] = mapped_column(
        Enum(CasteCategoryEnum, name="caste_category_enum"),
        default=CasteCategoryEnum.ST,
        nullable=False
    )
    annual_family_income: Mapped[Optional[float]] = mapped_column(Numeric(12, 2), nullable=True)
    
    # Academic Demographics
    college_name: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    roll_number: Mapped[Optional[str]] = mapped_column(String(60), nullable=True)
    state: Mapped[Optional[str]] = mapped_column(String(60), nullable=True)
    district: Mapped[Optional[str]] = mapped_column(String(60), nullable=True)
    
    # Localization preference
    preferred_language: Mapped[str] = mapped_column(String(10), default="en", nullable=False)
    
    # Relationships
    applications: Mapped[List["Application"]] = relationship("Application", back_populates="user", cascade="all, delete-orphan")
