import random
from starlette.exceptions import HTTPException
from starlette.status import HTTP_404_NOT_FOUND
from ..models.startup import StartupBase, StartupList
from ..database.database import Category, Elastic, Image, Startup, Status, User, get_db, Session
from ..helpers.exceptions import EntityDoesNotExist
from fastapi import Depends, Body, Depends
from datetime import date


async def create_startup(startup, db: Session):
    random_date = [date(2015, 9, 10), date(2018, 9, 11), date(
        2005, 9, 12), date(2016, 9, 13), date(2017, 9, 14), date(2020, 9, 15)]
    tags = db.query(Status).filter(Status.id.in_(startup.statuses)).all()
    images = [Image(name=name)
              for name in startup.images] if startup.images is not None else []
    categories = db.query(Category).filter(
        Category.id.in_(startup.statuses)).all()
    dbstarup = Startup(startup)
    dbstarup.date = random_date[random.randint(0, len(random_date)-1)]
    db.add(dbstarup)
    # response = await Elastic.create(dbstarup.id, body_params={
    #     'name': dbstarup.name, 'description': dbstarup.description})
    # print(response.status)
    # if response is not None:
    dbstarup.statuses.extend(tags)
    dbstarup.images.extend(images)
    dbstarup.categories.extend(categories)
    print(1)
    db.commit()
    # else:
    #     db.rollback()
    return dbstarup


async def search_startup(name: str, db: Session):

    body = {
        "query": {
            "match": {
                "name": name
            }
        }
    }

    search = await Elastic.search(body_params=body)
    print(search)
    if search is not None:
        id = [doc['_id'] for doc in search['hits']['hits']]
        filter = (Startup.id.in_(id))
        return db.query(Startup).filter(filter).all()


async def get_startup(startup_id, db: Session):
    return db.query(Startup).filter(Startup.id == startup_id).first()


async def get_startups(offset: int, db: Session):
    return db.query(Startup).limit(offset).all()


async def like_startup(startup_id: int, db: Session):
    dbstartup = db.query(Startup).filter(Startup.id == startup_id).first()
    if dbstartup is not None:
        dbstartup.likes += 1
        db.commit()
    return dbstartup
