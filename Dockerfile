FROM node:10

WORKDIR /app

RUN npm install -g nodeman

ADD app /app

RUN npm install

