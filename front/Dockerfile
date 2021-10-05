FROM node:alpine

RUN mkdir /app

WORKDIR /app

COPY package*.json ./

COPY tsconfig.json ./

RUN npm install --legacy-peer-deps

COPY .eslintrc.js ./

COPY public public

COPY src src

CMD npm start

