# Run this script using npm run db:init

rm -rf ./docker-volumes/postgres

GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

echo "${GREEN}Updating postgres docker image${NC}"

docker pull postgres

echo "${GREEN}Starting the postgres docker container${NC}"

npm run db:start

echo "${GREEN}Attempting to create onyami database${NC}"

until
  PGPASSWORD=onyami psql -h localhost -U postgres -c "CREATE DATABASE onyami" || ((count++ >= 5))
do
  echo "${RED}postgres is still initialising, waiting to retry...${NC}"
  sleep 5s
done

echo "${GREEN}Running database migrations${NC}"

npm run migrate:latest

echo "${GREEN}Local database initialization complete${NC}"
echo "${GREEN}Stopping the postgres docker container${NC}"

npm run db:stop
