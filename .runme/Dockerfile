FROM node:latest
WORKDIR /app
COPY package*.json ./
RUN npm install && npm cache clean --force --loglevel=error
COPY . .
ENV DEBUG="app:*"
ENV DEBUG_COLORS=true
ENV APP_PW="test"
ENV NODE_ENV="development"
ENV DB_CONNECTION="mongodb://mongo:27017"
ENV DB_NAME="weightbuddy"
EXPOSE 3001
EXPOSE 9229
RUN cd client && npm install && yarn build
ENTRYPOINT npm start