.PHONY: help up up-logs down logs sh test lint build clean install dev

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

	@echo ""
	@echo "Docker Development Commands (Shortcuts)"
	@echo "-------------------------------------"
	@echo "make up         - Start Docker environment"
	@echo "make up-logs    - Start Docker with logs"
	@echo "make down       - Stop Docker environment"
	@echo "make logs       - Show logs"
	@echo "make sh         - Open shell in container"
	@echo "make test       - Run tests"
	@echo "make lint       - Run linter"
	@echo "make build      - Build the application"
	@echo "make clean      - Clean Docker environment"

## Lance le projet en mode développement avec Docker (sans logs)
up:
	@echo "🚀 Lancement du projet en mode développement..."
	DOCKER_BUILDKIT=1 COMPOSE_DOCKER_CLI_BUILD=1 docker compose up -d --build
	@echo "📱 Application disponible sur http://localhost:3000"

## Lance le projet et affiche les logs
up-logs:
	@echo "🚀 Lancement du projet en mode développement avec logs..."
	DOCKER_BUILDKIT=1 COMPOSE_DOCKER_CLI_BUILD=1 docker compose up --build

## Arrête les conteneurs Docker
down:
	@echo "🛑 Arrêt des conteneurs..."
	docker compose down

## Affiche les logs des conteneurs
logs:
	@echo "📋 Affichage des logs..."
	docker compose logs -f

## Ouvre un shell dans le conteneur
sh:
	@echo "🔌 Connexion au conteneur..."
	docker compose exec app sh

## Lance les tests dans le conteneur Docker
test:
	@echo "🧪 Exécution des tests..."
	docker compose exec app npm run test

## Lance le linter dans le conteneur Docker
lint:
	@echo "🔍 Linting du code..."
	docker compose exec app npm run lint

## Build le projet pour production
build:
	@echo "🏗️  Construction de l'image de production..."
	DOCKER_BUILDKIT=1 docker build -t yamsattack .

## Lance le projet en mode production avec Docker
prod:
	@echo "🚀 Lancement du projet en mode production..."
	docker run -d -p 80:80 yamsattack
	@echo "📱 Application disponible sur http://localhost"

## Nettoie les conteneurs et images Docker
clean:
	@echo "🧹 Nettoyage des conteneurs et images..."
	docker compose down --rmi all --volumes --remove-orphans

## Installe les dépendances du projet
install:
	@echo "📦 Installation des dépendances..."
	yarn install

## Lance le projet en mode développement (sans Docker)
dev:
	@echo "🚀 Lancement du projet en mode développement..."
	yarn dev
