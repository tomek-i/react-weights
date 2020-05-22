FROM node:14.0.0
COPY package*.json ./
RUN npm install && npm cache clean --force --loglevel=error
COPY . .
CMD [ "node", "index.js"]