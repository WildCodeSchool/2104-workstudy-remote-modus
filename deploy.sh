#! /bin/sh
echo "PORT=$PORT"
git fetch origin dev && git reset --hard origin/dev && git clean -f -d
GATEWAY_PORT=$PORT docker-compose -f docker-compose-prod.yml up --build -d
