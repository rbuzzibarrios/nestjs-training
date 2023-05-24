FROM node:18-alpine As build

WORKDIR /var/www/html

COPY --chown=node:node package*.json ./

RUN yarn install

COPY --chown=node:node . .

RUN mkdir -p dist

RUN chown -R node.node dist

RUN yarn build

USER node

CMD [ "node", "dist/src/main" ]
