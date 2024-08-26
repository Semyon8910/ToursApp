# Используем образ Node.js
FROM node:20-alpine

WORKDIR /usr/src/reactapp

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm install -g serve

EXPOSE 5000

CMD ["serve", "-s", "build", "-l", "5000"]

#for bulding the docker, just run the command => docker build . -t cars-api
#for running the docker, just run the command => docker run -p 5050:8080 cars-api
