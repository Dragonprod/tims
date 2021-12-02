from starlette.exceptions import HTTPException
from starlette.status import HTTP_404_NOT_FOUND
from ..models.startup import StartupBase, StartupList
from ..database.database import Category, Elastic, Startup, Status, User, get_db, Session
from ..helpers.exceptions import EntityDoesNotExist
from fastapi import Depends, Body, Depends


async def create_startup(startup, db: Session):
    tags = db.query(Status).filter(Status.id.in_(startup.statuses)).all()
    categories = db.query(Category).filter(
        Category.id.in_(startup.statuses)).all()
    dbstarup = Startup(startup)
    db.add(dbstarup)
    # response = await Elastic.create(dbstarup.id, body_params={
    #     'name': dbstarup.name, 'description': dbstarup.description})
    # print(response.status)
    # if response is not None:
    dbstarup.statuses.extend(tags)
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
