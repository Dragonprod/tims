from ....database.database import User, get_db, Session
from fastapi import APIRouter, Body, Depends

from starlette.exceptions import HTTPException
from starlette.status import HTTP_200_OK, HTTP_202_ACCEPTED
from ....crud.user import get_user, update_user
from ....models.user import UserDetailModel
from fastapi.responses import ORJSONResponse

router = APIRouter()


@router.put(
    "/user",
    tags=["User"],
    status_code=HTTP_202_ACCEPTED,
    response_class=ORJSONResponse,
)
async def update(user: UserDetailModel = Body(...), db: Session = Depends(get_db)):
    return await update_user(user=user, db=db)


@router.get(
    "/user/{id}",
    tags=["User"],
    status_code=HTTP_200_OK,
    response_class=ORJSONResponse,
)
async def get(id: int, db: Session = Depends(get_db)):
    return await get_user(id=id, db=db)
