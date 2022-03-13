import os
from dotenv import load_dotenv

load_dotenv(os.path.abspath(__file__ + "/../../../../.env"))

TELEGRAM_DEBUG_MODE = os.environ.get('TELEGRAM_DEBUG_MODE', False)

TELEGRAM_BOT_API_ENDPOINT = os.environ.get('TELEGRAM_BOT_API_ENDPOINT')
TELEGRAM_BOT_TOKEN = os.environ.get('TELEGRAM_BOT_TOKEN')
TELEGRAM_ADMIN_CHAT_IDS = os.environ.get('TELEGRAM_ADMIN_CHAT_IDS').split(',')

DATABASE_HOST = os.environ.get('DATABASE_HOST')
DATABASE_NAME = os.environ.get('DATABASE_NAME')
DATABASE_USER = os.environ.get('DATABASE_USER')
DATABASE_PASSWORD = os.environ.get('DATABASE_PASSWORD')
DATABASE_PORT = os.environ.get('DATABASE_PORT')

ADD_TELEGRAM_REGEXP = r'[A-Za-z]{5}[0-9]{5}'