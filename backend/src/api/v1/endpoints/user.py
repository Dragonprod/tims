from src.models.application import ApplicationBase, ApplicationList, ApplicationListOwn
from ....models.review import ReviewBase, ReviewCrateorUpdate
from ....database.database import User, get_db, Session
from fastapi import APIRouter, Body, Depends

from starlette.exceptions import HTTPException
from starlette.status import HTTP_200_OK, HTTP_202_ACCEPTED
from src.crud.user import get_applications, get_category_own, get_favorites, get_user, set_user_telegram_id, update_user, get_user_activation_code, create_review
from src.models.user import UserDetailModel, UserTelegramCreate
from src.models.startup import UserFavoritesStartup
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
    "/user/favorites/{user_id}",
    tags=["User"],
    status_code=HTTP_200_OK,
    response_model=UserFavoritesStartup,
    response_class=ORJSONResponse,
)
async def favorites_get(user_id: int, db: Session = Depends(get_db)):
    user = await get_favorites(user_id=user_id, db=db)
    return UserFavoritesStartup(favorites_startup=user.favorites_startup)


@router.get(
    "/applications",
    tags=["User"],
    status_code=HTTP_200_OK,
    response_model=ApplicationList,
    response_class=ORJSONResponse,
)
async def application_get(user_id: int, db: Session = Depends(get_db)):
    startups = await get_applications(user_id=user_id, db=db)
    applications = []
    for i in range(0, len(startups)):
        clients = startups[i].applications.all()
        for j in range(0, len(clients)):
            applications.append(ApplicationBase(
                client=clients[j], startup=startups[i]))
    return ApplicationList(applications=applications)


@router.get(
    "/subscription/category",
    tags=["User"],
    status_code=HTTP_200_OK,
    response_model=ApplicationListOwn,
    response_class=ORJSONResponse,
)
async def get_subscription_category(user_id: int, db: Session = Depends(get_db)):
    general_category, children_category = await get_category_own(user_id=user_id, db=db)
    print(general_category)
    print(children_category)
    return ApplicationListOwn(general_category=general_category, children_category=children_category)
