FROM node:18-alpine As build

WORKDIR /var/www/html

COPY ./ /var/www/html

COPY --chown=node:node package*.json ./

RUN yarn install

COPY --chown=node:node . .

USER node

#EXPOSE 3000
EXPOSE 8080

CMD yarn start
#CMD ["node", "dist/main.js"]
