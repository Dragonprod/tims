from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.core.config import PROJECT_NAME, BACKEND_API_V1_PREFIX
from src.api.v1.routes import router as api_router
from src.database.database import init_db
from src.database.migrate import migrate_start

app = FastAPI(title=PROJECT_NAME)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix=BACKEND_API_V1_PREFIX)
app.add_event_handler("startup", init_db)
app.add_event_handler("startup", migrate_start)
