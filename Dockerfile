FROM node:lts-alpine AS app

RUN npm install -g serve

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3001
CMD [ "serve", "-s", "-p", "3001", "dist" ]
