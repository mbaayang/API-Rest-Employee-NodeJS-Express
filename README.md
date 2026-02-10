# 🧑‍💼 Gestion Employés – API REST

API REST pour une application de gestion des employés, développée avec **Node.js**, **Express** et **PostgreSQL**, containerisée avec **Docker** et automatisée via **GitHub Actions**.

---

## 🚀 Fonctionnalités

- CRUD Employés
- Recherche, filtrage, tri et pagination
- API sécurisée (Helmet, CORS, Rate limiting)
- Validation des données
- Healthcheck endpoint
- Base de données PostgreSQL
- pgAdmin pour l’administration
- Docker & Docker Compose
- Pipeline CI/CD (GitHub Actions)

---

## 🧱 Stack Technique

- **Backend** : Node.js, Express
- **Base de données** : PostgreSQL
- **ORM / DB Client** : pg
- **Sécurité** : Helmet, CORS, express-rate-limit
- **Validation** : express-validator
- **Containerisation** : Docker, Docker Compose
- **CI/CD** : GitHub Actions
- **Outils** : pgAdmin

---

## 📁 Structure du projet

├── src/
│ ├── controllers/
│ ├── routes/
│ ├── middlewares/
│ ├── db/
│ ├── app.js
│ └── server.js
├── .github/
│ └── workflows/
│ └── ci.yml
├── dockerfile
├── docker-compose.yml
├── .dockerignore
├── .env.example
├── package.json
└── README.md

---

## ⚙️ Prérequis

- Node.js >= 18
- Docker & Docker Compose
- Git

---

## 🔧 Installation (sans Docker)

```bash
git clone https://github.com/mbaayang/API-Rest-Employee-NodeJS-Express
cd API-Rest-Employee-NodeJS-Express
npm install
npm run dev

API disponible sur : http://localhost:5000
```
## 🐳 Installation avec Docker Compose

1️⃣ Créer le fichier .env
2️⃣ Lancer les services
```
docker-compose up --build
 ```
## 🔍 Accès aux services

- API : http://localhost:5000/api/employees
- Healthcheck : http://localhost:5000/health
- pgAdmin : http://localhost:5050/

## Scripts disponibles

```
npm run dev       # Lancer en mode développement
npm start         # Lancer en production
npm run lint      # Vérification du code
npm test          # Tests
npm run build     # Build
```
