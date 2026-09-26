import uuid
from datetime import datetime ,timezone
from typing import Optional
from sqlalchemy import String ,DateTime ,ForeignKey ,JSON
from sqlalchemy .dialects .postgresql import UUID
from sqlalchemy .orm import Mapped ,mapped_column ,relationship
from app .models .base import Base ,UUIDPrimaryKeyMixin
class AuditLog (Base ,UUIDPrimaryKeyMixin ):
    __tablename__ ="audit_logs"
    application_id :Mapped [uuid .UUID ]=mapped_column (
    UUID (as_uuid =True ),
    ForeignKey ("applications.id",ondelete ="CASCADE"),
    nullable =False ,
    index =True
    )
    action :Mapped [str ]=mapped_column (String (100 ),nullable =False )
    previous_status :Mapped [Optional [str ]]=mapped_column (String (50 ),nullable =True )
    new_status :Mapped [Optional [str ]]=mapped_column (String (50 ),nullable =True )
    actor_type :Mapped [str ]=mapped_column (String (50 ),default ="SYSTEM_WORKER",nullable =False )
    actor_id :Mapped [Optional [str ]]=mapped_column (String (100 ),nullable =True )
    remarks :Mapped [str ]=mapped_column (String (500 ),nullable =False )
    metadata_json :Mapped [Optional [dict ]]=mapped_column (JSON ,nullable =True )
    created_at :Mapped [datetime ]=mapped_column (
    DateTime (timezone =True ),
    default =lambda :datetime .now (timezone .utc ),
    nullable =False
    )
    application :Mapped ["Application"]=relationship ("Application",back_populates ="audit_logs")
