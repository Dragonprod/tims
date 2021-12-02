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
        message = '{0} <b>Здравствуйте {1}!</b>\nМеня зовут Иван, я бот помощник, разработанный командой Null Safety в рамках хакатона Цифровой прорыв(финал)'.format(
            u"\U0001f44b", update.message.chat.first_name)
        update.message.reply_html(message)
        createLog(update)

    def startHandlerConnect(self, update: Update, context: CallbackContext) -> None:
        message = '{0} <b>Здравствуйте {1}!</b>\nВы успешно привязали свой Telegram. Пожалуйста, вернитесь в личный кабинет и обновите страницу.'.format(
            u"\U0001f44b", update.message.chat.first_name)
        update.message.reply_html(message)
        createLog(update)

    def projectsHandler(self, update: Update, context: CallbackContext) -> None:
        pass

    def addHandler(self, update: Update, context: CallbackContext) -> None:
        if len(context.args) > 0:
            searchRequest = ' '.join(context.args)
            message = f"<b>Вы успешно подписались на новые проекты по запросу:</b> {searchRequest}\n"
            update.message.reply_html(message)

        elif len(context.args) > 1:
            update.message.reply_html(
                'Ошибка, неверное использование команды. Введите /help <code>add</code> для просмотра информации о команде')
        createLog(update)

    def deleteHandler(self, update: Update, context: CallbackContext) -> None:
        pass

    def helpHandler(self, update: Update, context: CallbackContext) -> None:
        if len(context.args) == 0:
            message = "{0} <b>Список моих команд:</b>\n".format(
                u'\U0001f575\ufe0f')
            message += '/start - <b>запустить бота</b>\n'
            message += '/help - <b>посмотреть список всех команд</b>\n'
            message += '/help <code>команда</code> - <b>посмотреть информация по команде</b>\n'
            message += '/add <code>запрос</code> - <b>подписаться на уведомления по проектам</b>\n'
            message += '/delete <code>id</code> - <b>отписаться от уведомлений по проектам</b>\n'
            message += '/projects - <b>посмотреть список доступных проектов</b>\n'
            update.message.reply_html(message)

        elif len(context.args) == 1:

            helpDict = {

                'start':    '<b>Команда:</b> <code>start</code>\n\n<b>Параметры:</b> <code>нет</code>\n<b>Описание:</b> <b>запустить бота</b>',
                'help':     '<b>Команда:</b> <code>help</code>\n\n<b>Параметры:</b> <code>команда(не обязательно)</code>\n<b>Описание:</b> <b>посмотреть список всех команд или получить помощь по конкретной команде</b>',
                'add':      '<b>Команда:</b> <code>add</code>\n\n<b>Параметры:</b> <code>запрос</code>\n<b>Описание:</b> <b>добавить в подписки тему и получать уведомления при добавлении проектов</b>',
                'delete':   '<b>Команда:</b> <code>delete</code>\n\n<b>Параметры:</b> <code>id</code>\n<b>Описание:</b> <b>удалить тему из подписок</b>',
                'projects': '<b>Команда:</b> <code>projects</code>\n\n<b>Параметры:</b> <code>нет</code>\n<b>Описание:</b> <b>посмотреть список всех проектов на платформе</b>',
            }

            update.message.reply_html(helpDict[context.args[0]])

        elif len(context.args) > 1:
            update.message.reply_html(
                'Ошибка, неверное использование команды. Введите /help <code>help</code> для просмотра информации о команде')
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
        updater.job_queue.run_repeating(
            self.checkUpdatesJobCallback, interval=3, context=None)

        dispatcher = updater.dispatcher

        dispatcher.add_handler(CommandHandler('start', self.startHandler))
        dispatcher.add_handler(CommandHandler(
            "start", self.startHandlerConnect, Filters.regex(ADD_TELEGRAM_REGEXP)))
        dispatcher.add_handler(CommandHandler('help', self.helpHandler))
        dispatcher.add_handler(CommandHandler(
            'projects', self.projectsHandler))
        dispatcher.add_handler(CommandHandler('add', self.addHandler))

        dispatcher.add_handler(CommandHandler('logs', self.logsHandler))
        dispatcher.add_handler(CallbackQueryHandler(
            self.logsPageCallback, pattern='^logs#'))

        updater.start_polling()
        updater.idle()
