from fastapi import APIRouter

from .endpoints.auth import router as auth_router
from .endpoints.startup import router as startup_router
from .endpoints.status import router as status_router
from .endpoints.user import router as user_router

router = APIRouter()
router.include_router(auth_router)
router.include_router(startup_router)
router.include_router(status_router)
router.include_router(user_router)
