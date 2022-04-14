FROM node:16.14.2-alpine3.15 AS base

WORKDIR /app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# copying packages first helps take advantage of docker layers
COPY package*.json ./

FROM base as deploy

COPY . .

ARG ENVIRONMENT

ENV PORT=80
RUN cp /app/envs/${ENVIRONMENT}.env /app/.env
RUN yarn install
RUN yarn prisma-gen
RUN NODE_ENV=production && yarn build

CMD yarn migrate-prd && yarn start