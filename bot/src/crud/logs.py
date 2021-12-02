import logging
from src.providers.functionsProvider import isAdmin, getCommand
from src.database.db import Logs, Session
from datetime import datetime

logger = logging.getLogger(__name__)
db = Session()


def createLog(update):
    time = datetime.now()
    chatid = update.message.chat.id
    username = update.message.chat.username
    command = getCommand(update.message.text)
    admin = isAdmin(update.message.chat.id)

    logRow = Logs(time=time, chatid=chatid, username=username,
                  command=command, isAdmin=admin)

    db.add(logRow)
    db.commit()
    db.close()


def getLogs():
    return db.query(Logs).all()


def getLogsById(chatid):
    logsQuery = db.query(Logs).filter(Logs.chatid == str(chatid)).all()
    if logsQuery != []:
        return [True, logsQuery]
    else:
        return [False, None]
