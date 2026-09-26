from typing import List ,Optional
from fastapi import APIRouter ,Depends ,Query
from sqlalchemy .ext .asyncio import AsyncSession
from sqlalchemy import select
from app .core .database import get_db
from app .models .scheme import ScholarshipScheme
router =APIRouter (prefix ="/schemes",tags =["Scholarship Schemes & Eligibility"])
@router .get ("",summary ="List Available Scholarship Schemes")
async def list_schemes (
caste :Optional [str ]=Query (None ,description ="ST, SC, OBC"),
max_income :Optional [float ]=Query (None ),
db :AsyncSession =Depends (get_db )
):
    stmt =select (ScholarshipScheme ).where (ScholarshipScheme .is_active ==True )
    res =await db .execute (stmt )
    schemes =res .scalars ().all ()
    if not schemes :
        default_schemes =[
        ScholarshipScheme (
        scheme_code ="POST_MATRIC_ST",
        scheme_name ="Post-Matric Scholarship for ST Students",
        description ="Financial support for Scheduled Tribe students pursuing higher education.",
        ministry ="Ministry of Tribal Affairs",
        max_income_limit =250000.00 ,
        max_age =30 ,
        allowed_castes =["ST"],
        disbursal_amount =32000.00 ,
        is_active =True
        ),
        ScholarshipScheme (
        scheme_code ="TOP_CLASS_EDU_ST",
        scheme_name ="National Fellowship & Scholarship for Higher Education of ST Students",
        description ="Full tuition fee coverage and stipend for ST scholars in premier institutes.",
        ministry ="Ministry of Tribal Affairs",
        max_income_limit =600000.00 ,
        max_age =35 ,
        allowed_castes =["ST"],
        disbursal_amount =75000.00 ,
        is_active =True
        ),
        ScholarshipScheme (
        scheme_code ="POST_MATRIC_OBC",
        scheme_name ="State Post-Matric Scholarship for OBC Students",
        description ="Tuition assistance and maintenance allowance for eligible OBC candidates.",
        ministry ="Ministry of Social Justice and Empowerment",
        max_income_limit =300000.00 ,
        max_age =28 ,
        allowed_castes =["OBC"],
        disbursal_amount =28000.00 ,
        is_active =True
        )
        ]
        db .add_all (default_schemes )
        await db .commit ()
        schemes =default_schemes
    filtered =[]
    for s in schemes :
        if caste and s .allowed_castes and caste not in s .allowed_castes :
            continue
        if max_income and s .max_income_limit and max_income >s .max_income_limit :
            continue
        filtered .append ({
        "id":str (s .id ),
        "scheme_code":s .scheme_code ,
        "scheme_name":s .scheme_name ,
        "description":s .description ,
        "ministry":s .ministry ,
        "max_income_limit":float (s .max_income_limit )if s .max_income_limit else None ,
        "allowed_castes":s .allowed_castes ,
        "disbursal_amount":float (s .disbursal_amount ),
        "eligible":True
        })
    return filtered
