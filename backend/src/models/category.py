from enum import Enum
from typing import List, Optional
from pydantic import BaseModel
from src.models.status import StatusBase
from src.models.status import StatusBase


class CategoryBase(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True


class CategoryCrateorUpdate(BaseModel):
    name: str

    class Config:
        orm_mode = True


class CategoryList(BaseModel):
    categories: List[CategoryBase]
