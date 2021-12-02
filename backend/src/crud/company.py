from starlette.exceptions import HTTPException
from starlette.status import HTTP_404_NOT_FOUND
from ..database.database import Company, Elastic, Startup, Status, User, get_db, Session, Category
from ..helpers.exceptions import EntityDoesNotExist
from fastapi import Depends, Body, Depends


async def create_company(company, db: Session):
    dbcompany = Company(company)
    db.add(dbcompany)
    db.commit()
    return dbcompany


async def get_company(company_id, db: Session):
    return db.query(Company).filter(Company.id == company_id).first()


async def get_companies(db: Session):
    return db.query(Company).all()
