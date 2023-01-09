FROM node:18-alpine
ARG NAME

WORKDIR /$NAME

COPY package.json ./
RUN npm install && npm cache clean --force

COPY . ./
EXPOSE ${PORT}
CMD [ "npm", "start" ]