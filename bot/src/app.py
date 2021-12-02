import logging

from telegram import Update, ReplyKeyboardMarkup
from telegram.ext import Updater, CommandHandler, CallbackContext, MessageHandler, CallbackQueryHandler, Filters, ConversationHandler
from telegram_bot_pagination import InlineKeyboardPaginator

from src.core.config import TELEGRAM_BOT_TOKEN, ADD_TELEGRAM_REGEXP
# from src.core.keyboards import BASE_KEYBOARD

from src.crud.logs import createLog, getLogs, getLogsById

from src.providers.apiProvider import API
from src.providers.functionsProvider import isAdmin

from datetime import datetime, timedelta


logger = logging.getLogger(__name__)


class Bot():
    def __init__(self):
        logger.info("Bot object created")
        self.api = API()

        self.logsData = []
        self.projectsData = []

    def startHandler(self, update: Update, context: CallbackContext) -> None:
        message = '{0} <b>Здравствуйте {1}!</b>\nМеня зовут Иван, я бот помощник, разработанный командой Null Safety в рамках хакатона Цифровой прорыв(финал)'.format(u"\U0001f44b", update.message.chat.first_name)
        update.message.reply_html(message)
        createLog(update)

    def startHandlerConnect(self, update: Update, context: CallbackContext) -> None:
        message = '{0} <b>Здравствуйте {1}!</b>\nВы успешно привязали свой Telegram. Пожалуйста, вернитесь в личный кабинет и обновите страницу.'.format(u"\U0001f44b", update.message.chat.first_name)
        update.message.reply_html(message)
        createLog(update)

    def projectsHandler(self, update: Update, context: CallbackContext) -> None:
        pass
    
    def addHandler(self, update: Update, context: CallbackContext) -> None:
        pass

    def deleteHandler(self, update: Update, context: CallbackContext) -> None:
        pass

    def helpHandler(self, update: Update, context: CallbackContext) -> None:
        if len(context.args) == 0:
            update.message.reply_html("Список моих команд")
        elif len(context.args) == 1:
            pass
        elif len(context.args) > 1:
            update.message.reply_html('Ошибка, неверное использование команды. Введите /help <code>help</code> для просмотра информации о команде')
        createLog(update)

    def logsHandler(self, update: Update, context: CallbackContext) -> None:
        if isAdmin(update.message.chat.id):
            data = getLogs()

            self.logsData = []
            logsMessage = ''

            for i in range(len(data)):
                if i % 25 != 0 or i == 0:
                    logsMessage += f'Запись #{data[i].id}. Время - {data[i].time}. От - {data[i].chatid}/{data[i].username}. Команда - {data[i].command}. Админ - {data[i].isAdmin}\n\n'
                else:
                    self.logsData.append(logsMessage)
                    logsMessage = ''

            if logsMessage != '':
                self.logsData.append(logsMessage)

            paginator = InlineKeyboardPaginator(
                len(self.logsData), data_pattern='logs#{page}')
            update.effective_message.reply_html(
                text=self.logsData[0], reply_markup=paginator.markup)

        else:
            update.message.reply_text("У вас нет доступа к этой команде!")

        createLog(update)

    def logsPageCallback(self, update: Update, context: CallbackContext) -> None:
        query = update.callback_query
        query.answer()

        page = int(query.data.split('#')[1])

        paginator = InlineKeyboardPaginator(
            len(self.logsData), current_page=page, data_pattern='logs#{page}')

        query.edit_message_text(
            text=self.logsData[page - 1], reply_markup=paginator.markup)

    def checkUpdatesJobCallback(self, context: CallbackContext) -> None:
        pass

    def run(self):
        updater = Updater(token=TELEGRAM_BOT_TOKEN, use_context=True)
        updater.job_queue.run_repeating(self.checkUpdatesJobCallback, interval=3, context=None)

        dispatcher = updater.dispatcher

        dispatcher.add_handler(CommandHandler('start', self.startHandler))
        dispatcher.add_handler(CommandHandler("start", self.startHandlerConnect, Filters.regex(ADD_TELEGRAM_REGEXP)))
        dispatcher.add_handler(CommandHandler('help', self.helpHandler))
        dispatcher.add_handler(CommandHandler('projects', self.projectsHandler))

        dispatcher.add_handler(CommandHandler('logs', self.logsHandler))
        dispatcher.add_handler(CallbackQueryHandler(self.logsPageCallback, pattern='^logs#'))

        updater.start_polling()
        updater.idle()