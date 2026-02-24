# chmod +x deploy.sh
# properly set the permissions for the script before running it
#!/bin/bash
set -e

PROJECT_DIR="/opt/garm-crm" # Path to the project on the server

cd "$PROJECT_DIR"

echo ">>> Stopping and removing containers"
docker compose down

# git config --global credential.helper store
# use this command to store the credentials in the .git/config file
# without this command, you will be prompted for credentials every time you pull
echo ">>> Git pull"
git pull origin main

echo ">>> Docker compose: build & up"

# Собираем образы (если менялся backend/frontend)
docker compose build

# Поднимаем контейнеры в фоне
docker compose up -d --remove-orphans

# fresh migration should be done only if the database is empty
# or if you want to reset the database
# --seed is used to seed the database with the default data
echo ">>> Laravel: migrations"
docker compose exec backend php artisan migrate:fresh --seed

echo ">>> Laravel: cache optimize"
docker compose exec backend php artisan optimize:clear
docker compose exec backend php artisan optimize

echo ">>> Done"
