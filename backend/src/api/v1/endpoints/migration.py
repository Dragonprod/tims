from sqlalchemy.orm import session
from ....database.database import User, get_db, Session
from fastapi import APIRouter, Body, Depends
import aiohttp
from starlette.exceptions import HTTPException
from starlette.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_202_ACCEPTED, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND
from ....crud.company import create_company, get_companies, get_company
from ....models.company import CompanyBase, CompanyCrateorUpdate, CompanyList
from fastapi.responses import ORJSONResponse

router = APIRouter()


@router.post(
    "/migration/start",
    tags=["Migration"],
    status_code=HTTP_201_CREATED,
    response_model=CompanyBase,
    response_class=ORJSONResponse,
)
async def migrate_start(company: CompanyCrateorUpdate = Body(...), db: Session = Depends(get_db)):
    session = aiohttp.ClientSession()


# async def create_users(db: Session):
#     session=
