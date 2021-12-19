FROM node:alpine as builder

WORKDIR /app

COPY . /app/

# RUN npm i --registry=https://registry.npm.taobao.org

# RUN node node_modules/esbuild/install.js

# RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/src/app

COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
