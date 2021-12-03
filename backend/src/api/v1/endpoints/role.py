from ....database.database import User, get_db, Session
from fastapi import APIRouter, Body, Depends

from starlette.exceptions import HTTPException
from starlette.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_202_ACCEPTED, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND
from ....crud.role import create_role, get_role, get_roles
from ....models.user import RoleBase, RoleCreateprUpdate, RoleList
from fastapi.responses import ORJSONResponse

router = APIRouter()


@router.post(
    "/role/create",
    tags=["Role"],
    status_code=HTTP_201_CREATED,
    response_model=RoleBase,
    response_class=ORJSONResponse,
)
async def role_create(role: RoleCreateprUpdate = Body(...), db: Session = Depends(get_db)):
    return await create_role(role=role, db=db)


@router.get(
    "/role/{id}",
    tags=["Role"],
    status_code=HTTP_200_OK,
    response_class=ORJSONResponse,
)
async def role_get(id: int, db: Session = Depends(get_db)):
    role = await get_role(role_id=id, db=db)
    if role is None:
        return HTTPException(HTTP_404_NOT_FOUND)
    return RoleBase.from_orm(role)


@router.get(
    "/role",
    tags=["Role"],
    status_code=HTTP_200_OK,
    response_model=RoleList,
    response_class=ORJSONResponse,
)
async def roles_get(db: Session = Depends(get_db)):
    roles = await get_roles(db=db)
    return RoleList(roles=roles)
