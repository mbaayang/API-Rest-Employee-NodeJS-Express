# ---------- STAGE 1 : BUILD ----------
FROM node:18-alpine AS builder

WORKDIR /app

# Copier uniquement package.json pour cache Docker
COPY package*.json ./

RUN npm ci --only=production

COPY . .

# ---------- STAGE 2 : PRODUCTION ----------
FROM node:18-alpine

# Sécurité : utilisateur non-root
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copier node_modules depuis builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src ./src
COPY --from=builder /app/package.json ./

# Variables d’environnement
ENV NODE_ENV=production
ENV PORT=5000

# Changer l’utilisateur
USER appuser

# Port exposé
EXPOSE 5000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/health || exit 1

# Lancer l’API
CMD ["node", "src/server.js"]
