FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENTRYPOINT [ "npm" ]

CMD [ "test" ]
