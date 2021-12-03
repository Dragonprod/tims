import asyncio
import aiohttp
import random


async def migrate_start():
    # L = await asyncio.gather(asyncio.create_task(create_users(db, session=session)),
    #                          asyncio.create_task(
    #                              create_categories(db, session=session)),
    #                          asyncio.create_task(
    #                              create_statusses(db, session=session)),
    #                          asyncio.create_task(create_company(db, session=session)))

    await create_roles()
    await create_users()
    await create_company()
    await update_users()
    await create_statusses()
    await create_categories()
    await create_startup()
    await create_reviews()


async def update_users():
    user1 = {
        "user_id": 1,
        "first_name": "Андрей",
        "second_name": "Зуев",
        "patronymic": "Сергеевич",
        "phone": "89005553535",
        "position": "Директор городского транспорта",
        "company_id": 2
    }
    user2 = {
        "user_id": 2,
        "first_name": "Иван",
        "second_name": "Букров",
        "patronymic": "Сергеевич",
        "phone": "89013213312",
        "position": "Директор мобильности пассажиров",
        "company_id": 5
    }
    user3 = {
        "user_id": 3,
        "first_name": "Артём",
        "second_name": "Добрович",
        "patronymic": "Леонидович",
        "phone": "89005435345",
        "position": "Генеральный советник",
        "company_id": 1
    }
    async with aiohttp.ClientSession() as session:
        await session.put("http://localhost:8080/api/v1/user", json=user1)
        await session.put("http://localhost:8080/api/v1/user", json=user2)
        await session.put("http://localhost:8080/api/v1/user", json=user3)


async def create_roles():
    role1 = {"role": "admin"}
    role2 = {"role": "client"}
    role3 = {"role": "startup"}

    async with aiohttp.ClientSession() as session:
        await session.post("http://localhost:8080/api/v1/role/create", json=role1)
        await session.post("http://localhost:8080/api/v1/role/create", json=role2)
        await session.post("http://localhost:8080/api/v1/role/create", json=role3)


async def create_users():
    user1 = {"email": "admin@example.com",
             "password": "admin", "is_admin": "true", "roles": [1]}
    user2 = {"email": "client@example.com",
             "password": "client", "is_admin": "false", "roles": [2]}
    user3 = {"email": "startup@example.com",
             "password": "startup", "is_admin": "false", "roles": [3]}
    async with aiohttp.ClientSession() as session:
        await session.post("http://localhost:8080/api/v1/users/create", json=user1)
        await session.post("http://localhost:8080/api/v1/users/create", json=user2)
        await session.post("http://localhost:8080/api/v1/users/create", json=user3)


async def create_categories():
    parent_categories = [
        "Городской транспорт",
        "Новые виды мобильности",
        "Безопасность дорожного движения",
        "Здоровые улицы и экология",
        "Цифровые технологии в транспорте"
    ]

    children_category1 = ["Метрополитен",
                          "Наземный транспорт",
                          "Остановочные пункты",
                          "Обратная связь"]

    children_category2 = ["Зарядная инфраструктура",
                          "Водный транспорт",
                          "Беспилотный транспорт",
                          "Перевозки"]

    children_category3 = ["Анализ  ДТП",
                          "Снижение аварийности с участием грузовиков и мотоциклистов",
                          "Снижение наездов на пешеходов вне пешеходных переходов, во дворах и вблизи школ",
                          "Безопасность каршеринга",
                          "Борьба с превышением скорости",
                          "Оптимизация кол-ва транспорта",
                          "Безопасность пешеходов",
                          "Оптимизация парковки"]

    children_category4 = ["Развитие передвижения на велосипедах и самокатах",
                          "Электротранспорт",
                          "Пешеходы",
                          "Экологическая ситуация"]

    children_category5 = ["Оценка парк. мест",
                          "Совместные поездки",
                          "Подписки на поездки",
                          "Планирование маршрута",
                          "MaaS",
                          "Аналитика транспорта",
                          "Беспилотный наземный транспорт",
                          "Эко маршруты"]

    category1 = {'name': parent_categories[0],
                 "children": children_category1}
    category2 = {'name': parent_categories[1],
                 "children": children_category2}
    category3 = {'name': parent_categories[2],
                 "children": children_category3}
    category4 = {'name': parent_categories[3],
                 "children": children_category4}
    category5 = {'name': parent_categories[4],
                 "children": children_category5}
    async with aiohttp.ClientSession() as session:
        await session.post("http://localhost:8080/api/v1/category/create", json=category1)
        await session.post("http://localhost:8080/api/v1/category/create", json=category2)
        await session.post("http://localhost:8080/api/v1/category/create", json=category3)
        await session.post("http://localhost:8080/api/v1/category/create", json=category4)
        await session.post("http://localhost:8080/api/v1/category/create", json=category5)


async def create_statusses():
    statuses = ["Поиск инвестора",
                "Уточнение деталей",
                "Подготовка к тестированию",
                "Пилотное тестирование",
                "Формирование отчета",
                "Готовое решение",
                "Приостановлен",
                "Отменён",
                "Закрыт"]

    async with aiohttp.ClientSession() as session:
        for i in range(0, len(statuses)):
            await session.post("http://localhost:8080/api/v1/status/create", json={'name': statuses[i]})


async def create_company():
    companies = [
        "ПАО Инвест Фьючерс",
        "ООО СтартАперз тим",
        "ОАО Аэрофлот",
        "ООО Нейро инвест",
        "ООО Альфа транс тим",
        "ООО Ростелетим",
        "ПАО Зуев Инвест",
        "ООО Династия Транс",
        "ОАО Победители инвест",
        "ООО РТА дев",
    ]

    async with aiohttp.ClientSession() as session:
        for i in range(0, len(companies)):
            await session.post("http://localhost:8080/api/v1/company/create", json={'name': companies[i], "inn": "21321321", "count_workers": random.randint(0, 30)})


async def create_startup():
    print("Startup")

    description = [
        "За последние 7 лет я создал самый передовой в мире разговорный ИИ с открытым доменом для Replika - чат-бота №1 в США с более чем 10 миллионами пользователей.",
        "Технология мониторинга может применяться как для учёта транспортных потоков, так и для адаптивного регулирования перекрёстков. Система способна определять ДТП, занятость парковочных мест, контролировать соблюдение правил дорожного движения."
        "Система видеонаблюдения за дорожной ситуацией через беспилотники: На дорогах США, где установлено более 1 млн камер, количество аварий снизилось на 28%.",
        "Обогреваемые остановки наземного транспорта: В Москве нет наземного городского общественного наземного электрического пассажирского автомобильного и пешеходного движения.",
        "Программное обеспечение для анализа транспортных потоков по видео: Анализ данных по видео в реальном времени.",
        "Автоматические двери метрополитена: Автоматические двери метро не должны закрываться.",
        "Восстановление автобусных путей между станциями метрополитена: В Москве все станции метро соединены между собой с помощью автобусов и трамваев.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    ]

    author = 2
    categories = [[1, 2, 3]]
    sertificate = [True, False]

    name = [
        "Система видеонаблюдения за дорожной ситуацией через беспилотники",
        "Обогреваемые остановки наземного транспорта",
        "Программное обеспечение для анализа транспортных потоков по видео",
        "Автоматические двери метрополитена",
        "Система умных пандусов для маломобильный граждан городского транспорта",
        "Оплата проезда в метрополитене с помощью лица",
        "Анализирующие дорожную ситуацию скоростные знаки",
        "Радар для контроля скорости электросамокатов",
        "Программное обеспечение для анализа уровня воды в период сильных дождей",
        "Система анализа движения общественного городского транспорта",
        "Система беспилотного управления поездами московского метрополитена",
        "Система беспилотного управления автобусами обшественного транспорта",
        "Беспилотная система доставки почты",
        "Восстановление автобусных путей между станциями метрополитена",
        "Единая система транспортной навигации в Москве",
        "Система определения безбилетников в салоне по манере поведения через видеокамеры",
        "Программное обеспечение для анализа забытых вещей в метрополитене",
        "Программное обеспечение для анализа технического состояния общественного транспорта",
        "Система для опредления изношенности колёсных пар вагонов метрополитена",
        "Система анализа загруженности станиций метрополитена",
        "Система определения влияния погодных условий на состояние поездов МЦК",
        "Система определения влияния погодных условий на состояние поездов МЦД",
        "Система анализа физического состояния водителей автобусов московского транспорта",
        "Система анализа физического состояния машинистов поездов метрополитена",
        "Система анализа уровня давления в колесах автобусов",
        "Программное обеспечение для опредление изношенности рельс",
        "Система прогнозирования аварийных ситуаций на дороге",
        "Система анти-сон для водителей городского транспорта",
        "Программное обеспечение для опредление паданения напряжения на линиях электропередач трамваем",
        "Система экстренного торможения при аварийных ситуацией",
        "Уличные роботы уборщики",
        "Система плавного торможения для безопасного вождения"
    ]

    statuses = [[1], [1], [1], [5], [4], [2], [3], [4], [2], [4]]
    company_ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    async with aiohttp.ClientSession() as session:
        for i in range(40):
            await session.post("http://localhost:8080/api/v1/startup/create", json={
                "description": random.choice(description),
                "name": random.choice(name),
                "author": author,
                "statuses": random.choice(statuses),
                "sertificate": random.choice(sertificate),
                "usecases": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                "categories": categories[0],
                "company_id": random.choice(company_ids),
                "brief_description": "Короткое описание продукта",
                "product_use_cases": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                "usability": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"})


async def create_reviews():
    print("Reviews")

    review = [
        "Проект успешно прошел первый этап тестирования. В результате проверок были выявлены некоторые недостатки, которые оперативно были устранены. Очень очень очень длинный текст который лежит в базе.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        "Данный продукт успешно прошел все этапы тестрования и пилотирования. Из плюсов проекта можно отметить грамотную реализацию серверной части, используя MVC архитектуру. Это поможет легко обслуживать такой проект в дальнейшем без привлечения разработчиков данного стартапа."
    ]

    async with aiohttp.ClientSession() as session:
        for i in range(40):
            for j in range(random.randint(1, 15)):
                await session.post("http://localhost:8080/api/v1/user/review/add", json={
                    "review": random.choice(review),
                    "user_id": 2,
                    "startup_id": i + 1,
                    "mark": random.randint(0, 10)
                })
