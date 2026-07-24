# TaskFlow

TaskFlow est une application web de gestion de projet inspirée de la méthode **Kanban**.  
Développée dans le cadre de la certification **Concepteur Développeur d'Applications (CDA)**, elle permet aux équipes de gérer leurs User Stories, suivre leur avancement grâce aux critères **Definition of Ready (DoR)** et **Definition of Done (DoD)** et visualiser la progression du projet.

---

# Fonctionnalités

- 🔐 Authentification sécurisée (JWT)
- 👤 Gestion des utilisateurs
- 📁 Gestion des projets (Boards)
- 📌 Gestion des colonnes Kanban
- 📝 Gestion des User Stories
- ✅ Définition of Ready (DoR)
- 🎯 Définition of Done (DoD)
- 📊 Tableau de bord Analytics
- 📈 Progression automatique des User Stories
- 🐳 Déploiement avec Docker
- ✔️ Tests unitaires avec Jest
- 🔄 Intégration Continue avec GitHub Actions

---

# Architecture

```
Frontend (React)
        │
        ▼
REST API (Node.js / Express)
        │
        ▼
Business Services
        │
        ▼
Prisma ORM
        │
        ▼
PostgreSQL
```

---

# 🛠️ Technologies

## Frontend

- React
- React Router
- Axios
- CSS

## Backend

- Node.js
- Express
- Prisma ORM
- JWT
- Bcrypt
- Jest

## Base de données

- PostgreSQL

## DevOps

- Docker
- Docker Compose
- GitHub Actions

---

# Structure du projet

```
TaskFlow_CDA
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── prisma/
│   ├── routes/
│   ├── services/
│   └── tests/
│
├── frontend/
│   ├── public/
│   └── src/
│
├── .github/
│   └── workflows/
│
├── docker-compose.yml
└── README.md
```

---

# Installation

## Cloner le projet

```bash
git clone https://github.com/PELAGIE-AINTANGAR/TaskFlow_CDA.git
```

## Installer les dépendances

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd frontend
npm install
```

---

# Variables d'environnement

Créer un fichier `.env`.

Exemple :

```env
DATABASE_URL=postgresql://user:password@localhost:5432/taskflow
JWT_SECRET=your_secret_key
PORT=5000
```

---

# Lancer le projet

## Avec Docker

```bash
docker compose up --build
```

## Sans Docker

Backend

```bash
cd backend
npm run dev
```

Frontend

```bash
cd frontend
npm start
```

---

# 🧪 Tests

Exécuter les tests unitaires :

```bash
cd backend
npm test
```

Résultat actuel :

```
PASS authService.test.js
PASS taskService.test.js

Test Suites: 2 passed
Tests: 19 passed
```

---

# Intégration Continue

Le projet utilise **GitHub Actions**.

À chaque Push :

- Installation des dépendances
- Validation Prisma
- Génération du client Prisma
- Exécution des tests Jest
- Vérification du build

---


# Compétences mises en œuvre

- Concevoir une architecture logicielle
- Développer une API REST
- Concevoir une base de données relationnelle
- Sécuriser une application avec JWT
- Mettre en œuvre les bonnes pratiques Git
- Conteneuriser une application avec Docker
- Écrire des tests unitaires
- Mettre en place une intégration continue

---
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-blue?logo=postgresql)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?logo=docker)
![GitHub Actions](https://img.shields.io/badge/CI-GitHub_Actions-2088FF?logo=githubactions)
![License](https://img.shields.io/badge/License-Educational-lightgrey)


# Auteur

**Pelagie AINTANGAR**

Projet réalisé dans le cadre de la certification :

**Concepteur Développeur d'Applications (CDA)**

La Plateforme_ – Marseille
