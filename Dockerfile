FROM node:14

WORKDIR /usr/src/app/dam-app-react

COPY package*.json ./

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
