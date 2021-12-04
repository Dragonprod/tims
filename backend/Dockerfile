FROM tiangolo/uvicorn-gunicorn-fastapi:python3.9

RUN pip install --upgrade pip
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY ./src /app

ENV PORT=8080