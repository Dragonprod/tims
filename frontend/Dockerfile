# FROM node:16.13.0 as build
# WORKDIR /app
# COPY . /app
# RUN npm install
# RUN npm run build

# FROM nginx:alpine
# COPY --from=build /app/build /usr/share/nginx/html
# RUN rm /etc/nginx/conf.d/default.conf
# COPY nginx/nginx.conf /etc/nginx/conf.d
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

# FROM node:16.13.0

# ADD package.json /package.json

# ENV NODE_PATH=/node_modules
# ENV PATH=$PATH:/node_modules/.bin
# RUN npm install

# WORKDIR /app
# ADD . /app

# EXPOSE 8000
# EXPOSE 35729

# ENTRYPOINT ["/bin/bash", "/app/run.sh"]
# CMD ["start"]

FROM node:16.13.0
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]