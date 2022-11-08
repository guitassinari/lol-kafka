FROM node:18.12.0-alpine3.16

RUN apk update && apk add bash

WORKDIR /scripts
COPY ./docker/scripts .
RUN chmod +x ./*
RUN ./install-curl.sh

# Add Tini for proper Kernel signals handling.
# See: https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md#handling-kernel-signals
RUN apk add --no-cache tini
ENTRYPOINT ["/sbin/tini", "--"]

# Copy and install app dependencies and files
WORKDIR /app
COPY ./out .
COPY ./package*.json .
RUN npm install

CMD [ "node", "index.js" ]


