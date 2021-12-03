from fastapi import Depends, Body, Depends
from starlette.exceptions import HTTPException
from starlette.status import HTTP_404_NOT_FOUND
from ..database.database import Reviews, Startup, Status, User, get_db, Session
from ..helpers.exceptions import EntityDoesNotExist


async def get_reviews(db: Session):
    return db.query(Reviews).all()
