#!/bin/bash

# Set environment variables from .env and set NODE_ENV to test
source <(dotenv-export | sed 's/\\n/\n/g')
export NODE_ENV=test

yarn run api:update
yarn run api:install
yarn run api:serve &
yarn run build

http-server dist/ -p $WEB_SERVER_PORT_TEST
