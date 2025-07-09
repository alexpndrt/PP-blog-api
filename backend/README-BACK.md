# 🚀 Blog Backend - Node.js + Express + PostgreSQL

Ce dossier correspond au **Backend** du projet **Blog FullStack CDA** développé avec **Node.js**, **Express**, **Sequelize** et sécurisé avec **JWT**.

L'API permet de :

- Gérer les utilisateurs : inscription, connexion (JWT)
- Gérer les articles : création, lecture, modification, suppression (CRUD)
- Contrôler les accès selon le rôle (user/admin)
- Documenter les routes avec **Swagger**

---

## 🛠 Technologies Utilisées

- Node.js 20
- Express
- Sequelize (ORM) ➔ PostgreSQL
- JWT (JSON Web Token)
- Argon2 (hachage des mots de passe)
- Swagger (documentation interactive)
- Docker (optionnel)

---

## 📂 Structure du Projet `/backend`

```
backend/
├── src/
│   ├── config/        ➔ Configuration DB & Swagger
│   ├── controllers/   ➔ Logique métier (auth, posts)
│   ├── middlewares/   ➔ Sécurité, validation, erreurs
│   ├── models/        ➔ Sequelize : User, Role, Post
│   ├── routes/        ➔ Définition des endpoints API
│   └── app.js         ➔ Point d'entrée Express
├── data/              ➔ Scripts SQL, dev DB
├── tests/             ➔ Tests automatisés Node.js
└── Dockerfile / docker-compose.yml
```

---

## ⚙️ Installation Locale

1️⃣ Installer les dépendances :

```bash
cd backend
npm install
```

2️⃣ Créer un fichier `.env` :

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=blogapi
JWT_SECRET=your_jwt_secret
```

3️⃣ Lancer l'application :

```bash
npm run dev
```

Accessible sur :

```
http://localhost:3000
```

---

## 🐳 Utilisation avec Docker (optionnel)

```bash
docker-compose up --build
```

👉 Permet de lancer PostgreSQL et le backend en conteneurs.

---

## 🔐 Authentification & Rôles

- 🔑 Inscription ➔ rôle `user` par défaut
- 🔑 Connexion ➔ Token JWT généré avec données utilisateur
- 🔒 Middleware de protection des routes
- 🛂 Permissions CRUD articles :

  - User ➔ articles qu'il possède
  - Admin ➔ tous les articles

---

## 📄 Documentation Swagger

- Accessible sur :

```
http://localhost:3000/api-docs
```

Inclut :

- Authentification
- Articles : GET, POST, PUT, DELETE
- Gestion des erreurs

---

## 🧪 Tests Automatisés

```bash
npm run test
```

Tests couvrant :

- Authentification (inscription, login)
- Articles (lecture, création, modification, suppression avec contrôle d'accès)

Tests écrits avec :

- Node Test Runner
- Supertest + Assert

---

## ☁️ Déploiement Cloud

- Backend déployable sur **Render**
- Base de données PostgreSQL Render
- Variables d'environnement configurées dans Render Dashboard

---

## 📦 Scripts NPM principaux

| Commande       | Description                     |
| -------------- | ------------------------------- |
| `npm run dev`  | Démarrage en mode développement |
| `npm run test` | Lancement des tests             |
| `npm run lint` | (optionnel) Analyse lint        |

---

## 👨‍💻 Auteur & Contexte

- Développeur : \[Ton Nom]
- Formation : CDA - O'Clock
- Année : 2025

---
