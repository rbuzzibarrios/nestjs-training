docker compose down
docker image rmi node:18-alpine
NODE_ENV=development yarn build
docker compose up -d -V --build
docker compose exec nestjs-training yarn migrate
docker compose exec nestjs-training yarn seed:run
