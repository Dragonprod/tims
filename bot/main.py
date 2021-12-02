import logging
from src.app import Bot

logging.basicConfig(
    format='%(asctime)s - %(name)s - %(threadName)s - %(levelname)s - %(message)s',
    level=logging.INFO,
    handlers=[
        logging.FileHandler("logs.log", mode='w', encoding='UTF-8'),
        logging.StreamHandler()
    ]
)

if __name__ == '__main__':
    bot = Bot()
    bot.run()