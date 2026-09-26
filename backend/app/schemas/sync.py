import uuid
from datetime import datetime
from typing import List ,Optional ,Dict ,Any
from pydantic import BaseModel ,Field
from app .models .user import CasteCategoryEnum
from app .models .document import DocumentTypeEnum ,DocumentStatusEnum
class OfflineDocumentPayload (BaseModel ):
    doc_type :DocumentTypeEnum
    file_url :Optional [str ]=Field (None ,description ="Uploaded WebP file path or temporary S3 URL")
    file_hash_sha256 :Optional [str ]=Field (None ,description ="Integrity checksum computed on device")
    mime_type :str =Field (default ="image/webp")
    file_size_kb :Optional [float ]=None
    digilocker_uri :Optional [str ]=Field (None ,description ="DigiLocker document URI if linked")
class StudentDetailsPayload (BaseModel ):
    full_name :str =Field (...,example ="Anmol Soni")
    caste_category :CasteCategoryEnum =Field (default =CasteCategoryEnum .OBC )
    annual_family_income :float =Field (...,example =180000.0 )
    college_name :str =Field (...,example ="Gyan Ganga College Of Technology")
    roll_number :str =Field (...,example ="0208AD231011")
    state :str =Field (default ="Madhya Pradesh")
    district :str =Field (default ="Jabalpur")
    preferred_language :str =Field (default ="en")
class OfflineApplicationSyncPayload (BaseModel ):
    sync_uuid :uuid .UUID =Field (
    ...,
    description ="Unique UUID generated locally by Flutter/Isar on device"
    )
    user_phone :str =Field (...,example ="9876543210")
    user_aadhaar_raw :str =Field (...,min_length =12 ,max_length =12 ,example ="548912345678")
    scheme_code :str =Field (...,example ="POST_MATRIC_OBC")
    academic_year :str =Field (default ="2026-2027")
    client_timestamp :datetime =Field (
    ...,
    description ="Local ISO-8601 timestamp when user finalized application on mobile"
    )
    student_details :StudentDetailsPayload
    documents :List [OfflineDocumentPayload ]=Field (default_factory =list )
    client_metadata :Optional [Dict [str ,Any ]]=Field (default_factory =dict )
class ApplicationSyncResponse (BaseModel ):
    success :bool
    message :str
    sync_uuid :uuid .UUID
    application_number :str
    status :str
    server_timestamp :datetime
    is_cached_replay :bool =False
    digilocker_queued :bool =False
    digilocker_job_id :Optional [str ]=None
