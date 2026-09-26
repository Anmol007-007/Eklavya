import hashlib
import json
import uuid
from typing import Optional ,Tuple
from sqlalchemy .ext .asyncio import AsyncSession
from sqlalchemy import select
from app .models .idempotency import IdempotencyRecord ,IdempotencyStatusEnum
from app .core .exceptions import IdempotencyConflictException
class IdempotencyService :
    @staticmethod
    def compute_payload_hash (payload_dict :dict )->str :
        dumped =json .dumps (payload_dict ,sort_keys =True ,default =str )
        return hashlib .sha256 (dumped .encode ("utf-8")).hexdigest ()
    @classmethod
    async def acquire_or_check (
    cls ,
    db :AsyncSession ,
    sync_uuid :uuid .UUID ,
    endpoint :str ,
    payload_hash :str
    )->Tuple [bool ,Optional [dict ]]:
        stmt =select (IdempotencyRecord ).where (IdempotencyRecord .sync_uuid ==sync_uuid )
        result =await db .execute (stmt )
        record =result .scalars ().first ()
        if record :
            if record .status ==IdempotencyStatusEnum .COMPLETED :
                return True ,record .response_body
            elif record .status ==IdempotencyStatusEnum .PROCESSING :
                raise IdempotencyConflictException ()
            else :
                record .status =IdempotencyStatusEnum .PROCESSING
                record .request_hash =payload_hash
                await db .flush ()
                return False ,None
        new_record =IdempotencyRecord (
        sync_uuid =sync_uuid ,
        endpoint =endpoint ,
        request_hash =payload_hash ,
        status =IdempotencyStatusEnum .PROCESSING
        )
        db .add (new_record )
        await db .flush ()
        return False ,None
    @classmethod
    async def mark_completed (
    cls ,
    db :AsyncSession ,
    sync_uuid :uuid .UUID ,
    response_code :int ,
    response_body :dict
    ):
        stmt =select (IdempotencyRecord ).where (IdempotencyRecord .sync_uuid ==sync_uuid )
        result =await db .execute (stmt )
        record =result .scalars ().first ()
        if record :
            record .status =IdempotencyStatusEnum .COMPLETED
            record .response_code =response_code
            record .response_body =response_body
            await db .flush ()
    @classmethod
    async def mark_failed (cls ,db :AsyncSession ,sync_uuid :uuid .UUID ):
        stmt =select (IdempotencyRecord ).where (IdempotencyRecord .sync_uuid ==sync_uuid )
        result =await db .execute (stmt )
        record =result .scalars ().first ()
        if record :
            record .status =IdempotencyStatusEnum .FAILED
            await db .flush ()
