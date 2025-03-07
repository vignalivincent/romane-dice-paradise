# Romane Dice Paradise 🎲

[![Vercel Production Deployment](https://img.shields.io/badge/vercel-production-blue)](https://romane-dice-paradise.vercel.app)
[![GitHub Actions CI](https://github.com/vignalivincent/romane-dice-paradise/actions/workflows/ci.yml/badge.svg)](https://github.com/vignalivincent/romane-dice-paradise/actions/workflows/ci.yml)

Un jeu de dés enchantés pour Romane 🌟

## Environnements

- **Production** : [romane-dice-paradise.vercel.app](https://romane-dice-paradise.vercel.app)
- **Preview** : Déployé automatiquement pour chaque branche

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

## 🚀 Fonctionnalités

- Interface utilisateur moderne et responsive
- Support multilingue (Français)
- Gestion des scores en temps réel
- Jusqu'à 6 joueurs
- Système de bonus et de totaux automatiques
- Mode sombre/clair

## 🛠️ Technologies

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Zustand
- i18next
- Radix UI

## 📦 Installation

```bash
# Cloner le projet
git clone [url-du-repo]

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

## 🐳 Docker

### Développement

Pour lancer l'application en mode développement avec Docker :

```bash
# Construire et démarrer le conteneur
docker compose up -d

# Voir les logs
docker compose logs -f

# Arrêter le conteneur
docker compose down
```

### Production

Pour construire et lancer l'application en production :

```bash
# Construire l'image
docker build -t romane-dice-paradise .

# Lancer le conteneur
docker run -d -p 80:80 romane-dice-paradise
```
