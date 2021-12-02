from src.core.config import ADMINS_CHAT_IDS


def isAdmin(chatid):
    if str(chatid) in ADMINS_CHAT_IDS:
        return True
    return False


def getCommand(command):

    cmd = ''

    if command == '{0} Telegram ID'.format(u"\u2699\ufe0f"):
        cmd = "/getid"
    elif command == '{0} Помощь'.format(u"\u2753"):
        cmd = "/help"
    else:
        cmd = command

    return cmd
