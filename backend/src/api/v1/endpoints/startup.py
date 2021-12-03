from typing import List, Optional
from ....models.review import ReviewList
from ....database.database import User, get_db, Session
from fastapi import APIRouter, Body, Depends, Query

from starlette.exceptions import HTTPException
from starlette.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_202_ACCEPTED, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND
from ....crud.startup import create_startup, get_startup_by_id, get_startups, like_startup, search_startup, get_reviews
from ....models.startup import StartupBase, StartupCrateorUpdate, StartupList
from ....models.message import MessageBase
from fastapi.responses import ORJSONResponse

router = APIRouter()


@router.post(
    "/startup/create",
    tags=["Startup"],
    status_code=HTTP_201_CREATED,
    response_model=StartupBase,
    response_class=ORJSONResponse,
)
async def startup_create(startup: StartupCrateorUpdate = Body(...), db: Session = Depends(get_db)):
    return await create_startup(startup=startup, db=db)


@router.get(
    "/startup/{id}",
    tags=["Startup"],
    status_code=HTTP_200_OK,
    response_class=ORJSONResponse,
)
async def startup_get(id: int, db: Session = Depends(get_db)):
    startup = await get_startup_by_id(startup_id=id, db=db)
    if startup is None:
        return HTTPException(HTTP_404_NOT_FOUND)
    return StartupBase.from_orm(startup)


@router.get(
    "/startup",
    tags=["Startup"],
    status_code=HTTP_200_OK,
    response_model=StartupList,
    response_class=ORJSONResponse,
)
async def startups_get(categories: Optional[List[str]] = Query(None), more: bool = None,  sort_mark: str = None,  sort_date: str = "DESK",  offset: int = 20, limit: int = 20, db: Session = Depends(get_db)):

    startups = await get_startups(more=more, categories=categories, sort_mark=sort_mark, sort_date=sort_date, offset=offset, limit=limit, db=db)
    return StartupList(startups=startups)


@router.get(
    "/startup/{search}",
    tags=["Startup"],
    status_code=HTTP_200_OK,
    response_model=StartupList,
    response_class=ORJSONResponse,
)
async def get_startup(search: str, db: Session = Depends(get_db)):
    startups = await search_startup(name=search, db=db)
    return StartupList(startups=startups)


@router.post(
    "/startup/like",
    tags=["Startup"],
    status_code=HTTP_200_OK,
    response_class=ORJSONResponse,
)
async def startup_like(user_id: int, startup_id: int, db: Session = Depends(get_db)):
    startup = await like_startup(user_id=user_id, startup_id=startup_id, db=db)
    if startup is None:
        return HTTPException(HTTP_404_NOT_FOUND)
    else:
        return MessageBase(message="Success")


@router.delete(
    "/startup/like",
    tags=["Startup"],
    status_code=HTTP_200_OK,
    response_class=ORJSONResponse,
)
async def startup_like_delete(user_id: int, startup_id: int, db: Session = Depends(get_db)):
    startup = await like_startup(user_id=user_id, startup_id=startup_id, db=db)
    if startup is None:
        return HTTPException(HTTP_404_NOT_FOUND)
    else:
        return MessageBase(message="Success")


@router.get(
    "/startup/{id}/reviews",
    tags=["Startup"],
    status_code=HTTP_200_OK,
    response_model=ReviewList,
    response_class=ORJSONResponse,
)
async def reviews(id: int, db: Session = Depends(get_db)):
    reviews = await get_reviews(startup_id=id, db=db)
    return ReviewList(reviews=reviews)
