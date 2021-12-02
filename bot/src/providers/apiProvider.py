import requests
import logging
from src.core.config import API_BASE_URL

logger = logging.getLogger(__name__)


class API():
    def __init__(self) -> None:
        pass
    
    def connectAccount(self, activationLink, chatId):

        connectData = {
            "activationLink": activationLink,
            "telegram_id": int(chatId)
        }
        
        request = requests.post(f'{API_BASE_URL}/user/telegram/add', json = connectData)

        if request.status_code == 200:
            return True
        else:
            return False

    def checkUpdates(self):
        pass

    def getProjects(self):
        pass

    def addProjectToWatchList(self):
        pass

    def deleteProjectFromWatchList(self):
        pass
