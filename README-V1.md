# 🚀 Blog FullStack - CDA - O'Clock

Bienvenue dans le projet **Blog FullStack**, développé dans le cadre de la formation **Concepteur Développeur d'Applications (CDA)** avec l'école **O'Clock**.

Ce projet a pour but de mettre en pratique les compétences acquises en **développement frontend**, **backend**, **API REST sécurisée**, **gestion des rôles et des droits**, ainsi que la **mise en place de tests automatisés** et du **déploiement cloud**.

---

## 🌟 Fonctionnalités Principales

* 📝 Inscription et connexion sécurisées avec **JWT**
* 📰 Gestion complète d'articles (CRUD) : création, lecture, modification, suppression
* 👤 Rôles utilisateur : **User** (gère ses propres articles) & **Admin** (gère tous les articles)
* 📜 Documentation interactive **Swagger**
* 🧪 Suite de tests automatisés (auth + articles)
* ☁️ Déploiement cloud (Render / Vercel)

---

## 🛠 Technologies Utilisées

### Frontend

* ⚛️ React 18 + TypeScript
* ⚡ Vite.js
* 🎨 Tailwind CSS
* 🔀 React Router DOM
* 🪝 React Context API pour l'authentification

### Backend

* 🚀 Node.js 20 + Express
* 🔐 JWT + Argon2 pour l'authentification
* 🗄 Sequelize + PostgreSQL
* 📝 Swagger pour la documentation API
* 🐳 Docker & Docker Compose (optionnel)

### Tests

* 🧪 Node Test Runner
* ✅ Supertest + Assert

---

## 📂 Structure du Projet

```
├── backend
│   ├── src
│   ├── data
│   ├── tests
│   └── Dockerfile / docker-compose.yml
├── frontend
│   ├── src
│   ├── public
│   └── vite.config.ts
├── docs
├── README.md (global)
└── .github (CI/CD)
```

---

## 🚀 Installation Globale (Développement)

### 🔧 Prérequis :

* Node.js v20+
* npm v9+
* Docker (optionnel)

### 1️⃣ Installation Backend

```bash
cd backend
npm install
npm run dev
```

* Configuration via `.env` :

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=blogapi
JWT_SECRET=your_jwt_secret
```

* Swagger ➔ [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

### 2️⃣ Installation Frontend

```bash
cd frontend
npm install
npm run dev
```

* Accessible ➔ [http://localhost:5173](http://localhost:5173)

---

## 🧪 Lancer les Tests Automatisés

### Backend (auth + articles CRUD)

```bash
cd backend
npm run test
```

* Les tests vérifient :

  * Authentification : inscription / connexion (avec rôles)
  * Articles : création, lecture, modification, suppression avec contrôle d’accès

---

## ☁️ Déploiement Cloud

### Backend ➔ Render (Docker + PostgreSQL)

### Frontend ➔ Render ou Vercel (Vite.js)

* Prévoir la configuration des variables d’environnement sur les plateformes respectives.

---

## 📄 Documentation Complète

* 🛠 Swagger ➔ [http://localhost:3000/api-docs](http://localhost:3000/api-docs) (live API interactive)
* 📁 `/docs` ➔ MCD, MLD, Scripts SQL, Guide Docker, Guide Render
* 📝 README spécifiques dans `/frontend` et `/backend`

---

## 👨‍💻 Auteur & Contexte

* 👨‍💻 **Nom du développeur :** \[Ton Nom]
* 🎓 **Formation :** Concepteur Développeur d’Applications - O'Clock
* 📅 **Année :** 2025

---
