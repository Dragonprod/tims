from pydantic import BaseModel
from datetime import datetime


class JWTMeta(BaseModel):
    expire: str
    subject: str


class JWTUser(BaseModel):
    user_id: int
    is_admin: bool
