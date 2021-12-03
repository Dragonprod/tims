from src.models.user import UserMinimal
from typing import List, Optional
from pydantic import BaseModel


class ReviewBase(BaseModel):
    id: int
    review: str
    user: UserMinimal
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
