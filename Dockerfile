# syntax=docker/dockerfile:1.4

# Stage 1: Dependencies
FROM node:20-alpine AS deps
RUN apk add --no-cache python3 make g++
WORKDIR /app
COPY package.json yarn.lock ./

# Créer l'utilisateur node avec un UID/GID spécifique
RUN deluser --remove-home node \
    && addgroup -S node -g 1000 \
    && adduser -S -G node -u 1000 node

# Installer les dépendances
RUN --mount=type=cache,target=/root/.yarn \
    yarn install --frozen-lockfile --network-timeout 100000

# Ajuster les permissions
RUN mkdir -p node_modules/.vite && chown -R node:node .

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

# Stage 3: Runner
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Create cache directories and set permissions
RUN mkdir -p /var/cache/nginx && \
    chown -R nginx:nginx /var/cache/nginx && \
    mkdir -p /var/run && \
    chown -R nginx:nginx /var/run

USER nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"] 