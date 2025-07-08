# Blog API - Projet de Pratique et d'Amélioration des Compétences

## 📚 Contexte et Objectifs

Ce projet a été réalisé dans le cadre de ma formation au Titre Professionnel **Concepteur Développeur d'Applications (CDA)** avec pour objectif de :

- Consolider mes compétences en développement backend.
- Maîtriser la création d'une API REST sécurisée avec **Node.js**, **Express** et **PostgreSQL**.
- Mettre en place une authentification sécurisée et une gestion des droits d'accès.
- Documenter et tester correctement une API.
- Mettre en place une **CI/CD automatisée avec GitHub Actions** pour garantir la qualité.
- Préparer le projet à un déploiement professionnel.

Il s'agit d'un projet d'entraînement personnel visant à m'améliorer et à appliquer les bonnes pratiques vues en formation.

---

## ⚙️ Technologies utilisées

- **Node.js** (version ESModules)
- **Express.js**
- **Sequelize** (ORM)
- **PostgreSQL**
- **argon2** pour le hashage des mots de passe
- **jsonwebtoken (JWT)** pour l'authentification
- **express-validator** pour la validation des données
- **Swagger (swagger-jsdoc + swagger-ui-express)** pour la documentation
- **Assert (Node.js)** pour les tests
- **Docker & Docker Compose** pour la conteneurisation
- **GitHub Actions** pour l'intégration et les tests automatisés

---

## 🏗️ Architecture du Projet

Le projet suit une architecture de type **MVC (Modèle - Vue - Contrôleur)** adaptée aux API REST :

- **Models** : Définis avec Sequelize, représentent les entités (User, Role, Post).
- **Controllers** : Contiennent la logique métier (authentification, gestion des articles).
- **Routes** : Gèrent les points d'entrée de l'application.
- **Middlewares** : Sécurisent et valident les requêtes.

Cette structure assure une séparation claire des responsabilités et facilite la maintenance et l'évolutivité.

---

## 🗄️ Base de Données & Conception

Le projet utilise une base de données relationnelle PostgreSQL.

### Modèles présents :

- **User** : utilisateurs avec id, username, mot de passe hashé, roleId
- **Role** : rôles utilisateurs (Admin, User)
- **Post** : articles avec titre, contenu, et référence vers l'utilisateur auteur

### Diagrammes

- MCD : ![MCD](./docs/conception/MCD/MCD.png)
- MLD : ![MLD](./docs/conception/MLD/MLD.png)

---

## ⚙️ Installation et Lancement

### 1. Cloner le projet

```bash
git clone <url_du_repo>
cd blog-api
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer le fichier `.env`

```
PORT=3000
DB_NAME=blogapi
DB_USER=blogapi
DB_PASSWORD=blogapi
DB_HOST=localhost
DB_PORT=5432
JWT_SECRET=supersecret
```

**Note :** Le contenu du fichier `.env` n'est donné ici qu'à titre indicatif pour l'installation locale et ne doit pas être publié dans un environnement réel.

### 4. Initialiser la base de données

```bash
npm run reset-and-seed
```

### 5. Lancer le serveur

```bash
npm run dev
```

L'API est disponible sur :

```
http://localhost:3000/api
```

La documentation Swagger est disponible sur :

```
http://localhost:3000/api-docs
```

---

## 🔐 Authentification & Sécurité

- Inscriptions ➔ `/api/register`
- Connexion ➔ `/api/login` ➔ obtention d'un JWT
- Utilisation du JWT ➔ `Authorization: Bearer <token>`
- Accès aux routes protégées et gestion des rôles (Admin/User)

Les actions sensibles comme créer, modifier ou supprimer un article nécessitent un rôle "Admin".

---

## 🔗 Principales Routes de l'API

| Méthode | URL             | Accès       | Description             |
| ------- | --------------- | ----------- | ----------------------- |
| POST    | /api/register   | Public      | Inscription utilisateur |
| POST    | /api/login      | Public      | Connexion utilisateur   |
| GET     | /api/posts      | Authentifié | Liste des articles      |
| GET     | /api/posts/\:id | Authentifié | Détail d'un article     |
| POST    | /api/posts      | Admin       | Créer un article        |
| PUT     | /api/posts/\:id | Admin       | Modifier un article     |
| DELETE  | /api/posts/\:id | Admin       | Supprimer un article    |

La documentation complète de chaque route est disponible dans Swagger.

---

## 📚 Documentation Swagger

Accessible sur :

```
http://localhost:3000/api-docs
```

Elle permet de visualiser et de tester toutes les routes directement avec un token JWT.

---

## 🛡️ Sécurité du Projet

- **Mots de passe** : hashés avec **argon2**.
- **Authentification** : via **JWT**.
- **Contrôle des rôles** : seuls les "Admin" peuvent créer, modifier ou supprimer des articles.
- **Validation des données** : avec **express-validator**.
- **Middleware global de gestion des erreurs**.
- **Bonne gestion des variables d'environnement** pour protéger les données sensibles.

---

## 🧪 Tests

- Tests unitaires et fonctionnels ➔ **Node\:test + Assert + Supertest**
- Tests de sécurité ➔ injections, accès non autorisés
- Tests de non-régression ➔ cycle complet CRUD

```bash
npm run test
```

Les tests sont également exécutés automatiquement via **GitHub Actions** à chaque **push** ou **pull request**.

---

## 🚀 Déploiement & CI/CD

### 🐳 Déploiement avec Docker (Pro)

### 1️⃣ Prérequis

- Avoir **Docker** et **Docker Compose** installés sur votre machine.

### 2️⃣ Variables d'environnement (sécurisées)

Créez un fichier `.env` à la racine du projet (non versionné) :

```env
PORT=3000
DB_NAME=blogapi
DB_USER=blogapi
DB_PASSWORD=blogapi
DB_HOST=database
DB_PORT=5432
JWT_SECRET=supersecret
```

Ces variables sont externalisées et ne doivent **jamais être partagées sur GitHub**. Un fichier `.env.example` peut être fourni pour indiquer les clés attendues sans les valeurs réelles.

### 3️⃣ Lancer les containers

```bash
docker compose --env-file .env up --build
```

Cela démarre :

- Un container pour la base PostgreSQL.
- Un container pour l'API Node.js.

L’API sera accessible sur :

```
http://localhost:3000/api
```

La documentation Swagger sera accessible sur :

```
http://localhost:3000/api-docs
```

### 4️⃣ Arrêter les containers

```bash
docker compose down
```

### 5️⃣ Points forts de la dockerisation

- 🔐 **Sécurité** ➔ Pas de secrets dans le code.
- 🌍 **Portabilité** ➔ Fonctionne sur toutes les machines.
- 💾 **Persistance des données** ➔ La base PostgreSQL utilise un volume Docker (`postgres_data`).

### 📄 Mémo Commandes Docker

| Commande                                | Description                                 |
| --------------------------------------- | ------------------------------------------- |
| `docker compose up --build`             | Démarre les containers avec build à jour    |
| `docker compose down`                   | Stoppe et supprime les containers           |
| `docker compose down -v`                | Supprime aussi les volumes (reset complet)  |
| `docker compose ps`                     | Liste les containers en cours               |
| `docker compose logs -f`                | Affiche les logs en direct                  |
| `docker exec -it <nom_du_container> sh` | Ouvre un terminal dans le container (debug) |

Les containers et volumes peuvent également être visualisés et gérés depuis **Docker Desktop**.


### CI/CD GitHub Actions :

- Tests automatisés à chaque push
- Statut visible dans l’onglet Actions
- Protection des branches possible

---

## 📈 Prochaines évolutions

- Frontend React avec consommation de l'API
- Déploiement complet sur Render ou Railway
- Monitoring et optimisation des performances

---

👤 Réalisé par **Alex** dans le cadre de la formation CDA.

✅ Projet complet : Docker, Sécurité, Tests, CI/CD, Documentation.
