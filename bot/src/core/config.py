import os
from dotenv import load_dotenv

load_dotenv(os.path.abspath(__file__ + "/../../../../.env"))

PRODUCTION = os.environ.get('PRODUCTION', False)

API_BASE_URL = "http://localhost:8080/api/v1"
TELEGRAM_BOT_TOKEN = os.environ.get('TELEGRAM_BOT_TOKEN')
ADMINS_CHAT_IDS = os.environ.get('ADMINS_CHAT_IDS').split(',')

DATABASE_HOST = os.environ.get('DATABASE_HOST')
DATABASE_NAME = os.environ.get('DATABASE_NAME')
DATABASE_USER = os.environ.get('DATABASE_USER')
DATABASE_PASSWORD = os.environ.get('DATABASE_PASSWORD')
DATABASE_PORT = os.environ.get('DATABASE_PORT')

ADD_TELEGRAM_REGEXP = r'[A-Za-z]{5}[0-9]{5}'