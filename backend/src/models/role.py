from enum import Enum
from typing import List, Optional
from pydantic import BaseModel


class RoleBase(BaseModel):
    id: int
    role: str

    class Config:
        orm_mode = True


class RoleCreateprUpdate(BaseModel):
    role: str

    class Config:
        orm_mode = True


class RoleList(BaseModel):
    roles: List[RoleBase]

    class Config:
        orm_mode = True
