up:
	docker compose up -d
.PHONY: up

db: up
	docker-compose exec rowerex-php bash -c "bin/console doctrine:schema:create && \
	bin/console doctrine:schema:update --force && \
	bin/console app:load-default-models"
.PHONY: db

migrate: up
	docker-compose exec rowerex-php bash -c "bin/console doctrine:schema:update --force"
.PHONY: migrate
