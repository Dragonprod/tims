from fastapi import APIRouter

from src.api.v1.endpoints.auth import router as auth_router
from src.api.v1.endpoints.startup import router as startup_router
from src.api.v1.endpoints.status import router as status_router
from src.api.v1.endpoints.user import router as user_router
from src.api.v1.endpoints.category import router as category_router
from src.api.v1.endpoints.company import router as company_router
from src.api.v1.endpoints.role import router as roles_router
from src.api.v1.endpoints.reviews import router as reviews__router
from src.api.v1.endpoints.migrate import router as migrate_router

router = APIRouter()
router.include_router(auth_router)
router.include_router(startup_router)
router.include_router(status_router)
router.include_router(user_router)
router.include_router(category_router)
router.include_router(company_router)
router.include_router(roles_router)
router.include_router(reviews__router)
# router.include_router(migrate_router)
