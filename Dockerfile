FROM node:18-alpine As build

#USER node

#RUN yarn global add pm2
#ENV PM2_PUBLIC_KEY duodtpby9a4ookw
#ENV PM2_SECRET_KEY 1kwpfs7pwqusdp6

WORKDIR /var/www/html

COPY ./ /var/www/html

COPY --chown=node:node package*.json ./

RUN yarn install

COPY --chown=node:node . .

USER root

# RUN #mkdir -p /var/www/html/dist

#RUN #yarn build
CMD yarn start:wnest

#CMD ["pm2-runtime", "dist/src/main.js"]
#CMD ["node", "dist/src/main.js"]