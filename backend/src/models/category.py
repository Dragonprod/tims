from enum import Enum
from typing import List, Optional
from pydantic import BaseModel
from src.models.status import StatusBase


class ChildrenCategoryBase(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True


class CategoryBase(BaseModel):
    id: int
    name: str
    children: List[ChildrenCategoryBase] = None

    class Config:
        orm_mode = True


class CategoryCrateorUpdate(BaseModel):
    name: str
    children: List[str]

    class Config:
        orm_mode = True


class CategoryList(BaseModel):
    categories: List[CategoryBase]


class SubscriptionCategory(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True
