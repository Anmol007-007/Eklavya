from fastapi import APIRouter
from app .api .v1 .endpoints import applications ,schemes
api_router =APIRouter ()
api_router .include_router (applications .router )
api_router .include_router (schemes .router )
