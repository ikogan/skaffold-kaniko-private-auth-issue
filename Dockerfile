FROM node:10

WORKDIR /app

RUN npm install -g nodemon

ADD app /app

RUN npm install

