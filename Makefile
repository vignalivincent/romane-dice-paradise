.PHONY: help docker-up docker-down docker-logs docker-build docker-prod clean install dev build docker-build-cached docker-up-logs

# Colors
GREEN  := $(shell tput -Txterm setaf 2)
YELLOW := $(shell tput -Txterm setaf 3)
WHITE  := $(shell tput -Txterm setaf 7)
RESET  := $(shell tput -Txterm sgr0)

TARGET_MAX_CHAR_NUM=20

## Affiche l'aide
help:
	@echo ''
	@echo 'Usage:'
	@echo '  ${YELLOW}make${RESET} ${GREEN}<target>${RESET}'
	@echo ''
	@echo 'Targets:'
	@awk '/^[a-zA-Z\-\_0-9]+:/ { \
		helpMessage = match(lastLine, /^## (.*)/); \
		if (helpMessage) { \
			helpCommand = substr($$1, 0, index($$1, ":")-1); \
			helpMessage = substr(lastLine, RSTART + 3, RLENGTH); \
			printf "  ${YELLOW}%-$(TARGET_MAX_CHAR_NUM)s${RESET} ${GREEN}%s${RESET}\n", helpCommand, helpMessage; \
		} \
	} \
	{ lastLine = $$0 }' $(MAKEFILE_LIST)

## Lance le projet en mode développement avec Docker (sans logs)
docker-up:
	@echo "🚀 Lancement du projet en mode développement..."
	DOCKER_BUILDKIT=1 COMPOSE_DOCKER_CLI_BUILD=1 docker compose up -d --build
	@echo "📱 Application disponible sur http://localhost:5173"

## Lance le projet et affiche les logs
docker-up-logs:
	@echo "🚀 Lancement du projet en mode développement..."
	DOCKER_BUILDKIT=1 COMPOSE_DOCKER_CLI_BUILD=1 docker compose up --build

## Arrête les conteneurs Docker
docker-down:
	@echo "🛑 Arrêt des conteneurs..."
	docker compose down

## Affiche les logs des conteneurs
docker-logs:
	@echo "📋 Affichage des logs..."
	docker compose logs -f

## Construit l'image Docker de production avec cache
docker-build:
	@echo "🏗️  Construction de l'image de production..."
	DOCKER_BUILDKIT=1 docker build -t romane-dice-paradise .

## Lance le projet en mode production avec Docker
docker-prod:
	@echo "🚀 Lancement du projet en mode production..."
	docker run -d -p 80:80 romane-dice-paradise
	@echo "📱 Application disponible sur http://localhost"

## Nettoie les conteneurs et images Docker
docker-clean:
	@echo "🧹 Nettoyage des conteneurs et images..."
	docker compose down --rmi all --volumes --remove-orphans

## Installe les dépendances du projet
install:
	@echo "📦 Installation des dépendances..."
	yarn install

## Lance le projet en mode développement
dev:
	@echo "🚀 Lancement du projet en mode développement..."
	yarn dev

## Build le projet
build:
	@echo "🏗️  Construction du projet..."
	yarn build 