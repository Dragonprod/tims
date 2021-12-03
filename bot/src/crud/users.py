import logging

from sqlalchemy.sql.functions import user
from src.database.db import TelegramUsers, Session

logger = logging.getLogger(__name__)
db = Session()


def createUser(chatid, userid):
    userRow = TelegramUsers(chatid=chatid, userid=userid)
    db.add(userRow)
    db.commit()
    db.close()


def getUserById(chatid):
    userQuery = db.query(TelegramUsers).filter(
        TelegramUsers.chatid == str(chatid)).first()
    if userQuery != None:
        return [True, userQuery]
    else:
        return [False, None]

def getNotificationStatus(chatid):
    userQuery = db.query(TelegramUsers).filter(
        TelegramUsers.chatid == str(chatid)).first()
    if userQuery != None:
        return userQuery.notifications 
        
def enableNotifications(chatid):
    userQuery = db.query(TelegramUsers).filter(
        TelegramUsers.chatid == str(chatid)).first()
    if userQuery != None:
        userQuery.notifications = True
        db.commit()
        db.close()

def disableNotifications(chatid):
    userQuery = db.query(TelegramUsers).filter(
        TelegramUsers.chatid == str(chatid)).first()
    if userQuery != None:
        userQuery.notifications = False
        db.commit()
        db.close()

def updateUserCategory(chatid, category):
    userQuery = db.query(TelegramUsers).filter(
        TelegramUsers.chatid == str(chatid)).first()
    if userQuery != None:
        userQuery.category = category
        db.commit()
        db.close()

def getLatestIdUser(chatid):
    userQuery = db.query(TelegramUsers).filter(
        TelegramUsers.chatid == chatid).first()
    if userQuery != None:
        return userQuery.lastStartupId