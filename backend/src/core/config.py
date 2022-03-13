import os
from dotenv import load_dotenv

load_dotenv(os.path.abspath(__file__ + "/../../../../.env"))

BACKEND_DEBUG_MODE = os.environ.get('BACKEND_DEBUG_MODE', False)

BACKEND_API_V1_PREFIX = os.environ.get('BACKEND_API_V1_PREFIX', '/api/v1')
PROJECT_NAME = os.environ.get('PROJECT_NAME', 'TIMS Backend')

DATABASE_HOST = os.environ.get('DATABASE_HOST')
DATABASE_NAME = os.environ.get('DATABASE_NAME')
DATABASE_USER = os.environ.get('DATABASE_USER')
DATABASE_PASSWORD = os.environ.get('DATABASE_PASSWORD')
DATABASE_PORT = os.environ.get('DATABASE_PORT')

ELASTIC_HOST = os.environ.get('ELASTIC_HOST')
ELASTIC_PORT = os.environ.get('ELASTIC_PORT')

BACKEND_JWT_SECRET = os.environ.get('BACKEND_JWT_SECRET')
JWT_ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7

ROLES = {
    0: 'ROLE_ADMIN',
    1: 'ROLE_USER'
}

MIGRATION_PASSWORD = os.environ.get('MIGRATION_PASSWORD')
