FROM node:latest
COPY package*.json ./
RUN npm install && npm cache clean --force --loglevel=error
COPY . .
ENTRYPOINT npm run start