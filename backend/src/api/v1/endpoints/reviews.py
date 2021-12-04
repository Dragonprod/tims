from typing import Optional
from src.database.database import User, get_db, Session
from fastapi import APIRouter, Body, Depends

from starlette.exceptions import HTTPException
from starlette.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_202_ACCEPTED, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND
from src.crud.reviews import get_reviews
from src.models.review import ReviewList
from fastapi.responses import ORJSONResponse

router = APIRouter()


@router.get(
    "/reviews",
    tags=["Reviews"],
    status_code=HTTP_200_OK,
    response_class=ORJSONResponse,
)
async def reviews_get(db: Session = Depends(get_db)):
    reviews = await get_reviews(db=db)
    return ReviewList(reviews=reviews)
