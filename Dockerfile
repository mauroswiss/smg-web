FROM node:8.9.3-alpine

RUN apk add --no-cache make gcc g++ python
# Set a working directory

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy application files
COPY ./ .

# Install Node.js dependencies
RUN npm install
RUN yarn install

CMD [ "node", "server.js" ] 
