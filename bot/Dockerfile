FROM python:latest
RUN mkdir /usr/src/bot
WORKDIR /usr/src/bot
COPY ./requirements.txt .
RUN pip install -r requirements.txt
ENV PYTHONUNBUFFERED 1
COPY . .