from pydantic_settings import BaseSettings ,SettingsConfigDict
from typing import Optional
class Settings (BaseSettings ):
    PROJECT_NAME :str ="Eklavya Scholarship Platform API"
    VERSION :str ="1.0.0"
    API_V1_STR :str ="/api/v1"
    ENVIRONMENT :str ="development"
    DEBUG :bool =True
    POSTGRES_SERVER :str ="localhost"
    POSTGRES_USER :str ="eklavya_admin"
    POSTGRES_PASSWORD :str ="eklavya_secret_pass"
    POSTGRES_DB :str ="eklavya_scholarships"
    POSTGRES_PORT :int =5432
    DATABASE_URL :Optional [str ]=None
    @property
    def ASYNC_DATABASE_URL (self )->str :
        if self .DATABASE_URL :
            return self .DATABASE_URL
        return (
        f"postgresql+asyncpg://{self .POSTGRES_USER }:{self .POSTGRES_PASSWORD }"
        f"@{self .POSTGRES_SERVER }:{self .POSTGRES_PORT }/{self .POSTGRES_DB }"
        )
    REDIS_HOST :str ="localhost"
    REDIS_PORT :int =6379
    REDIS_DB :int =0
    REDIS_PASSWORD :Optional [str ]=None
    @property
    def REDIS_URL (self )->str :
        auth =f":{self .REDIS_PASSWORD }@"if self .REDIS_PASSWORD else ""
        return f"redis://{auth }{self .REDIS_HOST }:{self .REDIS_PORT }/{self .REDIS_DB }"
    JWT_SECRET_KEY :str ="eklavya-super-secure-jwt-signing-secret-key-32-bytes"
    JWT_ALGORITHM :str ="HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES :int =60 *24 *7
    S3_ENDPOINT_URL :Optional [str ]="http://localhost:9000"
    S3_BUCKET_DOCUMENTS :str ="eklavya-documents"
    S3_ACCESS_KEY :str ="minioadmin"
    S3_SECRET_KEY :str ="minioadmin"
    DIGILOCKER_MOCK_DELAY_SEC :int =3
    BHASHINI_API_MOCK_URL :str ="https://mock.bhashini.gov.in/v1"
    PFMS_API_MOCK_URL :str ="https://mock.pfms.nic.in/v1"
    model_config =SettingsConfigDict (
    env_file =".env",
    env_file_encoding ="utf-8",
    extra ="ignore"
    )
settings =Settings ()
