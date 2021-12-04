from typing import List
from sqlalchemy import desc, asc
import random
from sqlalchemy.orm import joinedload
from starlette.exceptions import HTTPException
from starlette.status import HTTP_404_NOT_FOUND
from src.models.startup import StartupBase, StartupList
from src.database.database import Category, ChildrenCategory, Company, Elastic, Image, Reviews, Startup, Status, User, get_db, Session
from src.helpers.exceptions import EntityDoesNotExist
from fastapi import Depends, Body, Depends
from datetime import date
from sqlalchemy.sql import func
import json
import aiohttp


async def create_startup(startup, db: Session):
    random_date = [date(2015, 9, 10), date(2018, 9, 11), date(
        2005, 9, 12), date(2016, 9, 13), date(2017, 9, 14), date(2020, 9, 15)]
    tags = db.query(Status).filter(Status.id.in_(startup.statuses)).all()
    images = [Image(name=name)
              for name in startup.images] if startup.images is not None else []
    categories = db.query(Category).filter(
        Category.id.in_(startup.categories)).all()
    dbstarup = Startup(startup)
    dbstarup.date = random_date[random.randint(0, len(random_date)-1)]
    db.add(dbstarup)
    db.commit()
    response = await Elastic.create(dbstarup.id, body_params={
        'name': dbstarup.name, 'description': dbstarup.description})
    if response is not None:
        dbstarup.statuses.extend(tags)
        dbstarup.images.extend(images)
        dbstarup.categories.extend(categories)
        db.commit()

    else:
        db.rollback()
        return None
    categories = dbstarup.categories

    users_ids = []

    for i in range(0, len(categories)):
        for sub in categories[i].user:
            users_ids.append(sub.telegram_id)

    async with aiohttp.ClientSession() as session:
        for id in users_ids:
            await session.post(f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage?chat_id={id}&text={dbstarup.name}")
    return dbstarup


async def search_startup(name: str, db: Session):

    body = {
        "query": {
            "multi_match": {
                "query": name,
                "fields": [
                    "name",
                    "description"
                ]
            }
        }
    }

    search = await Elastic.search(body_params=body)
    if search is not None:
        print(search)
        id = [doc['_id']
              for doc in search['hits']['hits']]
        print(id)
        filter = (Startup.id.in_(id))
        return db.query(Startup, func.avg(Reviews.mark), func.count(Reviews.id)).join(Startup.reviewses).group_by(Startup).filter(filter).all()
    return []


async def get_startup_by_id(startup_id, db: Session):
    return db.query(Startup, func.avg(Reviews.mark), func.count(Reviews.id)).join(Startup.reviewses).group_by(Startup).filter(Startup.id == startup_id).first()


async def get_startups(children_categories: List[str], categories: List[str], sort_date: str, offset: int, limit: int, db: Session, sort_mark: str = None, more: bool = None):

    filter_categries = (None == None) if categories is None else Category.name.in_(
        categories)

    filter_children_categories = (None == None) if children_categories is None else ChildrenCategory.name.in_(
        children_categories)

    if more is not None:
        order_reviews = asc(
            "count") if more else desc("count")
        return db.query(Startup, func.avg(Reviews.mark), func.count(Reviews.id).label('count')).join(Startup.categories).join(ChildrenCategory).join(Startup.reviewses).group_by(
            Startup).filter(filter_categries).filter(filter_children_categories).order_by(order_reviews).limit(limit).offset(offset).all()

    order_date = asc(
        Startup.date) if sort_date == "ASC" else desc(Startup.date)

    if sort_mark is not None:
        order_marks = asc('average') if sort_mark == "ASC" else desc('average')
        return db.query(Startup, func.avg(Reviews.mark).label('average'), func.count(Reviews.id)).join(Startup.categories).join(ChildrenCategory).join(Startup.reviewses).group_by(
            Startup).filter(filter_categries).filter(filter_children_categories).order_by(order_marks).limit(limit).offset(offset).all()

    return db.query(Startup, func.avg(Reviews.mark), func.count(Reviews.id)).join(Startup.categories).join(ChildrenCategory).join(Startup.reviewses).group_by(
        Startup).filter(filter_categries).filter(filter_children_categories).order_by(order_date).limit(limit).offset(offset).all()


async def like_startup(user_id: int, startup_id: int, db: Session):
    dbuser = db.query(User).filter(User.id == user_id).first()
    dbstartup = db.query(Startup).filter(Startup.id == startup_id).first()
    if dbuser is not None and dbstartup is not None:
        dbuser.favorites_startup.append(dbstartup)
        db.commit()
        return True
    return None


async def delete_like_startup(user_id: int, startup_id: int, db: Session):
    dbuser = db.query(User).filter(User.id == user_id).first()
    dbstartup = db.query(Startup).filter(Startup.id == startup_id).first()
    if dbuser is not None and dbstartup is not None:
        dbuser.favorites_startup.remove(dbstartup)
        db.commit()
        return True
    return None


async def get_reviews(startup_id: int, db: Session):
    return db.query(Reviews).filter(Reviews.startup_id == startup_id).all()


async def send_application(user_id: int, startup_id: int, db: Session):
    startup = db.query(Startup).filter(Startup.id == startup_id).first()
    user = db.query(User).filter(User.id == user_id).first()
    if startup is not None and user is not None:
        startup.applications.append(user)
        db.commit()
        return user, startup
    return None
