# YamsAttack 🎲 - Jeu de Yams en ligne

[![Vercel Production Deployment](https://img.shields.io/badge/vercel-production-blue)](https://yamsattack.vercel.app)
[![GitHub Actions CI](https://github.com/vignalivincent/yamsAttack/actions/workflows/ci.yml/badge.svg)](https://github.com/vignalivincent/yamsAttack/actions/workflows/ci.yml)

YamsAttack est un jeu de Yams (Yahtzee) en ligne gratuit avec une interface moderne et responsive, permettant de jouer jusqu'à 6 joueurs. Lancez les dés, choisissez vos combinaisons et amusez-vous avec ce jeu de société intemporel! 🌟

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
git clone https://github.com/vignaliVincent/yamsAttack.git

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
docker build -t yamsattack .

# Lancer le conteneur
docker run -d -p 80:80 yamsattack
```

## 📋 Informations sur le Repository

Ce projet était précédemment connu sous le nom "romane-dice-paradice" et a été renommé "yamsAttack".

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
