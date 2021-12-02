from ....database.database import User, get_db, Session
from fastapi import APIRouter, Body, Depends

from starlette.exceptions import HTTPException
from starlette.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_202_ACCEPTED, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND
from ....crud.company import create_company, get_companies, get_company
from ....models.company import CompanyBase, CompanyCrateorUpdate, CompanyList
from fastapi.responses import ORJSONResponse

router = APIRouter()


@router.post(
    "/company/create",
    tags=["Company"],
    status_code=HTTP_201_CREATED,
    response_model=CompanyBase,
    response_class=ORJSONResponse,
)
async def company_create(company: CompanyCrateorUpdate = Body(...), db: Session = Depends(get_db)):
    return await create_company(company=company, db=db)


@router.get(
    "/company/{id}",
    tags=["Company"],
    status_code=HTTP_200_OK,
    response_class=ORJSONResponse,
)
async def company_get(id: int, db: Session = Depends(get_db)):
    company = await get_company(company_id=id, db=db)
    if company is None:
        return HTTPException(HTTP_404_NOT_FOUND)
    return CompanyBase.from_orm(company)


@router.get(
    "/company",
    tags=["Company"],
    status_code=HTTP_200_OK,
    response_model=CompanyList,
    response_class=ORJSONResponse,
)
async def category_list(db: Session = Depends(get_db)):
    companies = await get_companies(db=db)
    return CompanyList(companies=companies)
