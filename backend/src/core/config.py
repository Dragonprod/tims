import os
from dotenv import load_dotenv

load_dotenv(os.path.abspath(__file__ + "/../../../../.env"))

PRODUCTION = os.environ.get('PRODUCTION', False)

API_V1_PREFIX = os.environ.get('API_V1_PREFIX', '/api/v1')
PROJECT_NAME = os.environ.get('PROJECT_NAME', 'Hack Template Backend')

DATABASE_HOST = os.environ.get('DATABASE_HOST')
DATABASE_NAME = os.environ.get('DATABASE_NAME')
DATABASE_USER = os.environ.get('DATABASE_USER')
DATABASE_PASSWORD = os.environ.get('DATABASE_PASSWORD')
DATABASE_PORT = os.environ.get('DATABASE_PORT')

ELASTIC_HOST = os.environ.get('ELASTIC_HOST')
ELASTIC_PORT = os.environ.get('ELASTIC_PORT')

JWT_SECRET = os.environ.get('JWT_SECRET')
JWT_ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7
TELEGRAM_BOT_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN")
ROLES = {
    0: 'ROLE_ADMIN',
    1: 'ROLE_USER'
}
