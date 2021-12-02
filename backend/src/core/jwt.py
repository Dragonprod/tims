import jwt

from datetime import datetime, timedelta
from typing import Dict

from ..models.jwt import JWTUser, JWTMeta
from ..core.config import JWT_ACCESS_TOKEN_EXPIRE_MINUTES

from pydantic import ValidationError


JWT_SUBJECT = 'access'
JWT_ALGORITHM = 'HS256'


def create_jwt_token(*, jwt_content: Dict[str, str], secret_key: str, expires_delta: timedelta) -> str:
    data_to_encode = jwt_content.copy()
    expire_at = datetime.utcnow() + expires_delta
    data_to_encode |= JWTMeta(
        expire=expire_at.isoformat(), subject=JWT_SUBJECT).dict()
    encoded = jwt.encode(data_to_encode, secret_key, algorithm=JWT_ALGORITHM)
    return encoded


def create_access_token(user, secret_key: str) -> str:
    return create_jwt_token(jwt_content=JWTUser(user_id=user.id, is_admin=user.is_admin).dict(), secret_key=secret_key, expires_delta=timedelta(minutes=JWT_ACCESS_TOKEN_EXPIRE_MINUTES))


def get_id_from_token(token: str, secret_key: str) -> str:
    try:
        return JWTUser(**jwt.decode(token, secret_key, algorithms=[JWT_ALGORITHM])).id
    except jwt.PyJWTError as decode_error:
        raise ValueError("JWT token cannot be decrypted") from decode_error
    except ValidationError as validation_error:
        raise ValueError("Malformed payload in token") from validation_error
