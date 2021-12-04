from typing import List, Optional
from src.models.review import ReviewList
from src.database.database import User, get_db, Session
from fastapi import APIRouter, Body, Depends, Query

from starlette.exceptions import HTTPException
from starlette.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_202_ACCEPTED, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND
from src.crud.startup import create_startup, get_startup_by_id, get_startups, like_startup, search_startup, get_reviews, delete_like_startup, send_application
from src.models.startup import StartupBase, StartupCrateorUpdate, StartupList
from src.models.message import MessageBase
from src.models.application import ApplicationBase
from fastapi.responses import ORJSONResponse
import aiohttp

router = APIRouter()


@router.get(
    "/startup/search",
    tags=["Startup"],
    status_code=HTTP_200_OK,
    response_model=StartupList,
    response_class=ORJSONResponse,
)
async def search(search: str, db: Session = Depends(get_db)):
    startups = await search_startup(name=search, db=db)
    startups_pydantic = []

    for i in range(0, len(startups)):
        model = StartupBase.from_orm(startups[i][0])
        model.average_mark = startups[i][1]
        model.count_reviewses = startups[i][2]
        startups_pydantic.append(model)

    return StartupList(startups=startups_pydantic)


@router.post(
    "/startup/create",
    tags=["Startup"],
    status_code=HTTP_201_CREATED,
    response_class=ORJSONResponse,
)
async def startup_create(startup: StartupCrateorUpdate = Body(...), db: Session = Depends(get_db)):
    startup = await create_startup(startup=startup, db=db)
    if startup == None:
        return HTTPException(HTTP_400_BAD_REQUEST)
    else:
        return StartupBase.from_orm(startup)


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
    startup_model = StartupBase.from_orm(startup[0])
    startup_model.average_mark = startup[1]
    startup_model.count_reviewses = startup[2]
    return startup_model


@router.get(
    "/startup",
    tags=["Startup"],
    status_code=HTTP_200_OK,
    response_model=StartupList,
    response_class=ORJSONResponse,
)
async def startups_get(status: str = None, children_categories: Optional[List[str]] = Query(None), categories: Optional[List[str]] = Query(None), more: bool = None,  sort_mark: str = None,  sort_date: str = None,  offset: int = 20, limit: int = 20, db: Session = Depends(get_db)):
    startups = await get_startups(status=status, children_categories=children_categories, more=more, categories=categories, sort_mark=sort_mark, sort_date=sort_date, offset=offset, limit=limit, db=db)

    startups_pydantic = []

    for i in range(0, len(startups)):
        model = StartupBase.from_orm(startups[i][0])
        model.average_mark = startups[i][1]
        model.count_reviewses = startups[i][2]
        startups_pydantic.append(model)

    return StartupList(startups=startups_pydantic)


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
    startup = await delete_like_startup(user_id=user_id, startup_id=startup_id, db=db)
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


@router.post(
    "/startup/application",
    tags=["Startup"],
    status_code=HTTP_200_OK,
    response_model=ApplicationBase,
    response_class=ORJSONResponse,
)
async def application(startup_id: int, user_id: int, db: Session = Depends(get_db)):
    user, startup = await send_application(user_id=user_id, startup_id=startup_id, db=db)
    return ApplicationBase(client=user, startup=startup)
