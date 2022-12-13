FROM node:latest
ARG NAME

WORKDIR /$NAME

COPY package.json ./
RUN npm install && npm cache clean --force

COPY . ./
EXPOSE ${PORT}
CMD [ "npm", "start" ]