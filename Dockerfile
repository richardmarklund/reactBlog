FROM node:17.6-alpine AS builder
WORKDIR /app
RUN yarn install --frozen-lockfile
COPY package*.json ./
COPY . .
RUN  yarn build


FROM nginx:1.19-alpine AS server
COPY --from=builder ./app/build /app/nginx/html
COPY --from=builder ./app/nginx.conf /etc/nginx/conf.d/default.conf 
EXPOSE 3000