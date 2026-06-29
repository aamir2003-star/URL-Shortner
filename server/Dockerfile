FROM node:19.6-alpine

WORKDIR /usr/src/app

ENV NODE_ENV=production

COPY package*.json ./

RUN npm ci --only=production 

USER node

COPY --chown=node:node . .

CMD [ "node", "index.js" ] 