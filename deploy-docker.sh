docker compose up -d -V --build
docker compose exec nestjs-training yarn migrate
docker compose exec nestjs-training yarn seed:run
