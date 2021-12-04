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
        request = requests.get(f'{API_BASE_URL}/startup?categories=%D0%93%D0%BE%D1%80%D0%BE%D0%B4%D1%81%D0%BA%D0%BE%D0%B9%20%D1%82%D1%80%D0%B0%D0%BD%D1%81%D0%BF%D0%BE%D1%80%D1%82&more=false&offset=0&limit=2000')
        return request.json()

    def getProjects(self):
        request = requests.get(f'{API_BASE_URL}/startup?sort_mark=DESC&offset=0&limit=2000')
        response = request.json()
        return response['startups']

    def getReviews(self, id):
        request = requests.get(f'{API_BASE_URL}/startup/{id}/reviews')
        response = request.json()
        return response['reviews']
        
    def addProjectToWatchList(self, userId, categoryId):
        request = requests.get(f'{API_BASE_URL}/category/subscription?user_id={userId}&category={categoryId}&children=false')
        response = request.json()
        return response

    def deleteProjectFromWatchList(self):
        pass
