from ....core.security import get_password_hash, verify_password
from ....core.config import JWT_SECRET
from ....helpers.exceptions import EntityDoesNotExist
from ....core.jwt import create_access_token
from ....database.database import User, get_db, Session
from fastapi import APIRouter, Body, Depends
from starlette.exceptions import HTTPException
from starlette.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_202_ACCEPTED, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND
from fastapi.responses import ORJSONResponse

from ....crud.user import create_user
from ....models.user import UserInCreate, UserInLogin, UserInResponse
from fastapi.responses import JSONResponse

router = APIRouter()


@router.post(
    "/users/create",
    tags=["Authentication"],
    status_code=HTTP_201_CREATED,
)
async def register_user(user: UserInCreate = Body(...), db: Session = Depends(get_db)):
    dbuser = await create_user(user, db)
    if dbuser is not None:
        token = create_access_token(dbuser, JWT_SECRET)
        return UserInResponse(
            id=dbuser.id,
            email=dbuser.email,
            token=token,
        )
    else:
        return HTTPException(HTTP_400_BAD_REQUEST)


@router.post(
    "/users/login",
    tags=["Authentication"],
    status_code=HTTP_200_OK
)
async def login_user(user: UserInLogin = Body(...), db: Session = Depends(get_db)):
    user_finded = db.query(User).filter(User.email == user.email).first()

    if user_finded is None:
        return HTTPException(HTTP_404_NOT_FOUND)

    if not verify_password(user.password, user_finded.password):
        return HTTPException(HTTP_400_BAD_REQUEST)

    token = create_access_token(user_finded, JWT_SECRET)

    return UserInResponse(
        id=user_finded.id,
        email=user_finded.email,
        token=token,
    )
