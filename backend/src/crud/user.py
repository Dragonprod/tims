from ..core.security import get_password_hash
from ..models.user import UserInCreate, UserInLogin, UserBase
from ..database.database import User, get_db, Session
from ..helpers.exceptions import EntityDoesNotExist
from fastapi import Depends


async def create_user(user, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == user.email).first() == None:
        user.password = get_password_hash(user.password)
        new_user = User(email=user.email, password=user.password,
                        is_admin=user.is_admin)
        db.add(new_user)
        db.commit()
        return UserBase(id=new_user.id, email=user.email, is_admin=user.is_admin)
    else:
        return None
