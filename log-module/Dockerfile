FROM node:16.13.2-alpine

RUN npm i npm@latest -g

RUN mkdir /app/
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

CMD [ "node", "index.js" ]