FROM node:20-alpine

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install -g npm@10.8.1

RUN npm install 

RUN npm install -g ts-node

COPY . .

EXPOSE 8080

CMD ["ts-node","server.ts"]

#for bulding the docker, just run the command => docker build . -t cars-api
#for running the docker, just run the command => docker run -p 5050:8080 cars-api
