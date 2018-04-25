#!/bin/bash

# Set environment variables from .env and set NODE_ENV to test
source <(dotenv-export | sed 's/\\n/\n/g')
export NODE_ENV=test

yarn run build

http-server dist/ -- -p $SERVER_PORT_TEST
