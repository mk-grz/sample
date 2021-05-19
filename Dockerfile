FROM node:latest
WORKDIR /usr/src/app
RUN mkdir -p /usr/src/app
COPY package.json /usr/src/app

RUN npm install
COPY . /usr/src/app 
EXPOSE 4010

# to run through nodemon
CMD [ "npm", "run", "dev" ]


# to run through node
# CMD [ "node", "index.js" ]
