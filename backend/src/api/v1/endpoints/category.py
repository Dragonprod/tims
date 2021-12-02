from ....database.database import User, get_db, Session
from fastapi import APIRouter, Body, Depends

from starlette.exceptions import HTTPException
from starlette.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_202_ACCEPTED, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND
from ....crud.category import get_categories, get_category, create_category
from ....models.category import CategoryBase, CategoryCrateorUpdate, CategoryList
from fastapi.responses import ORJSONResponse

router = APIRouter()


@router.post(
    "/category/create",
    tags=["Category"],
    status_code=HTTP_201_CREATED,
    response_model=CategoryBase,
    response_class=ORJSONResponse,
)
async def category_create(category: CategoryCrateorUpdate = Body(...), db: Session = Depends(get_db)):
    return await create_category(category=category, db=db)


@router.get(
    "/category/{id}",
    tags=["Category"],
    status_code=HTTP_200_OK,
    response_class=ORJSONResponse,
)
async def startup_get(id: int, db: Session = Depends(get_db)):
    category = await get_category(category_id=id, db=db)
    if category is None:
        return HTTPException(HTTP_404_NOT_FOUND)
    return CategoryBase.from_orm(category)


@router.get(
    "/category",
    tags=["Category"],
    status_code=HTTP_200_OK,
    response_model=CategoryList,
    response_class=ORJSONResponse,
)
async def category_list(db: Session = Depends(get_db)):
    categories = await get_categories(db=db)
    return CategoryList(categories=categories)
