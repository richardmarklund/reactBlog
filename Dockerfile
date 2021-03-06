FROM node:17.6-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN yarn install --frozen-lockfile
COPY . .
RUN  yarn build


FROM nginx:1.19-alpine AS server
COPY --from=builder ./app/build /app
COPY --from=builder ./app/nginx.conf /etc/nginx/conf.d/default.conf 
EXPOSE 3000