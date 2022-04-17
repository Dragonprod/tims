# Витрина решений для акселератора Транспортных инноваций Москвы

## Навигация

- [Описание проекта](#desc)
- [Стек технологий](#stack)
- [Функционал](#functionality)
- [Сборка проекта](#launch)
- [Документация](#docs)
- [Команда](#team)
- [Лицензия](#license)

<a name="desc"></a>

## Описание проекта

Витрина инновационных решений – система, с помощью которой сотрудники организаций транспортного комплекса (потенциальные/функциональные заказчики) смогут ознакомиться с существующими решениями и командами ТИМ и получить доступ к выборке решений под свой запрос.

<a name="stack"></a>

## Стек технологий

- Frontend:
  [![React.js](https://img.shields.io/badge/React.js-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
  [![Redux.js](https://img.shields.io/badge/Redux.js-764ABC?logo=redux&logoColor=white)](https://redux.js.org/)
  [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- Backend:
  [![Fast API](https://img.shields.io/badge/FastAPI-009485?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
  [![ElasticSearch](https://img.shields.io/badge/ElasticSearch-009485?logo=elasticsearch&logoColor=white)](https://www.elastic.co/)
- Bot:
  [![Telegram API](https://img.shields.io/badge/Telegram-555555.svg?logo=telegram&logoColor=white)](https://core.telegram.org/)
- Proxy:
  [![Nginx](https://img.shields.io/badge/Nginx-009639.svg?logo=nginx&logoColor=white)](https://nginx.org/)
- Work:
  [![Figma](https://img.shields.io/badge/Figma-F24E1E?logo=figma&logoColor=white)](https://www.figma.com/)
  [![Docker](https://img.shields.io/badge/Docker-%230db7ed.svg?logo=docker&logoColor=white)](https://www.docker.com/)

<a name="functionality"></a>

## Функционал

- Сотрудник ТИМ
  - Просмотр заявок
  - Просмотр логов
- Владелец проекта
  - Добавление проекта на платформу
  - Подписка на уведомления через Telegram бота или почту
- Руководитель отдела Дептранс
  - Просмотр доступных проектов на платформе
  - Фильтрация и поиск
  - Генерация отчёта в PDF формате по проекту
  - Подписка на уведомления через Telegram бота или почту
  - Добавление проекта в избранное

<a name="launch"></a>

## Сборка проекта

### Production

1. Склонируйте данный репозиторий:

```sh
git clone https://github.com/Dragonprod/tims.git tims
cd tims
```

2. Отредактируйте `.env.example`:

```sh
PROXY_ALLOWED_DOMAINS=YOUR_PROXY_ALLOWED_DOMAINS

BACKEND_DEBUG_MODE=Fasle
BACKEND_API_V1_PREFIX=YOUR_BACKEND_API_V1_PREFIX
BACKEND_JWT_SECRET=YOUR_BACKEND_JWT_SECRET

DATABASE_HOST=YOUR_DATABASE_HOST
DATABASE_NAME=YOUR_DATABASE_NAME
DATABASE_USER=YOUR_DATABASE_USER
DATABASE_PASSWORD=YOUR_DATABASE_PASSWORD
DATABASE_PORT=YOUR_DATABASE_PORT

ELASTIC_HOST=YOUR_ELASTIC_HOST
ELASTIC_PORT=YOUR_ELASTIC_PORT

FRONTEND_DEBUG_MODE=Fasle
FRONTEND_PRODUCTION_URL=YOUR_FRONTEND_PRODUCTION_URL

TELEGRAM_BOT_TOKEN=YOUR_TELEGRAM_BOT_TOKEN
TELEGRAM_ADMIN_CHAT_IDS=0,0,0
```

3. Переименуйте `.env.example` в `.env`
4. Запустите проект с помощь Docker Compose:

```sh
docker-compose -f docker-compose.production.yml up --build -d
```

### Development

1. Склонируйте данный репозиторий:

```sh
git clone https://github.com/Dragonprod/tims.git tims
cd tims
```

2. Отредактируйте `.env.example`:

```sh
PROXY_ALLOWED_DOMAINS=YOUR_PROXY_ALLOWED_DOMAINS

BACKEND_DEBUG_MODE=Fasle
BACKEND_API_V1_PREFIX=YOUR_BACKEND_API_V1_PREFIX
BACKEND_JWT_SECRET=YOUR_BACKEND_JWT_SECRET

DATABASE_HOST=YOUR_DATABASE_HOST
DATABASE_NAME=YOUR_DATABASE_NAME
DATABASE_USER=YOUR_DATABASE_USER
DATABASE_PASSWORD=YOUR_DATABASE_PASSWORD
DATABASE_PORT=YOUR_DATABASE_PORT

ELASTIC_HOST=YOUR_ELASTIC_HOST
ELASTIC_PORT=YOUR_ELASTIC_PORT

FRONTEND_DEBUG_MODE=Fasle
FRONTEND_PRODUCTION_URL=YOUR_FRONTEND_PRODUCTION_URL

TELEGRAM_BOT_TOKEN=YOUR_TELEGRAM_BOT_TOKEN
TELEGRAM_ADMIN_CHAT_IDS=0,0,0
```

3. Переименуйте `.env.example` to `.env`
4. Установите зависимости Backend части:

```sh
cd backend
pip install -r requirements.txt
```

5. Установите зависимости Frontend части:

```sh
cd frontend
npm install
```

6. Установите зависимости Telegram бота:

```sh
cd bot
pip install -r requirements.txt
```

7. Запустите базу данных и Elastic Search с помощью Docker Compose:

```sh
docker-compose -f docker-compose.development.yml up --build -d
```

8. Запустите Backend часть:

```sh
cd backend
python3 main.py
```

9. Запустите Frontend часть:

```sh
cd frontend
npm start
```

10. Запустите Telegram бота:

```sh
cd bot
python3 main.py
```

<a name="docs"></a>

## Документация

Frontend запускается по адресу - [http://localhost:3001](http://localhost:3001 "url запуска frontend")
Backend запускается по адресу - [http://localhost:8000](http://localhost:8000 "url запуска backend")

### Endpoints

- Swagger - [/docs](http://localhost:8000/docs "url запуска Swagger")

### Тестовые аккаунты

- Сотрудник ТИМС

  - Логин - `admin@example.com`
  - Пароль - `admin`

- Клиент ТИМС

  - Логин - `client@example.com`
  - Пароль - `client`

- Владелец проекта
  - Логин - `startup@example.com`
  - Пароль - `startup`

<a name="team"></a>

## Команда

- [Васечкин Артём](https://t.me/DragonProd) - FullStack разработчик
- [Шевченко Максим](https://t.me/Shmyaks) – Backend разработчик
- [Коробов Максим](https://t.me/maxcore25) – Frontend разработчик

<a name="license"></a>

## Лицезия

- [MIT](LICENSE)
