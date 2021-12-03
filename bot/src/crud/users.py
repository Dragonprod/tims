import logging
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
