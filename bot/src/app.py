import logging
import random

from telegram import Update, ReplyKeyboardMarkup
from telegram.ext import Updater, CommandHandler, CallbackContext, MessageHandler, CallbackQueryHandler, Filters, ConversationHandler
from telegram_bot_pagination import InlineKeyboardPaginator

from src.core.config import TELEGRAM_BOT_TOKEN, ADD_TELEGRAM_REGEXP
from src.core.keyboards import MENU_KEYBOARD_CLIENT, MENU_KEYBOARD_STARTUP, CATEGORIES_KEYBOARD, NOTIFICATIONS_KEYBOARD

from src.crud.logs import createLog, getLogs, getLogsById
from src.crud.users import disableNotifications, enableNotifications, createUser, getUserById, updateUserCategory

from src.providers.functionsProvider import getAverage
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
        update.message.reply_html(message, reply_markup=ReplyKeyboardMarkup(
            MENU_KEYBOARD_CLIENT, resize_keyboard=True, one_time_keyboard=False))
        createLog(update)

    def startHandlerConnect(self, update: Update, context: CallbackContext) -> None:
        result = self.api.connectAccount(
            context.args[0], update.message.chat.id)
        createUser(str(update.message.chat.id), result['id'])
        message = '{0} <b>Здравствуйте {1}!</b>\nВы успешно привязали свой Telegram. Пожалуйста, вернитесь в личный кабинет и обновите страницу.'.format(
            u"\U0001f44b", update.message.chat.first_name)
        update.message.reply_html(message)
        createLog(update)

    def profileHandler(self, update: Update, context: CallbackContext) -> None:
        pass

    def projectsHandler(self, update: Update, context: CallbackContext) -> None:
        data = self.api.getProjects()

        self.projectsData = []
        projectMessage = ''

        for i in range(len(data)):
            if i % 5 != 0 or i == 0:
                projectMessage += f'<b>Название</b> - <i>{data[i]["name"]}</i>\n'
                projectMessage += f'<b>Описание</b> - <i>{data[i]["description"]}</i>\n'
                projectMessage += f'<b>Кол-во оценок</b> - <i>{random.randint(0,10)}</i>\n'
                projectMessage += f'<b>Средняя оценка</b> - <i>{random.randint(0,10)}</i>\n'
                projectMessage += f'<b>Дата создания</b> - <i>{data[i]["date"]}</i>\n\n'
            else:
                self.projectsData.append(projectMessage)
                projectMessage = ''

        if projectMessage != '':
            self.projectsData.append(projectMessage)

        paginator = InlineKeyboardPaginator(
            len(self.projectsData), data_pattern='projects#{page}')
        update.effective_message.reply_html(
            text=self.projectsData[0], reply_markup=paginator.markup)

    def projectsPageCallback(self, update: Update, context: CallbackContext) -> None:
        query = update.callback_query
        query.answer()

        page = int(query.data.split('#')[1])

        paginator = InlineKeyboardPaginator(
            len(self.projectsData), current_page=page, data_pattern='projects#{page}')

        query.edit_message_text(
            text=self.projectsData[page - 1], reply_markup=paginator.markup)

    def categoriesHandler(self, update: Update, context: CallbackContext) -> None:
        message = "Список доступных категорий:\n"
        message += "1. Городской транспорт\n"
        message += "2. Новые виды мобильности\n"
        message += "3. Безопасноть дорожного движения\n"
        message += "4. Здоровые улицы и экология\n"
        message += "5. Цифровые технологии в транспорте\n\n"
        message += "Введите <code>/add номер категории</code> чтобы подписаться на уведомления"
        update.message.reply_html(message)
        createLog(update)

    def addHandler(self, update: Update, context: CallbackContext) -> None:
        if len(context.args) == 1:
            id = context.args[0]
            projectsMapper = {
                1: "Городской транспорт",
                2: "Новые виды мобильности",
                3: "Безопасноть дорожного движения",
                4: "Здоровые улицы и экология",
                5: "Цифровые технологии в транспорте"
            }
            if (getUserById(str(update.message.chat.id))):
                self.api.addProjectToWatchList(str(update.message.chat.id), id)
                updateUserCategory(
                    str(update.message.chat.id), projectsMapper[id])
                message = f"<b>Вы успешно подписались на новые проекты по запросу:</b> {projectsMapper[id]}\n"

                update.message.reply_html(message)
            else:
                update.message.reply_html("Ваш аккаунт не найден в базе.")

        elif len(context.args) > 1:
            update.message.reply_html(
                'Ошибка, неверное использование команды. Введите /help <code>add</code> для просмотра информации о команде')
        createLog(update)

    def deleteHandler(self, update: Update, context: CallbackContext) -> None:
        pass

    def menuHandler(self, update: Update, context: CallbackContext) -> None:
        update.message.reply_html("Выберите, что вы хотите сделать", reply_markup=ReplyKeyboardMarkup(
            MENU_KEYBOARD_CLIENT, resize_keyboard=True, one_time_keyboard=True))
        createLog(update)

    def notificationsPanelHandler(self, update: Update, context: CallbackContext) -> None:
        update.message.reply_html("Выберите, что вы хотите сделать", reply_markup=ReplyKeyboardMarkup(
            NOTIFICATIONS_KEYBOARD, resize_keyboard=True, one_time_keyboard=True))
        createLog(update)

    def notificationsHandler(self, update: Update, context: CallbackContext) -> None:
        if len(context.args) == 1:
            if context.args[0] == 'on':
                update.message.reply_html(
                    "Вы успешно включили уведомления. Теперь бот будет присылать вам сообщения.")
                update.message.reply_html(
                    "Чтобы отключить уведомления, введите команду <code>/notifications off</code> или введите /menu и нажмите на кнопку Уведомления")
                enableNotifications(str(update.message.chat.id))
            elif context.args[0] == 'off':
                update.message.reply_html(
                    "Вы успешно отключили уведомления. Теперь бот не будет присылать вам сообщения.")
                update.message.reply_html(
                    "Чтобы включить уведомления, введите команду <code>/notifications on</code> или введите /menu и нажмите на кнопку Уведомления")
                disableNotifications(str(update.message.chat.id))
            else:
                update.message.reply_html(
                    'Ошибка, неверное использование команды. Введите /help <code>notifications</code> для просмотра информации о команде')
        else:
            update.message.reply_html(
                'Ошибка, неверное использование команды. Введите /help <code>notifications</code> для просмотра информации о команде')
        createLog(update)

    def enableNotificationsHandler(self, update: Update, context: CallbackContext) -> None:
        update.message.reply_html(
            "Вы успешно включили уведомления. Теперь бот будет присылать вам сообщения.")
        update.message.reply_html(
            "Чтобы отключить уведомления, введите команду <code>/notifications off</code> или введите /menu и нажмите на кнопку Уведомления")
        enableNotifications(str(update.message.chat.id))
        createLog(update)

    def disableNotificationsHandler(self, update: Update, context: CallbackContext) -> None:
        update.message.reply_html(
            "Вы успешно отключили уведомления. Теперь бот не будет присылать вам сообщения.")
        update.message.reply_html(
            "Чтобы включить уведомления, введите команду <code>/notifications on</code> или введите /menu и нажмите на кнопку Уведомления")
        disableNotifications(str(update.message.chat.id))
        createLog(update)

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
            message += '/notifications <code>on/off</code> - <b>включение/выключение уведомлений</b>\n'
            message += '/menu - <b>вызов меню</b>\n'
            update.message.reply_html(message)

        elif len(context.args) == 1:

            helpDict = {

                'start':    '<b>Команда:</b> <code>start</code>\n\n<b>Параметры:</b> <code>нет</code>\n<b>Описание:</b> <b>запустить бота</b>',
                'help':     '<b>Команда:</b> <code>help</code>\n\n<b>Параметры:</b> <code>команда(не обязательно)</code>\n<b>Описание:</b> <b>посмотреть список всех команд или получить помощь по конкретной команде</b>',
                'add':      '<b>Команда:</b> <code>add</code>\n\n<b>Параметры:</b> <code>запрос</code>\n<b>Описание:</b> <b>добавить в подписки тему и получать уведомления при добавлении проектов</b>',
                'delete':   '<b>Команда:</b> <code>delete</code>\n\n<b>Параметры:</b> <code>id</code>\n<b>Описание:</b> <b>удалить тему из подписок</b>',
                'projects': '<b>Команда:</b> <code>projects</code>\n\n<b>Параметры:</b> <code>нет</code>\n<b>Описание:</b> <b>посмотреть список всех проектов на платформе</b>',
                'notifications': '<b>Команда:</b> <code>notifications</code>\n\n<b>Параметры:</b> <code>on/off</code>\n<b>Описание:</b> <b>включение/выключение уведомлений</b>',
                'menu': '<b>Команда:</b> <code>menu</code>\n\n<b>Параметры:</b> <code>нет</code>\n<b>Описание:</b> <b>вызов меню</b>',
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

    def run(self):
        updater = Updater(token=TELEGRAM_BOT_TOKEN, use_context=True)

        dispatcher = updater.dispatcher
        dispatcher.add_handler(CommandHandler(
            "start", self.startHandlerConnect, Filters.regex(ADD_TELEGRAM_REGEXP)))
        dispatcher.add_handler(CommandHandler('start', self.startHandler))
        dispatcher.add_handler(CommandHandler('help', self.helpHandler))
        dispatcher.add_handler(CommandHandler(
            'categories', self.categoriesHandler))
        dispatcher.add_handler(CommandHandler(
            'projects', self.projectsHandler))
        dispatcher.add_handler(CallbackQueryHandler(
            self.projectsHandler, pattern='^projects#'))
        dispatcher.add_handler(CommandHandler('add', self.addHandler))

        dispatcher.add_handler(CommandHandler('menu', self.menuHandler))
        dispatcher.add_handler(CommandHandler(
            'notifications', self.notificationsHandler))
        dispatcher.add_handler(MessageHandler(Filters.regex(
            '^{0} Уведомления'.format(u"\U0001f514")), self.notificationsPanelHandler))
        dispatcher.add_handler(MessageHandler(Filters.regex(
            '^{0} Включить'.format(u"\U0001f50a")), self.enableNotificationsHandler))
        dispatcher.add_handler(MessageHandler(Filters.regex(
            '^{0} Выключить'.format(u"\U0001f509")), self.disableNotificationsHandler))

        dispatcher.add_handler(CommandHandler('logs', self.logsHandler))
        dispatcher.add_handler(CallbackQueryHandler(
            self.logsPageCallback, pattern='^logs#'))

        updater.start_polling()
        updater.idle()
