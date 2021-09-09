FROM node:12.8.0-alpine

WORKDIR /backend

COPY ./package.json .

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]