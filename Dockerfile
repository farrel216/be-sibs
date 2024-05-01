FROM node:latest AS base
WORKDIR /app/backend

COPY package*.json ./

RUN npm install
COPY . .
RUN npx prisma generate

FROM base as production

ENV NODE_PATH=./build

RUN npm run build
