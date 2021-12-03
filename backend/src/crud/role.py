from fastapi import Depends, Body, Depends
from starlette.exceptions import HTTPException
from starlette.status import HTTP_404_NOT_FOUND
from ..database.database import Role, Startup, Status, User, get_db, Session
from ..helpers.exceptions import EntityDoesNotExist


async def create_role(role, db: Session):
    dbrole = Role(role)
    db.add(dbrole)
    db.commit()
    return dbrole


async def get_role(role_id, db: Session):
    return db.query(Role).filter(Role.id == role_id).first()


async def get_roles(db: Session):
    return db.query(Role).all()
