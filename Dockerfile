FROM node:18-alpine As build

WORKDIR /var/www/html

COPY --chown=node:node package*.json ./

RUN chown -R node.node /var/www/html

USER node
RUN yarn install

COPY --chown=node:node . .

USER node
RUN yarn build

USER node

CMD [ "node", "dist/src/main" ]
