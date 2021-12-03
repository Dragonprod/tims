from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, String, Integer, Boolean, DateTime

from sqlalchemy.sql.sqltypes import DateTime
from src.core.config import DATABASE_USER, DATABASE_NAME, DATABASE_PASSWORD, DATABASE_HOST, DATABASE_PORT

engine_postrgesql = create_engine(
    f'postgresql+psycopg2://{DATABASE_USER}:{DATABASE_PASSWORD}@{DATABASE_HOST}:{DATABASE_PORT}/{DATABASE_NAME}')
Session = sessionmaker(bind=engine_postrgesql)
Base = declarative_base(bind=engine_postrgesql)


def getDb():
    db = Session()
    try:
        yield db
    finally:
        db.close()


class TelegramLogs(Base):
    __tablename__ = "telegram_logs"
    id = Column(Integer, primary_key=True)
    time = Column(DateTime)
    chatid = Column(String(255))
    username = Column(String(255))
    command = Column(String(255))
    isAdmin = Column(Boolean, default=False)

class TelegramUsers(Base):
    __tablename__ = "telegram_users"
    id = Column(Integer, primary_key=True)
    chatid = Column(String(255))
    userid = Column(String(255))

Base.metadata.create_all(engine_postrgesql)
