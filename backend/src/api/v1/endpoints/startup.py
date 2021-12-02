from ....database.database import User, get_db, Session
from fastapi import APIRouter, Body, Depends

from starlette.exceptions import HTTPException
from starlette.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_202_ACCEPTED, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND
from ....crud.startup import create_startup, get_startup, get_startups, search_startup
from ....models.startup import StartupBase, StartupCrateorUpdate, StartupList
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
    startup = await get_startup(startup_id=id, db=db)
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
async def register_user(offset: int = 20, db: Session = Depends(get_db)):
    startups = await get_startups(offset=offset, db=db)
    return StartupList(startups=startups)


@router.get(
    "/startup/{search}",
    tags=["Startup"],
    status_code=HTTP_200_OK,
    response_model=StartupList,
    response_class=ORJSONResponse,
)
async def register_user(search: str, db: Session = Depends(get_db)):
    startups = await search_startup(name=search, db=db)
    return StartupList(startups=startups)
