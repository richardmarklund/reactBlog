FROM node:17.6-alpine
WORKDIR /pappakeno/blog/backend
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "node", "App.js" ]
