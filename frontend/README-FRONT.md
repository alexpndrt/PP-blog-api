# 🎨 Blog Frontend - React + Vite + TypeScript

Ce dossier correspond au **Frontend** du projet **Blog FullStack CDA** développé avec **React 18**, **TypeScript** et **Tailwind CSS**.

L'application permet aux utilisateurs de :

* S'inscrire et se connecter de façon sécurisée
* Lire la liste des articles
* Créer, modifier et supprimer leurs propres articles
* Naviguer entre les pages avec **React Router DOM**

---

## 🚀 Technologies Utilisées

* ⚛️ React 18
* ⚡ Vite.js
* 💅 Tailwind CSS
* 🔀 React Router DOM
* 🔐 Contexte Auth (React Context API)
* TypeScript (strict typing)

---

## 📁 Structure Principale du Dossier `/src`

```
src/
├── api/             ➔ Appels Axios centralisés
├── components/      ➔ Composants réutilisables (Header, Forms, PostCard...)
├── contexts/        ➔ Contexte d'authentification
├── hooks/           ➔ Hooks personnalisés (future amélioration)
├── layouts/         ➔ Layouts communs (à venir)
├── pages/           ➔ Pages principales (Accueil, Login, Register, Posts)
├── router/          ➔ Gestion des routes
├── styles/          ➔ Fichier CSS global (index.css)
└── utils/           ➔ Fonctions utilitaires
```

---

## ⚙️ Installation en Local

1️⃣ Cloner le dépôt :

```bash
git clone https://github.com/votre-compte/blog-fullstack.git
```

2️⃣ Installer les dépendances :

```bash
cd frontend
npm install
```

3️⃣ Lancer le serveur de développement :

```bash
npm run dev
```

➔ L'application sera disponible sur :

```
http://localhost:5173
```

---

## 🔐 Authentification & Rôles

* Stockage du **token JWT** et du **username** dans le **LocalStorage**
* Gestion centralisée via un **AuthContext** React
* Navigation dynamique selon le rôle :

  * `user` ➔ Peut créer, modifier, supprimer **ses propres articles**
  * `admin` ➔ Peut gérer **tous les articles**

---

## 📝 Fonctionnalités Détaillées

| Fonctionnalité     | Description                                                               |
| ------------------ | ------------------------------------------------------------------------- |
| Page d'accueil     | Présentation du blog + liens Connexion / Inscription                      |
| Inscription        | Enregistrement sécurisé ➔ utilisateur créé automatiquement en rôle `user` |
| Connexion          | Authentification par token JWT                                            |
| Liste des articles | Affiche tous les articles ➔ tri du plus récent au plus ancien             |
| CRUD articles      | Créer / Modifier / Supprimer un article selon rôle                        |
| Déconnexion        | Suppression du token + retour à l'accueil                                 |

---

## 🌐 Variables d'Environnement (optionnelles)

Un fichier `.env` peut être utilisé pour définir l'URL de l'API si nécessaire :

```
VITE_API_URL=http://localhost:3000
```

---

## 📦 Build pour Production

```bash
npm run build
```

Le dossier `/dist` sera généré pour être déployé sur **Render** ou **Vercel**.

---

## 👨‍💻 Auteur & Contexte

* Développeur : \[Ton Nom]
* Projet réalisé dans le cadre de la **formation CDA - O'Clock**
* Année : 2025

---
