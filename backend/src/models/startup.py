from enum import Enum
from typing import List, Optional
from datetime import date
from pydantic import BaseModel
from sqlalchemy.sql.sqltypes import Boolean
from src.models.status import StatusBase
from src.models.category import CategoryBase
from src.models.company import CompanyBase
from src.models.review import ReviewBase


class ImageBase(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True


class StartupBase(BaseModel):
    id: int = None
    name: str
    description: str
    brief_description: str
    usability: str
    usecases: str
    author: int
    date: date
    company_id: int
    statuses: List[StatusBase]
    sertificate: bool = None
    categories: List[CategoryBase]
    company: CompanyBase = None
    images: List[ImageBase] = None
    average_mark: int = None
    count_reviewses: int = None
    reviewses: List[ReviewBase]

    class Config:
        orm_mode = True


class StartupCrateorUpdate(BaseModel):
    description: str
    brief_description: str
    product_use_cases: str
    usability: str
    name: str
    author: int
    company_id: int
    statuses: List[int]
    sertificate: bool
    usecases: str
    categories: List[int]
    images: List[str] = None

    class Config:
        orm_mode = True


class StartupList(BaseModel):
    startups: Optional[List[StartupBase]] = None

    class Config:
        orm_mode = True


class UserFavoritesStartup(BaseModel):
    favorites_startup: List[StartupBase]
