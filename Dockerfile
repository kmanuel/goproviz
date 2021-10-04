FROM node:lts-buster
RUN apt-get update -y
RUN apt-get install ffmpeg -y

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .
RUN mkdir videos

ENV VIDEO_DIR=/app/videos

ENTRYPOINT [ "npm", "run", "dev" ]