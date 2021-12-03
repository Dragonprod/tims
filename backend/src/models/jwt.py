from typing import List
from pydantic import BaseModel
from datetime import datetime

from src.models.user import RoleBase


class JWTMeta(BaseModel):
    expire: str
    subject: str


class JWTUser(BaseModel):
    user_id: int
    is_admin: bool
    roles: List[RoleBase]
