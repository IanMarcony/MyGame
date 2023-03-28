FROM node:14.18-alpine as build

WORKDIR /usr/app

COPY package.json  .

RUN npm install

COPY . .
ENV REACT_APP_API_URL=http://154.53.35.101:3333
ENV REACT_APP_NAME_STORAGE=@MyGame
RUN npm run build

CMD [ "npx", "serve", "-s", "build" ]
