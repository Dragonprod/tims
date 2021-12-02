import logging
from src.core.security import get_password_hash
from src.database.database import Session, User

logger = logging.getLogger(__name__)
db = Session()


def init_admin():
    adminRow = User(email='admin@example.com',
                    password=get_password_hash('admin'), is_admin=True)
    db.add(adminRow)
    db.commit()
    db.close()
    logger.info(
        "Default admin added to database. Login - 'admin@example.com', Password - 'admin'.")


def init_user():
    userRow = User(email='user@example.com',
                   password=get_password_hash('user'), is_admin=True)
    db.add(userRow)
    db.commit()
    db.close()
    logger.info(
        "Default admin added to database. Login - 'user@example.com', Password - 'user'.")


def init_statuses():
    logger.info("Default statuses added to database.")


def init_startups():
    logger.info("Default startups added to database.")


def main():
    logger.info("Starting migration process...")
    init_admin()
    init_user()
    init_startups()
    logger.info("Migration process has been ended.")


if __name__ == '__main__':
    main()
