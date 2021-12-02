from fastapi import Depends, Body, Depends
from starlette.exceptions import HTTPException
from starlette.status import HTTP_404_NOT_FOUND
from ..database.database import Startup, Status, User, get_db, Session
from ..helpers.exceptions import EntityDoesNotExist


async def create_tag(tag, db: Session):
    dbtag = Status(tag)
    db.add(dbtag)
    db.commit()
    return dbtag


async def get_tag(tag_id, db: Session):
    return db.query(Status).filter(Status.id == tag_id).first()
