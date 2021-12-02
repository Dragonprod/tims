import os
import typing
import aiohttp
from requests.exceptions import HTTPError

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, String, Integer, Date, ForeignKey, Float, Boolean, Table
from src.core.config import DATABASE_HOST, DATABASE_PORT, DATABASE_USER, DATABASE_NAME, DATABASE_PASSWORD, PRODUCTION, ELASTIC_HOST, ELASTIC_PORT
import os

engine_postrgesql = create_engine(f'postgresql+psycopg2://{DATABASE_USER}:{DATABASE_PASSWORD}@{DATABASE_HOST}:{DATABASE_PORT}/{DATABASE_NAME}')
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


class User(Base):
    __tablename__ = "user"
    id = Column(Integer, primary_key=True)
    email = Column(String(128))
    password = Column(String(256))
    is_admin = Column(Boolean)
    roles = relationship("Role",
                         secondary=secondary_role, lazy='joined')


class Role(Base):
    __tablename__ = "role"
    id = Column(Integer, primary_key=True)
    role = Column(String(32))


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
    description = Column(String(1024))
    author = Column(Integer, ForeignKey('user.id'))
    statuses = relationship("Status",
                        secondary=seconadary_status, lazy='joined')

    def __init__(self, pydantic_model) -> None:
        self.description = pydantic_model.description
        self.name = pydantic_model.name
        self.author = pydantic_model.author


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
                                        f"/{Elastic._index}/_doc/{id}", body_params=body_params, query_params=query_params) as response:
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
