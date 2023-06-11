FROM node:18 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY . .

RUN npm run build

EXPOSE 4200

CMD ["node", "dist/main"]