#!/bin/bash

docker-compose -f docker-compose-api-test.yml build
docker-compose -f docker-compose-api-test.yml up