FROM node:14.18-alpine as base

WORKDIR /usr/app

COPY .  .

RUN npm install
RUN npm build
RUN npm run build:fix
