FROM node:14-slim
LABEL authors="jjpaya,iferrer20"
WORKDIR /backend
COPY . .
RUN npm install
RUN npm run build
ENV NODE_ENV=production
EXPOSE 80/tcp
CMD node dist/index.js
