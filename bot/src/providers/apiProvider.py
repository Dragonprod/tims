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
        
        response = requests.post(f'{API_BASE_URL}/user/telegram/add', json = connectData)

        if response.status_code == 200:
            return response.json()
        else:
            return response.json()

    def checkUpdates(self):
        pass

    def getProjects(self):
        request = requests.get(f'{API_BASE_URL}/startup?sort_mark=DESC&offset=0&limit=2000')
        response = request.json()
        return response['startups']

    def getReviews(self, id):
        request = requests.get(f'{API_BASE_URL}/startup/{id}/reviews')
        response = request.json()
        return response['reviews']
        
    def addProjectToWatchList(self):
        pass

    def deleteProjectFromWatchList(self):
        pass
