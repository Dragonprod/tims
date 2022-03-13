from typing import Optional
from src.core.config import MIGRATION_PASSWORD
from src.database.database import User, get_db, Session
from src.database.migrate import migrate_start
from fastapi import APIRouter, Body, Depends

from starlette.exceptions import HTTPException
from starlette.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_202_ACCEPTED, HTTP_400_BAD_REQUEST, HTTP_403_FORBIDDEN, HTTP_404_NOT_FOUND
from src.crud.reviews import get_reviews
from src.models.review import ReviewList
from fastapi.responses import ORJSONResponse

router = APIRouter()

@router.post(
    "/migrate/start",
    tags=["Migrate"],
    status_code=HTTP_200_OK,
    response_class=ORJSONResponse,
)
async def reviews_get(password: str):
    if password == MIGRATION_PASSWORD:
        await migrate_start()
    else:
        return HTTPException(HTTP_403_FORBIDDEN)
