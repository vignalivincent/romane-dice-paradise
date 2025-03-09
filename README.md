# YamsAttack 🎲 - Jeu de Yams en ligne

[![Vercel Production Deployment](https://img.shields.io/badge/vercel-production-blue)](https://yamsattack.vercel.app)
[![GitHub Actions CI](https://github.com/vignalivincent/yamsAttack/actions/workflows/ci.yml/badge.svg)](https://github.com/vignalivincent/yamsAttack/actions/workflows/ci.yml)

YamsAttack est un jeu de Yams (Yahtzee) en ligne gratuit avec une interface moderne et responsive, permettant de jouer jusqu'à 6 joueurs. Lancez les dés, choisissez vos combinaisons et amusez-vous avec ce jeu de société intemporel! 🌟

> **Note:** Ce projet est connu sous le nom "romane-dice-paradise" en local mais "yamsAttack" sur le dépôt distant.

## 🔗 Liens

- **Production** : [yamsattack.vercel.app](https://yamsattack.vercel.app)
- **Preview** : Déployé automatiquement pour chaque branche

## 🚀 Fonctionnalités

- Interface utilisateur moderne et responsive
- Support multilingue (Français)
- Gestion des scores en temps réel
- Jusqu'à 6 joueurs simultanés
- Système de bonus et de totaux automatiques
- Mode sombre/clair adaptatif

## 🛠️ Technologies

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Zustand
- i18next
- Radix UI

## 🎮 Comment jouer

1. Ajoutez entre 1 et 6 joueurs
2. À chaque tour, lancez les dés (jusqu'à 3 fois)
3. Après chaque lancer, sélectionnez les dés à conserver
4. Choisissez une case pour enregistrer votre score
5. Les combinaisons possibles incluent les numéros simples, les brelan, carré, full, petite suite, grande suite et yams
6. Le joueur avec le score total le plus élevé gagne!

## Développement

```bash
# Installation
yarn install

# Développement
yarn dev

# Build
yarn build

# Lint et format
yarn lint
yarn format
```

## Workflow Git

1. Créer une branche de feature : `git checkout -b feat/ma-feature`
2. Commiter avec la convention : `✨ feat(scope): description`
3. Pousser et créer une PR
4. La preview sera automatiquement déployée sur Vercel
5. Merger une fois les checks passés

## Emojis de commit

- ✨ `sparkles` : Nouvelle fonctionnalité (feat)
- 🐛 `bug` : Correction de bug (fix)
- 📝 `memo` : Documentation (docs)
- ♻️ `recycle` : Refactoring (refactor)
- ✅ `check` : Tests (test)
- 🔧 `wrench` : Configuration (chore)

## 📦 Installation

```bash
# Cloner le projet
git clone https://github.com/vignalivincent/yamsAttack.git

# Se déplacer dans le dossier (nom local peut être différent)
cd yamsAttack  # ou cd romane-dice-paradise selon votre configuration

# Installer les dépendances
yarn install

# Lancer en développement
yarn dev
```

## 🔧 Scripts disponibles

- `yarn dev` - Lance le serveur de développement
- `yarn build` - Crée une version de production
- `yarn preview` - Prévisualise la version de production
- `yarn lint` - Vérifie le code avec ESLint
- `yarn lint:fix` - Corrige automatiquement les erreurs de linting
- `yarn format` - Formate le code avec Prettier
- `yarn type-check` - Vérifie les types TypeScript
- `yarn clean` - Nettoie les dossiers de build

## 🤝 Contribution

Les contributions sont les bienvenues ! Assurez-vous de :

1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Commiter vos changements (suivre la convention [Conventional Commits](https://www.conventionalcommits.org/))
4. Pousser vers la branche
5. Ouvrir une Pull Request

## 🤝 Contribution avec Docker (Flux recommandé)

Le moyen le plus simple de contribuer au projet est d'utiliser Docker, qui garantit un environnement de développement cohérent pour tous.

### Étapes simples pour contribuer

1. **Cloner le dépôt**

   ```bash
   git clone https://github.com/vignalivincent/yamsAttack.git
   cd yamsAttack  # ou le nom du dossier local si différent
   ```

2. **Lancer avec Docker (une seule commande)**

   ```bash
   make up
   ```

   C'est tout ! L'application est maintenant accessible sur <http://localhost:3000>

3. **Développer**

   - Modifiez les fichiers source dans votre éditeur préféré
   - Les changements sont automatiquement détectés (hot reload)
   - Les fichiers sont synchronisés entre votre machine et le conteneur Docker

4. **Tester vos changements**

   ```bash
   make test
   ```

5. **Arrêter l'environnement quand vous avez terminé**

   ```bash
   make down
   ```

### Commandes Make utiles

```bash
# Voir les commandes disponibles
make help

# Voir les logs en temps réel
make logs

# Exécuter le linter
make lint

# Ouvrir un terminal dans le conteneur
make sh

# Construire l'application
make build

# Nettoyer l'environnement Docker
make clean
```

## 📝 Convention de Commit

Ce projet suit la convention [Conventional Commits](https://www.conventionalcommits.org/). Les messages de commit doivent suivre le format :

```
type(scope): description

[corps]

[footer]
```

Types disponibles :

- `feat` : Nouvelle fonctionnalité
- `fix` : Correction de bug
- `docs` : Documentation
- `style` : Formatage
- `refactor` : Refactoring
- `perf` : Optimisation
- `test` : Tests
- `build` : Build
- `ci` : CI
- `chore` : Tâches diverses
- `revert` : Annulation

## 📄 Licence

MIT

## 🐳 Docker (Recommandé pour le développement)

Docker fournit un environnement de développement cohérent pour tous les contributeurs.

### Démarrage rapide avec Docker et Make

```bash
# Cloner et lancer en deux commandes
git clone https://github.com/vignalivincent/yamsAttack.git
cd yamsAttack
make up
```

Accédez à l'application sur <http://localhost:3000>

## 📋 Informations sur le Repository

Ce projet est connu sous deux noms:

- **Nom local**: "romane-dice-paradise"
- **Nom distant** (GitHub): "yamsAttack"

Cette différence est due à un renommage du projet. Les deux noms font référence au même projet.

Pour les commandes Git, utilisez toujours l'URL distante:

````bash
git remote -v  # Vérifier l'URL du dépôt distant
git push origin main  # Pousser vers le dépôt distant "yamsAttack"

## 📱 Compatibilité

YamsAttack fonctionne sur tous les navigateurs modernes et appareils:

- Ordinateurs (Chrome, Firefox, Safari, Edge)
- Tablettes Android et iPad
- Smartphones Android et iOS

## 🔍 Règles du Yams

Le Yams se joue avec 5 dés et une feuille de score. À votre tour:

1. Lancez les 5 dés
2. Conservez les dés que vous voulez
3. Relancez jusqu'à 2 fois
4. Choisissez une combinaison pour marquer des points

## ⭐ Pourquoi choisir YamsAttack?

- Gratuit et sans publicité
- Interface intuitive et moderne
- Calcul automatique des scores
- Pas d'inscription nécessaire
- Fonctionne même hors ligne après chargement

# Romane's Dice Paradise

Welcome to Romane's Dice Paradise - a dice game application!

## Table of Contents
- [Getting Started](#getting-started)
  - [Using Docker (Recommended)](#using-docker-recommended)
  - [Manual Setup](#manual-setup)
- [Development](#development)
- [Testing](#testing)
- [Commit Guidelines](#commit-guidelines)

## Getting Started

### Using Docker (Recommended)

Docker provides a consistent development environment for all contributors. To get started with Docker:

1. **Prerequisites**
   - [Docker](https://www.docker.com/get-started)
   - [Docker Compose](https://docs.docker.com/compose/install/)

2. **Setup**
   ```bash
   # Clone the repository
   git clone https://github.com/yourusername/romane-dice-paradise.git
   cd romane-dice-paradise

   # Build and start the containers
   docker-compose up -d
````

3. **Access the Application**

   - The app will be available at <http://localhost:3000> (or your configured port)

4. **Running Commands Inside the Container**

   ```bash
   # Execute commands in the running container
   docker exec -it romane-dice-paradise npm run test

   # Or start a shell in the container
   docker exec -it romane-dice-paradise sh
   ```

### Manual Setup

If you prefer not to use Docker:

1. **Prerequisites**

   - Node.js (version specified in package.json)
   - npm or yarn

2. **Installation**

   ```bash
   # Clone the repository
   git clone https://github.com/yourusername/romane-dice-paradise.git
   cd romane-dice-paradise

   # Install dependencies
   npm install
   ```

3. **Start Development Server**

   ```bash
   npm run dev
   ```

## Development

The project uses a pre-commit hook system to ensure code quality. When developing:

```bash
# Install husky hooks (automatically done on npm install)
npm run prepare
```

## Testing

```bash
# Using Docker
docker exec -it romane-dice-paradise npm run test

# Or manually
npm run test
```

## Commit Guidelines

This project follows specific commit message conventions enforced by husky:

Format: `[emoji] type(scope): description`

Allowed emojis and types:

- ✨ sparkles : New feature (feat)
- 🐛 bug : Bug fix (fix)
- 📝 memo : Documentation (docs)
- ♻️ recycle : Refactoring (refactor)
- ✅ check : Tests (test)
- 🧹 broom : Cleaning/Refactoring (refactor)
- 🔧 wrench : Configuration/Maintenance (chore)

Example: `✨ feat(auth): add login page`
