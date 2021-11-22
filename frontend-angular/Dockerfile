FROM node:14-slim AS builder
LABEL authors="jjpaya,iferrer20"
WORKDIR /frontend
COPY . .
RUN npm install
RUN npm run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=builder /frontend/dist/* ./
