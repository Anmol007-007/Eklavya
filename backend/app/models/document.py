import enum
import uuid
from typing import Optional
from sqlalchemy import String ,ForeignKey ,Enum ,JSON ,Float
from sqlalchemy .dialects .postgresql import UUID
from sqlalchemy .orm import Mapped ,mapped_column ,relationship
from app .models .base import Base ,UUIDPrimaryKeyMixin ,TimestampMixin
class DocumentTypeEnum (str ,enum .Enum ):
    INCOME_CERT ="INCOME_CERT"
    CASTE_CERT ="CASTE_CERT"
    DOMICILE_CERT ="DOMICILE_CERT"
    MARKSHEET ="MARKSHEET"
    AADHAAR ="AADHAAR"
    BANK_PASSBOOK ="BANK_PASSBOOK"
class DocumentStatusEnum (str ,enum .Enum ):
    PENDING_FETCH ="PENDING_FETCH"
    UPLOADED_WEBP ="UPLOADED_WEBP"
    VERIFIED_DIGILOCKER ="VERIFIED_DIGILOCKER"
    FAILED_VERIFICATION ="FAILED_VERIFICATION"
class ApplicationDocument (Base ,UUIDPrimaryKeyMixin ,TimestampMixin ):
    __tablename__ ="application_documents"
    application_id :Mapped [uuid .UUID ]=mapped_column (
    UUID (as_uuid =True ),
    ForeignKey ("applications.id",ondelete ="CASCADE"),
    nullable =False ,
    index =True
    )
    doc_type :Mapped [DocumentTypeEnum ]=mapped_column (
    Enum (DocumentTypeEnum ,name ="document_type_enum"),
    nullable =False
    )
    doc_status :Mapped [DocumentStatusEnum ]=mapped_column (
    Enum (DocumentStatusEnum ,name ="document_status_enum"),
    default =DocumentStatusEnum .UPLOADED_WEBP ,
    nullable =False
    )
    file_url :Mapped [Optional [str ]]=mapped_column (String (500 ),nullable =True )
    file_hash_sha256 :Mapped [Optional [str ]]=mapped_column (String (64 ),nullable =True )
    mime_type :Mapped [str ]=mapped_column (String (50 ),default ="image/webp",nullable =False )
    file_size_kb :Mapped [Optional [float ]]=mapped_column (Float ,nullable =True )
    digilocker_uri :Mapped [Optional [str ]]=mapped_column (String (255 ),nullable =True )
    digilocker_metadata :Mapped [Optional [dict ]]=mapped_column (JSON ,nullable =True )
    application :Mapped ["Application"]=relationship ("Application",back_populates ="documents")
