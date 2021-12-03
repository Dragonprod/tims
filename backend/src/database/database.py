import typing
import aiohttp
from requests.exceptions import HTTPError
from sqlalchemy import create_engine
from sqlalchemy.orm import backref, sessionmaker, relationship
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, String, Integer, Date, ForeignKey, Float, Boolean, Table
from sqlalchemy.util.langhelpers import public_factory
from src.core.config import DATABASE_HOST, DATABASE_PORT, DATABASE_USER, DATABASE_NAME, DATABASE_PASSWORD, PRODUCTION, ELASTIC_HOST, ELASTIC_PORT
import os
import datetime

engine_postrgesql = create_engine(
    f'postgresql+psycopg2://{DATABASE_USER}:{DATABASE_PASSWORD}@{DATABASE_HOST}:{DATABASE_PORT}/{DATABASE_NAME}')
Session = sessionmaker(bind=engine_postrgesql)
Base = declarative_base(bind=engine_postrgesql)


def get_db():
    """Auto closed"""
    db = Session()
    try:
        yield db
    finally:
        db.close()


secondary_role = Table('user_roles', Base.metadata,
                       Column('user_id', ForeignKey('user.id')),
                       Column('role_id', ForeignKey('role.id'))
                       )

seconadary_status = Table("statuses_startups", Base.metadata,
                          Column('status_id', ForeignKey('status.id')),
                          Column('startup_id', ForeignKey('startup.id'))
                          )

seconadary_startup = Table("categories_startup", Base.metadata,
                           Column('category_id', ForeignKey(
                               'category.id')),
                           Column('startup_id', ForeignKey('startup.id'))
                           )

seconadary_favorites = Table("favorites", Base.metadata,
                             Column('user_id', ForeignKey(
                                 'user.id')),
                             Column('startup_id', ForeignKey('startup.id'))
                             )


seconadary_applications = Table("applications", Base.metadata,
                                Column('user_id', ForeignKey(
                                    'user.id')),
                                Column('startup_id', ForeignKey('startup.id'))
                                )


class User(Base):
    __tablename__ = "user"
    id = Column(Integer, primary_key=True)
    email = Column(String(128))
    password = Column(String(256))
    is_admin = Column(Boolean)
    telegram_id = Column(Integer)
    activationLink = Column(String(128))
    roles = relationship("Role",
                         secondary=secondary_role)
    detail = relationship(
        "UserDetail", back_populates="user_info", uselist=False)
    favorites_startup = relationship(
        "Startup", secondary=seconadary_favorites)


class UserDetail(Base):
    __tablename__ = "user_detail"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('user.id'))
    first_name = Column(String(128))
    second_name = Column(String(128))
    patronymic = Column(String(128))
    phone = Column(String(32))
    position = Column(String(64), nullable=True)
    company_id = Column(Integer, ForeignKey('company.id'), nullable=True)
    user_info = relationship("User")

    def __init__(self, pydantic_model) -> None:
        self.user_id = pydantic_model.user_id
        self.first_name = pydantic_model.first_name
        self.second_name = pydantic_model.second_name
        self.patronymic = pydantic_model.patronymic
        self.phone = pydantic_model.phone
        self.position = pydantic_model.position
        self.company_id = pydantic_model.company_id


class Company(Base):
    __tablename__ = "company"
    id = Column(Integer, primary_key=True)
    name = Column(String(128))
    inn = Column(String(64))
    count_workers = Column(Integer)

    def __init__(self, pydantic_model) -> None:
        self.name = pydantic_model.name
        self.inn = pydantic_model.inn
        self.count_workers = pydantic_model.count_workers


class Role(Base):
    __tablename__ = "role"
    id = Column(Integer, primary_key=True)
    role = Column(String(32))

    def __init__(self, pydantic_model) -> None:
        self.role = pydantic_model.role


class Status(Base):
    __tablename__ = "status"
    id = Column(Integer, primary_key=True)
    name = Column(String(128))

    def __init__(self, pydantic_model) -> None:
        self.name = pydantic_model.name


class Startup(Base):
    __tablename__ = "startup"
    id = Column(Integer, primary_key=True)
    name = Column(String(256))
    date = Column(Date)
    description = Column(String(1024))
    brief_description = Column(String(512))
    product_use_cases = Column(String(512))
    usability = Column(String(1024))
    author = Column(Integer, ForeignKey('user.id'))
    company_id = Column(Integer, ForeignKey('company.id'))
    sertificate = Column(String(128))
    images = relationship("Image")
    statuses = relationship("Status",
                            secondary=seconadary_status)
    categories = relationship(
        "Category", secondary=seconadary_startup)
    company = relationship(
        "Company", uselist=False)
    reviewses = relationship(
        "Reviews", back_populates="startap")
    applications = relationship(
        "User", secondary=seconadary_applications, lazy='dynamic')

    def __init__(self, pydantic_model) -> None:
        self.description = pydantic_model.description
        self.name = pydantic_model.name
        self.author = pydantic_model.author
        self.company_id = pydantic_model.company_id
        self.sertificate = pydantic_model.sertificate
        self.brief_description = pydantic_model.brief_description
        self.product_use_cases = pydantic_model.product_use_cases
        self.usability = pydantic_model.usability


class Reviews(Base):
    __tablename__ = "reviews"
    id = Column(Integer, primary_key=True)
    review = Column(String(256))
    mark = Column(Integer)
    user_id = Column(Integer, ForeignKey('user.id'))
    startup_id = Column(Integer, ForeignKey('startup.id'))
    startap = relationship("Startup")
    user = relationship("User")

    def __init__(self, pydantic_model) -> None:
        self.review = pydantic_model.review
        self.user_id = pydantic_model.user_id
        self.startup_id = pydantic_model.startup_id
        self.mark = pydantic_model.mark


class Image(Base):
    __tablename__ = "image"
    id = Column(Integer, primary_key=True)
    name = Column(String(256))
    startup_id = Column(Integer, ForeignKey('startup.id'))


class Category(Base):
    __tablename__ = "category"
    id = Column(Integer, primary_key=True)
    name = Column(String(256))
    children = relationship(
        "ChildrenCategory", back_populates="parent_category")

    def __init__(self, pydantic_model) -> None:
        self.name = pydantic_model.name


class ChildrenCategory(Base):
    __tablename__ = "children_category"
    id = Column(Integer, primary_key=True)
    name = Column(String(128))
    parent_category_id = Column(Integer, ForeignKey('category.id'))
    parent_category = relationship(
        "Category")


Base.metadata.create_all(engine_postrgesql)


class Elastic():
    _index = 'docs'
    _host = f'{ELASTIC_HOST}:{ELASTIC_PORT}'

    @staticmethod
    async def create(id: int, query_params: typing.Optional[dict] = None,
                     body_params: typing.Optional[dict] = None) -> None:
        try:
            async with aiohttp.ClientSession() as session:
                async with session.post(Elastic._host +
                                        f"/{Elastic._index}/_doc/{id}", json=body_params, query_params=query_params) as response:
                    response.raise_for_status()
        except HTTPError as http_err:
            return None
        except Exception as err:
            return None
        return await response.json()

    @staticmethod
    async def search(query_params: typing.Optional[dict] = None,
                     body_params: typing.Optional[dict] = None) -> dict:
        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(Elastic._host + f"/{Elastic._index}/_search/", body_params=body_params, query_params=query_params) as response:
                    response.raise_for_status()
        except HTTPError as http_err:
            return None
        except Exception as err:
            return None
        return await response.json()

    @staticmethod
    async def delete(id: int) -> None:
        try:
            async with aiohttp.ClientSession() as session:
                async with session.delete(Elastic._host + f"/{Elastic._index}/_doc/{id}") as response:
                    response.raise_for_status()
        except HTTPError as http_err:
            return None
        except Exception as err:
            return None
        return await response.json()  # need to json
