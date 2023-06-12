FROM node:18 AS build

WORKDIR /app

COPY ./dist ./dist

COPY package.json ./

# RUN npm i -g @nestjs/cli

RUN npm i --omit-dev

EXPOSE 3000

CMD ["node", "dist/main"]