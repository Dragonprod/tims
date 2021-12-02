from typing import Optional
from ....database.database import User, get_db, Session
from fastapi import APIRouter, Body, Depends

from starlette.exceptions import HTTPException
from starlette.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_202_ACCEPTED, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND
from ....crud.status import create_tag, get_tag
from ....models.status import StatusBase, StatusCrateorUpdate
from fastapi.responses import ORJSONResponse

router = APIRouter()


@router.post(
    "/status/create",
    tags=["Status"],
    status_code=HTTP_201_CREATED,
    response_model=StatusBase,
    response_class=ORJSONResponse,
)
async def status_create(tag: StatusCrateorUpdate = Body(...), db: Session = Depends(get_db)):
    tag = await create_tag(tag=tag, db=db)
    return StatusBase.from_orm(tag)


@router.get(
    "/status/{id}",
    tags=["Status"],
    status_code=HTTP_200_OK,
    response_class=ORJSONResponse,
)
async def status_get(id: int, db: Session = Depends(get_db)):
    tag = await get_tag(tag_id=id, db=db)
    if tag is None:
        return HTTPException(HTTP_404_NOT_FOUND)
    return StatusBase.from_orm(tag)
