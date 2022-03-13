from src.core.config import TELEGRAM_ADMIN_CHAT_IDS


def isAdmin(chatid):
    if str(chatid) in TELEGRAM_ADMIN_CHAT_IDS:
        return True
    return False

def getAverage(reviews):
    sum = 0
    for i in range(len(reviews)):
        sum += reviews[i]['mark']
    return sum / len(reviews)

def getCommand(command):

    cmd = ''

    if command == '{0} Telegram ID'.format(u"\u2699\ufe0f"):
        cmd = "/getid"
    elif command == '{0} Помощь'.format(u"\u2753"):
        cmd = "/help"
    else:
        cmd = command

    return cmd
