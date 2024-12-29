FROM node:22

WORKDIR /app

COPY /app/package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]