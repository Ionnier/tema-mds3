FROM node:16.13.2-alpine AS build

RUN npm i npm@latest -g

RUN mkdir /app/
WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .

ARG VITE_AUTH_SERVICE=http://localhost:3001
ENV VITE_AUTH_SERVICE=$VITE_AUTH_SERVICE

ARG VITE_TTS_SERVICE=http://localhost:3002
ENV VITE_TTS_SERVICE=$VITE_TTS_SERVICE

ARG VITE_MESSAGE_SERVICE=http://localhost:3003
ENV VITE_MESSAGE_SERVICE=$VITE_MESSAGE_SERVICE

RUN npm run build

FROM nginx:1.19-alpine
COPY --from=build /app/dist /usr/share/nginx/html 