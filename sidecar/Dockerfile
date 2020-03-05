FROM node:12

RUN apt-get -y update
RUN apt-get install -y curl
RUN apt-get install -y jq

COPY index.js utils.js package.json package-lock.json ./
RUN npm install

EXPOSE 3000

ENTRYPOINT [ "npm", "start" ]