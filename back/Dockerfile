FROM node:alpine

RUN mkdir /app

WORKDIR /app

COPY package*.json ./

COPY tsconfig*.json ./

RUN npm i

COPY .eslintrc.json ./

COPY .eslintignore ./

COPY .prettierrc ./

COPY src src 

CMD npm start 
