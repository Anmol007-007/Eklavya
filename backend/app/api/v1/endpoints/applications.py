from fastapi import APIRouter ,Depends ,status ,Request ,Response ,UploadFile ,File ,Form ,HTTPException
from sqlalchemy .ext .asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy .orm import selectinload
from app .core .database import get_db
from app .schemas .sync import OfflineApplicationSyncPayload ,ApplicationSyncResponse
from app .services .application_service import ApplicationSyncService
from app .models .application import Application
from app .services .mock_integrations import MockPFMSTrackerService
router =APIRouter (prefix ="/applications",tags =["Applications & Offline Sync"])
@router .post (
"/sync",
response_model =ApplicationSyncResponse ,
status_code =status .HTTP_201_CREATED ,
summary ="Idempotent Store-and-Forward Offline Sync",
description ="Receives locally bundled scholarship applications generated offline by the mobile client. "
"Uses sync_uuid to guarantee exactly-once processing."
)
async def sync_offline_application (
payload :OfflineApplicationSyncPayload ,
request :Request ,
response :Response ,
db :AsyncSession =Depends (get_db )
):
    client_ip =request .client .host if request .client else "unknown"
    sync_result =await ApplicationSyncService .process_sync_payload (
    db =db ,
    payload =payload ,
    client_ip =client_ip
    )
    if sync_result .is_cached_replay :
        response .status_code =status .HTTP_200_OK
        response .headers ["X-Idempotent-Replay"]="true"
    else :
        response .status_code =status .HTTP_201_CREATED
        response .headers ["X-Idempotent-Replay"]="false"
    return sync_result
@router .get (
"/{application_number}/status",
summary ="Track Application & DBT PFMS Disbursal Status"
)
async def get_application_status (
application_number :str ,
db :AsyncSession =Depends (get_db )
):
    stmt =(
    select (Application )
    .options (selectinload (Application .documents ),selectinload (Application .audit_logs ))
    .where (Application .application_number ==application_number )
    )
    res =await db .execute (stmt )
    app =res .scalars ().first ()
    if not app :
        raise HTTPException (status_code =404 ,detail ="Application number not found")
    pfms_info =None
    if app .status .value in ["INSTITUTE_VERIFIED","NODAL_APPROVED","DISBURSED"]:
        pfms_info =await MockPFMSTrackerService .get_disbursal_status (application_number )
    return {
    "application_number":app .application_number ,
    "status":app .status .value ,
    "academic_year":app .academic_year ,
    "submitted_at":app .submitted_at ,
    "documents":[
    {
    "doc_type":d .doc_type .value ,
    "doc_status":d .doc_status .value ,
    "digilocker_uri":d .digilocker_uri ,
    "verified":d .doc_status .value =="VERIFIED_DIGILOCKER"
    }
    for d in app .documents
    ],
    "audit_timeline":[
    {
    "action":a .action ,
    "previous_status":a .previous_status ,
    "new_status":a .new_status ,
    "remarks":a .remarks ,
    "timestamp":a .created_at
    }
    for a in app .audit_logs
    ],
    "pfms_dbt_tracking":pfms_info
    }
@router .post (
"/documents/upload-chunk",
summary ="Resilient Chunked/Multipart WebP Upload",
description ="Endpoint for receiving fragmented WebP document uploads over unstable 2G/3G connections."
)
async def upload_document_chunk (
chunk_index :int =Form (...),
total_chunks :int =Form (...),
doc_id :str =Form (...),
file :UploadFile =File (...)
):
    content =await file .read ()
    size_received =len (content )
    return {
    "status":"CHUNK_RECEIVED",
    "doc_id":doc_id ,
    "chunk_index":chunk_index ,
    "total_chunks":total_chunks ,
    "bytes_received":size_received ,
    "is_complete":(chunk_index +1 )==total_chunks
    }
