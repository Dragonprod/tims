## Основная информация

### Функционал:

- function name
- function name
- function name

### Особенности проекта:

- feature name
- feature name
- feature name

### Стек исользуемых технологий:

1. Backend: Python(FastAPI).
2. Frontend: React JS.
3. Work: Docker, Figma, Git.

### Демо:

Демоверсия проекта находится по адресу: [example.com](https://example.com/)

**Тестовые аккаунты:**\
**Администратор:**\
Почта - `admin@example.com`\
Пароль - `admin`

**Клиент:**\
Почта - `user@example.com`\
Пароль - `user`

## Установка и запуск:

### Настройка окружения:

0. Склонируйте репозиторий - `git clone https://github.com/Dragonprod/finalhack.git`
1. Переименуйте файл `.env.example` в `.env`
2. Настройте переменные среды:
```sh
PRODUCTION=True/False ИСПОЛЬЗОВАНИЕ_ПРОДА

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
JWT_ACCESS_TOKEN_EXPIRE_MINUTES=60*24*7

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

1. Запустите проект - `docker-compose up -d`


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
4. Выполните миграции базы данных - `cd backend/database && python3 migrate.py`

### Запуск:

1. Запустите базу данных и PGAdmin - `docker-compose up -d`
2. Запустите backend - `cd backend && uvicorn src.main:app --reload`
3. Запустите frontend - `cd frontend && npm start`
4. Запустите telegram бота - `cd bot && python3 main.py`

### Пути:

**Frontend part** - [http://localhost:3000/](http://localhost:3000/)\
**Backend part** - [http://localhost:8080/](http://localhost:8080/)\
**Backend docs part** - [http://localhost:8080/docs](http://localhost:8080/)\
**Database admin part** - [http://localhost:5050/](http://localhost:5050/)\

## Разработчики:

**Васечкин Артём FullStack** - [@DragonProd](https://t.me/DragonProd)\
**Шевченко Артём Backend** - [@Shmyaks](https://t.me/Shmyaks)\
**Коробов Артём Frontend** - [@maxcore25](https://t.me/maxcore25)\
