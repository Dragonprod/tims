from ....models.review import ReviewBase, ReviewCrateorUpdate
from ....database.database import User, get_db, Session
from fastapi import APIRouter, Body, Depends

from starlette.exceptions import HTTPException
from starlette.status import HTTP_200_OK, HTTP_202_ACCEPTED
from ....crud.user import get_favorites, get_user, set_user_telegram_id, update_user, get_user_activation_code, create_review
from ....models.user import UserDetailModel, UserTelegramCreate, UserFavoritesStartup
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


@router.put(
    "/user/telegram/activate/{id}",
    tags=["User"],
    status_code=HTTP_200_OK,
    response_class=ORJSONResponse,
)
async def get_code(id: int, db: Session = Depends(get_db)):
    return await get_user_activation_code(id=id, db=db)


@router.post(
    "/user/telegram/add",
    tags=["User"],
    status_code=HTTP_200_OK,
    response_class=ORJSONResponse,
)
async def add_telegram(telegram: UserTelegramCreate = Body(...), db: Session = Depends(get_db)):
    telegram = await set_user_telegram_id(telegram=telegram, db=db)
    return telegram


@router.post(
    "/user/review/add",
    tags=["User"],
    status_code=HTTP_200_OK,
    response_model=ReviewBase,
    response_class=ORJSONResponse,
)
async def review_create(review: ReviewCrateorUpdate = Body(...), db: Session = Depends(get_db)):
    review = await create_review(review=review, db=db)
    return review


@router.get(
    "/user/{id}/favorites",
    tags=["User"],
    status_code=HTTP_200_OK,
    response_model=UserFavoritesStartup,
    response_class=ORJSONResponse,
)
async def favorites_get(user_id, db: Session = Depends(get_db)):
    user = await get_favorites(user_id=user_id, db=db)
    return UserFavoritesStartup(favorites_startup=user.favorites_startup)
