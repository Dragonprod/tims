## Основная информация

### Функционал:

- Витрина стартапов
- Контекстный поиск решений
- Telegram bot

### Особенности проекта:

- Telegram Bot, присылающий уведомления если появились новые проекты по определнному запросу или обновились статусы
- Обширные параметры фильтрации
- Добавление проектов в избранное
- Генерация отчета по стартапу
- Лёгкая интеграция через API

### Стек исользуемых технологий:

1. Backend: Python(FastAPI).
2. Frontend: React JS.
3. Work: Docker, Figma, Git.

### Демо:

Демоверсия проекта находится по адресу: [89.223.65.211](http://89.223.65.211:3000/)
Документация проекта находится по адресу: [89.223.65.211:8080/docs](http://89.223.65.211:8080/docs)

**Тестовые аккаунты:**\
**Администратор:**\
Почта - `admin@example.com`\
Пароль - `admin`

**Стартапер**"\
Почта - `startup@example.com`\
Пароль - `startup`

**Заказчик:**\
Почта - `client@example.com`\
Пароль - `client`

## Установка и запуск:

### Настройка окружения:

0. Склонируйте репозиторий - `git clone https://github.com/Dragonprod/fb67bba6.git`
1. Переименуйте файл `.env.example` в `.env`
2. Настройте переменные среды:
```sh
PRODUCTION=True/False ИСПОЛЬЗОВАНИЕ_ПРОДА

MIGRATION_PASSWORD=ПАРОЛЬ_ДЛЯ_МИГРАЦИЙ

API_V1_PREFIX=ПРЕФИКС_АПИ
PROJECT_NAME=ИМЯ_ПРОЕКТА

DATABASE_HOST=ХОСТ_БД
DATABASE_NAME=ИМЯ_БД
DATABASE_USER=ЮЗЕР_БД
DATABASE_PASSWORD=ПАРОЛЬ_БД
DATABASE_HOST=ПОРТ_БД

ELASTIC_HOST=ХОСТ_ЭЛАСТИКА
ELASTIC_PORT=ПОРТ_ЭЛАСТИКА

ADMIN_DEFAULT_EMAIL=АДМИНПОЧТА_АДМИНКИ_БД
ADMIN_DEFAULT_PASSWORD=АДМИНПАРОЛЬ_АДМИНКИ_БД

JWT_SECRET=КЛЮЧ_JWT

TELEGRAM_BOT_TOKEN=ТОКЕН_ТЕЛЕГРАМ_БОТА
ADMINS_CHAT_IDS=0,0,0 АЙДИ_АДМИНИСТРАЦИИ_БОТА_ЧЕРЕЗ_ЗАПЯТУЮ
```

### Установка необходимых пакетов(Windows/Production):

1. Скачайте и установите **Docker** - [docker.com](https://docs.docker.com/desktop/windows/install/)

### Установка необходимых пакетов(Linux/Production):

1. Обновите указатель локальных пакетов - `sudo apt update`
2. Выполните установку Node.Js - `sudo apt install nodejs`
3. Выполните установку git - `sudo apt install git`
4. Выполните установку Docker:

```sh
sudo apt install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo apt update
apt-cache policy docker-ce
sudo apt install docker-ce
sudo systemctl status docker
```

### Запуск:

1. Запустите проект - `docker-compose up -d`. Подождите 60-120 секунд для запуска `Elastic`
2. Выполните миграции проекта:\
С помощью CURL -
```sh
curl -X 'POST' \
  'http://localhost:8080/api/v1/migrate/start' \
  -H 'accept: application/json' \
  -d ''
```
Или с помощью документации - [localhost:8080/docs](http://localhost:8080/docs/)
![Миграции](/docs/migrate.png "Миграции")

### Установка необходимых пакетов(Windows/Development):

1. Скачайте и установите **Docker** - [docker.com](https://docs.docker.com/desktop/windows/install/)

### Установка необходимых пакетов(Linux/Development):

1. Обновите указатель локальных пакетов - `sudo apt update`
2. Выполните установку Node.Js - `sudo apt install nodejs`
3. Выполните установку git - `sudo apt install git`
4. Выполните установку Docker:

```sh
sudo apt install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo apt update
apt-cache policy docker-ce
sudo apt install docker-ce
sudo systemctl status docker
```

### Установка необходимых зависимостей:

1. Установите зависимости для backend - `cd backend && pip install -r requirements.txt`
2. Установите зависимости для frontend - `cd frontend && npm install`
3. Установите зависимости для telegram бота - `cd bot && pip install -r requirements.txt`
4. Выполните миграции проекта:\
С помощью CURL - 
```sh
curl -X 'POST' \
  'http://localhost:8080/api/v1/migrate/start' \
  -H 'accept: application/json' \
  -d ''
```
Или с помощью документации - [localhost:8080/docs](http://localhost:8080/docs/)
![Миграции](/docs/migrate.png "Миграции")

### Запуск:

1. Запустите базу данных и PGAdmin - `docker-compose up -d`. Подождите 60-120 секунд для запуска `Elastic`
2. Запустите backend - `cd backend && uvicorn src.main:app --reload`
3. Запустите frontend - `cd frontend && npm start`
4. Запустите telegram бота - `cd bot && python3 main.py`

### Пути:

**Frontend part** - [http://localhost:3000/](http://localhost:3000/)\
**Backend part** - [http://localhost:8080/](http://localhost:8080/)\
**Backend docs part** - [http://localhost:8080/docs](http://localhost:8080/)\
**Database admin part** - [http://localhost:5050/](http://localhost:5050/)

## Разработчики:

**Васечкин Артём FullStack** - [@DragonProd](https://t.me/DragonProd)\
**Шевченко Максим Backend** - [@Shmyaks](https://t.me/Shmyaks)\
**Коробов Максим Frontend** - [@maxcore25](https://t.me/maxcore25)
