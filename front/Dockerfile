FROM node:alpine

RUN mkdir /app

WORKDIR /app

COPY package*.json ./

COPY tsconfig.json ./

RUN npm i

COPY .eslintrc.js ./

COPY public public

COPY src src

CMD npm start

