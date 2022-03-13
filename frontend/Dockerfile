FROM node:latest as builder
WORKDIR /frontend
COPY package.json /frontend/package.json
RUN npm install --only=prod
COPY . /frontend
EXPOSE 3000
ENTRYPOINT npm start