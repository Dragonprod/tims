from fastapi import Depends, Body, Depends
from starlette.exceptions import HTTPException
from starlette.status import HTTP_404_NOT_FOUND
from src.database.database import Reviews, Startup, Status, User, get_db, Session
from src.helpers.exceptions import EntityDoesNotExist


async def get_reviews(db: Session):
    return db.query(Reviews).all()
