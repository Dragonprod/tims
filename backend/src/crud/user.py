from ..core.security import get_password_hash
from ..models.user import UserDetailModel, UserInCreate, UserInLogin, UserBase
from ..database.database import User, UserDetail, get_db, Session
from ..helpers.exceptions import EntityDoesNotExist
from fastapi import Depends


async def create_user(user, db: Session):
    if db.query(User).filter(User.email == user.email).first() == None:
        user.password = get_password_hash(user.password)
        new_user = User(email=user.email, password=user.password,
                        is_admin=user.is_admin)
        db.add(new_user)
        db.commit()
        return UserBase(id=new_user.id, email=user.email, is_admin=user.is_admin)
    else:
        return None


async def update_user(user, db: Session):
    dbuser = db.query(UserDetail).filter(UserDetail.id == user.user_id).first()
    if dbuser is None:
        db.add(UserDetail(user))
    else:
        dbuser.__init__(user)
    db.commit()
    return UserDetailModel.from_orm(dbuser)


async def get_user(id: int, db: Session):
    dbuser = db.query(User).filter(User.id == id).first()
    if dbuser is not None:
        return UserDetailModel.from_orm(dbuser)
    return None
