FROM node:20.11.1

WORKDIR /chatapp

COPY package*.json ./

RUN npm install


COPY . .


EXPOSE 3000

CMD ["NODE","server.ts"]