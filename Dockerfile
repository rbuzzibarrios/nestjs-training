FROM node:18-alpine As build

WORKDIR /var/www/html

COPY ./ /var/www/html

COPY --chown=node:node package*.json ./

#USER root

RUN yarn install
#RUN npm i

COPY --chown=node:node . .

#USER root
USER node

EXPOSE 8080

CMD yarn start:wnest