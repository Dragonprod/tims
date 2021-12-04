from starlette.exceptions import HTTPException
from starlette.status import HTTP_404_NOT_FOUND
from src.database.database import Elastic, Startup, Status, User, get_db, Session, Category, ChildrenCategory
from src.helpers.exceptions import EntityDoesNotExist
from fastapi import Depends, Body, Depends


async def create_category(category, db: Session):
    dbcategory = Category(category)
    children_categories = [ChildrenCategory(
        name=name) for name in category.children]
    db.add(dbcategory)
    dbcategory.children.extend(children_categories)
    db.commit()
    return dbcategory


async def get_category(category_id, db: Session):
    return db.query(Category).filter(Category.id == category_id).first()


async def get_categories(db: Session):
    return db.query(Category).all()


async def subscription_on(user_id: int, category: int, db: Session, children=False):
    user = db.query(User).filter(User.id == user_id).first()
    if children == False:
        category = db.query(Category).filter(Category.id == category).first()
        if user != None and category != None:
            user.subscription_general.append(category)
            db.commit()
            return True
    else:
        category = db.query(ChildrenCategory).filter(
            ChildrenCategory.id == category).first()
        if user != None and category != None:
            user.subscription_children.append(category)
            db.commit()
            return True
    return None
