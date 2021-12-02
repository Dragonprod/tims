from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, String, Integer, Boolean, DateTime

from sqlalchemy.sql.sqltypes import DateTime
from src.core.config import DATABASE_USER, DATABASE_NAME, DATABASE_PASSWORD, PRODUCTION

if PRODUCTION:
    engine_postrgesql = create_engine(f'postgresql+psycopg2://{DATABASE_USER}:{DATABASE_PASSWORD}@database:5432/{DATABASE_NAME}')
else:
    engine_postrgesql = create_engine(
        f'postgresql+psycopg2://{DATABASE_USER}:{DATABASE_PASSWORD}@localhost:5432/{DATABASE_NAME}')
Session = sessionmaker(bind=engine_postrgesql)
Base = declarative_base(bind=engine_postrgesql)


def getDb():
    db = Session()
    try:
        yield db
    finally:
        db.close()


class Logs(Base):
    __tablename__ = "logs"
    id = Column(Integer, primary_key=True)
    time = Column(DateTime)
    chatid = Column(String(255))
    username = Column(String(255))
    command = Column(String(255))
    isAdmin = Column(Boolean, default=False)


Base.metadata.create_all(engine_postrgesql)
