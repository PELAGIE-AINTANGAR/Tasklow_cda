# TaskFlow

TaskFlow est une application web de gestion de projet inspirée de la méthode **Kanban**.  
Développée dans le cadre de la certification **Concepteur Développeur d'Applications (CDA)**, elle permet aux équipes de gérer leurs User Stories, suivre leur avancement grâce aux critères **Definition of Ready (DoR)** et **Definition of Done (DoD)** et visualiser la progression du projet.

Le projet intègre également une chaîne CI/CD complète permettant de tester, analyser, construire, publier et déployer automatiquement l'application sur Kubernetes.
---

# Fonctionnalités

- Authentification sécurisée (JWT)
- Gestion des utilisateurs
- Gestion des projets (Boards)
- Gestion des colonnes Kanban
- Gestion des User Stories
- Définition of Ready (DoR)
- Définition of Done (DoD)
- Tableau de bord Analytics
- Progression automatique des User Stories
- Déploiement avec Docker
- Tests unitaires avec Jest
- Analyse de sécurité du code avec CodeQL
- Intégration Continue avec GitHub Actions
- Publication des images Docker sur GitHub Container Registry (GHCR)
- Déploiement automatique sur Kubernetes
- Exposition de l'application avec Kubernetes Ingress
- Stockage persistant PostgreSQL avec PersistentVolumeClaim
- Notifications de pipeline avec Google Chat
---

# Architecture de l'application

```
                    Utilisateur
                         │
                         ▼
                  Kubernetes Ingress
                         │
                         ▼
              ┌─────────────────────┐
              │ Frontend React/Nginx│
              └─────────────────────┘
                         │
                         ▼
              ┌─────────────────────┐
              │ Backend Node.js     │
              │ Express REST API    │
              └─────────────────────┘
                         │
                         ▼
                  Prisma ORM
                         │
                         ▼
              ┌─────────────────────┐
              │ PostgreSQL          │
              │ Persistent Storage  │
              └─────────────────────┘
```
# Architecture CI/CD

Le projet utilise GitHub Actions pour automatiser l'intégration et le déploiement de l'application.

Git Push / Git Tag
        │
        ▼
   Checkout Code
        │
        ▼
 Backend Tests
        │
        ├──────────────► Jest
        │
        ▼
 Frontend Build
        │
        ▼
 Security Analysis
        │
        └──────────────► CodeQL
        │
        ▼
 Docker Build
        │
        ▼
 Push vers GHCR
        │
        ▼
 Configuration kubectl
        │
        ▼
 Mise à jour des images
        │
        ▼
 Kubernetes Rollout
        │
        ▼
 Vérification des Pods
        │
        ▼
 Google Chat
        │
        └────► ✅ SUCCESS / ❌ FAILURE

Gestion des versions Docker

Les images Docker sont taguées automatiquement selon le type de référence Git :

main → image de développement
Git Tag → image correspondant à la version de production

Exemple :

ghcr.io/pelagie-aintangar/taskflow-backend:main
ghcr.io/pelagie-aintangar/taskflow-frontend:main

Pour une version :

ghcr.io/pelagie-aintangar/taskflow-backend:v1.0.0
ghcr.io/pelagie-aintangar/taskflow-frontend:v1.0.0
---


# Technologies

## Frontend

- React
- React Router
- Axios
- CSS
- Nginx

## Backend

- Node.js
- Express
- Prisma ORM
- JWT
- Bcrypt
- Jest
- ESLint

## Base de données

- PostgreSQL

## DevOps / CI/CD

- Docker
- Docker Compose
- GitHub Actions
- GitHub Container Registry (GHCR)
- Kubernetes
- kubectl
- Kubernetes Ingress
- CodeQL
- Google Chat Webhook

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
├── k8s/
├── deployment.yaml
│        ├── service.yaml
│        ├── ingress.yaml
│        └── storage.yaml
│
├── .github/
│   └── workflows/
│
├── docker-compose.yml
└── README.md
```

---

# Installation
Prérequis

Pour exécuter le projet localement, il est nécessaire d'avoir :

Node.js
npm
Docker
Docker Compose
PostgreSQL si l'application est exécutée sans Docker

Pour le déploiement Kubernetes :

kubectl
un cluster Kubernetes accessible
un fichier kubeconfig

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
Le backend utilise des variables d'environnement pour la connexion à la base de données et la sécurité de l'application.

Créer un fichier .env dans le dossier backend/.

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

# Tests

Les tests unitaires du backend sont réalisés avec Jest.

Pour exécuter les tests :

cd backend
npm test

Résultat actuel :

Test Suites: 3 passed, 3 total
Tests:       23 passed, 23 total

Les tests couvrent notamment :

l'authentification
les tâches
les Boards
--- 
# Qualité et sécurité

ESLint

ESLint permet de détecter les erreurs et problèmes potentiels dans le code JavaScript.

cd backend
npm run lint
CodeQL

CodeQL est intégré à GitHub Actions afin d'effectuer une analyse de sécurité du code source.

L'analyse est réalisée automatiquement dans le pipeline après la validation du backend et du frontend.

Backend
   │
   ▼
Frontend
   │
   ▼
CodeQL
   │
   ▼
Analyse de sécurité

Si une étape critique du pipeline échoue, les étapes dépendantes ne sont pas exécutées.

# Intégration Continue

Le projet utilise **GitHub Actions**.

Le workflow principal se trouve dans :

.github/workflows/ci.yml

La pipeline est déclenchée lors des événements Git configurés, notamment lors d'un push.

Elle réalise les étapes suivantes :

Récupération du code avec actions/checkout
Installation de Node.js
Installation des dépendances
Validation et migration de la base de données
Exécution des tests backend avec Jest
Build du frontend React
Analyse de sécurité avec CodeQL
Construction des images Docker
Publication des images sur GHCR
Connexion au cluster Kubernetes
Mise à jour des images utilisées par les Deployments
Vérification du déploiement avec kubectl rollout status
Vérification des Pods et Services
Envoi d'une notification dans Google Chat
---

# Docker

Le projet possède deux images Docker :

taskflow-backend
taskflow-frontend

Elles sont construites automatiquement par GitHub Actions.

Les images sont publiées sur :

GitHub Container Registry (GHCR)

ghcr.io/pelagie-aintangar/taskflow-backend
ghcr.io/pelagie-aintangar/taskflow-frontend

Le frontend utilise une construction multi-stage :

Node.js
   │
   ├── Installation des dépendances
   ├── Build React
   │
   ▼
Nginx
   │
   ▼
Application React

Cette approche permet de ne pas utiliser le serveur de développement React en production.

# Kubernetes

Les fichiers Kubernetes se trouvent dans :

k8s/
Deployment

Le fichier :

k8s/deployment.yaml

déclare les Deployments de :

PostgreSQL
Backend TaskFlow
Frontend TaskFlow

# Services

Le fichier :

k8s/service.yaml

déclare les Services Kubernetes permettant la communication entre les différents composants.

Frontend Service
       │
       ▼
Frontend Pods

Backend Service
       │
       ▼
Backend Pods

PostgreSQL Service
       │
       ▼
PostgreSQL Pod

# Stockage persistant

Le fichier :

k8s/storage.yaml

contient notamment :

le Secret PostgreSQL
le PersistentVolumeClaim (PVC)

Le PVC permet de conserver les données PostgreSQL indépendamment du cycle de vie du Pod.

# Ingress

Le fichier :

k8s/ingress.yaml

permet d'exposer l'application depuis Internet.

Architecture :

Internet
   │
   ▼
Ingress Nginx
   │
   ▼
taskflow-frontend Service
   │
   ▼
Frontend Pod

L'application est accessible à l'adresse :

https://etudiant-07-taskflow.development.atelier.ovh

# Déploiement automatique Kubernetes

Le déploiement Kubernetes est automatisé directement depuis GitHub Actions.

Après la publication des images Docker sur GHCR, la pipeline utilise kubectl pour mettre à jour les images utilisées par les Deployments.

Exemple :

kubectl set image deployment/taskflow-backend \
  backend=ghcr.io/pelagie-aintangar/taskflow-backend:<TAG>

et :

kubectl set image deployment/taskflow-frontend \
  frontend=ghcr.io/pelagie-aintangar/taskflow-frontend:<TAG>

La pipeline attend ensuite que les nouveaux Pods soient correctement déployés :

kubectl rollout status deployment/taskflow-backend
kubectl rollout status deployment/taskflow-frontend

Enfin, elle vérifie l'état du cluster :

kubectl get pods
kubectl get services

# Notifications Google Chat

Une notification est envoyée automatiquement dans un espace Google Chat à la fin de la pipeline.

Elle indique notamment :

le statut de la pipeline
le commit concerné
la branche ou le tag

Exemple :

TaskFlow CI/CD

Statut : ✅ SUCCESS
Commit : a0b4fadc...
Branche/Tag : main

En cas d'échec, la notification permet d'identifier le résultat de la pipeline et le job concerné.

Le webhook Google Chat est stocké dans les GitHub Secrets et n'est pas présent dans le code source.

# Gestion des secrets

Les informations sensibles utilisées par la CI/CD sont stockées dans les secrets GitHub ou dans les secrets Kubernetes.

Exemples :

GITHUB_TOKEN
        │
        └── Publication des images sur GHCR

KUBE_CONFIG
        │
        └── Connexion de GitHub Actions au cluster Kubernetes

GOOGLE_CHAT_WEBHOOK
        │
        └── Envoi des notifications Google Chat

Les secrets ne sont pas directement écrits dans le workflow.

Pipeline complète
                    Git Push / Git Tag
                            │
                            ▼
                    ┌───────────────┐
                    │    Checkout   │
                    └───────┬───────┘
                            │
                ┌───────────┴───────────┐
                ▼                       ▼
        ┌───────────────┐       ┌───────────────┐
        │    Backend    │       │    Frontend   │
        │ Tests + Prisma│       │     Build     │
        └───────┬───────┘       └───────┬───────┘
                │                       │
                └───────────┬───────────┘
                            ▼
                    ┌───────────────┐
                    │    CodeQL     │
                    │ Security Scan │
                    └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │ Docker Build  │
                    └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │     GHCR      │
                    │ Docker Images │
                    └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │   Kubernetes  │
                    │  Deploy/Update│
                    └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │    Rollout    │
                    │ Verification  │
                    └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │  Google Chat  │
                    │ Notification  │
                    └───────────────┘
# Compétences mises en œuvre

Ce projet permet de mettre en pratique plusieurs compétences du référentiel Concepteur Développeur d'Applications :

# Développement
Concevoir une architecture logicielle
Développer une application web
Développer une API REST
Concevoir et exploiter une base de données relationnelle
Utiliser un ORM avec Prisma
Sécuriser une application avec JWT
Mettre en œuvre des tests unitaires

# Qualité et sécurité
Utiliser ESLint
Mettre en place une analyse de sécurité avec CodeQL
Gérer les variables et informations sensibles
Contrôler la qualité du code

# DevOps
Utiliser Git et GitHub
Conteneuriser une application avec Docker
Construire une pipeline CI/CD avec GitHub Actions
Publier des images Docker sur GHCR
Déployer une application sur Kubernetes
Utiliser Kubernetes Deployments, Services, Ingress et PVC
Automatiser le déploiement
Mettre en place des notifications de pipeline

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
