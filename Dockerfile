FROM node:17.6-alpine
WORKDIR /pappakeno/blog/backend
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8081
CMD [ "node", "App.js" ]
