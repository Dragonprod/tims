from enum import Enum
from typing import List, Optional
from pydantic import BaseModel
from src.models.user import UserBase


class ReviewBase(BaseModel):
    id: int
    review: str
    user: UserBase
    startup_id: int
    mark: int

    class Config:
        orm_mode = True


class ReviewCrateorUpdate(BaseModel):
    review: str
    user_id: int
    startup_id: int
    mark: int

    class Config:
        orm_mode = True


class ReviewList(BaseModel):
    reviews: List[ReviewBase]

    class Config:
        orm_mode = True
