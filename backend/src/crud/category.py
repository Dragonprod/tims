from starlette.exceptions import HTTPException
from starlette.status import HTTP_404_NOT_FOUND
from ..database.database import Elastic, Startup, Status, User, get_db, Session, Category
from ..helpers.exceptions import EntityDoesNotExist
from fastapi import Depends, Body, Depends


async def create_category(category, db: Session):
    dbcategory = Category(category)
    db.add(dbcategory)
    db.commit()
    return dbcategory


async def get_category(category_id, db: Session):
    return db.query(Category).filter(Category.id == category_id).first()


async def get_categories(db: Session):
    return db.query(Category).all()