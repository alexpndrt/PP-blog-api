# 📅 Guide Complet de Déploiement sur Render (Backend + Database)

## 🔐 Objectif

Ce document explique **pas à pas** comment déployer une API Node.js avec Express et PostgreSQL sur **Render**, avec explications simples pour pouvoir refaire la procédure plus tard ou la partager à l'équipe.

---

## 🛁 Création de la base de données PostgreSQL sur Render

1. Connectez-vous à [Render](https://dashboard.render.com/).

2. Cliquez sur **New +** > **PostgreSQL**.

3. Choisissez :

   - **Name** : nom de la base (ex: `blogapi-db`)
   - **Region** : gardez par défaut (Frankfurt si Europe)
   - **Plan** : gratuit (**Starter**)

4. Créez la base.

5. Une fois créée :

   - Récupérez les informations **Host**, **Database**, **User**, **Password**, **Port**
   - Conservez-les pour configurer les variables d'environnement du Web Service.

---

## 📢 Création du Web Service Node.js sur Render

1. Cliquez sur **New +** > **Web Service**.
2. Connectez Render à votre repo GitHub.
3. Sélectionnez le repo de votre projet (ex: `PP-blog-api`).

### Configuration du Service :

- **Name** : nom du service (ex: `pp-blog-api`)
- **Region** : même que la base.
- **Branch** : `main`
- **Build Command** : `npm install`
- **Start Command** : `npm run prod`
- **Instance Type** : Free (Starter)

4. Cliquez **Create Web Service**.

---

## 🛡️ Configuration des Variables d'Environnement Render

Dans l'onglet **Environment** du service Web Render, ajoutez les variables suivantes :

| Key         | Value                         |
| ----------- | ----------------------------- |
| PORT        | 10000                         |
| DB_HOST     | (host Render ex: dpg-xxxxxxx) |
| DB_PORT     | 5432                          |
| DB_NAME     | (nom de la base Render)       |
| DB_USER     | (user Render)                 |
| DB_PASSWORD | (mot de passe Render)         |
| JWT_SECRET  | supersecret                   |

_Note : le fichier `.env.prod` sert à garder ces valeurs en local pour tests, mais **ne doit pas être poussé sur GitHub**._

---

## 🛠️ Étapes du Build & Déploiement

1. Render clone votre repo.
2. Il exécute `npm install` pour installer les dépendances.
3. Il exécute `npm run prod` pour lancer le serveur.
4. La connexion à la base se fait via les variables Render.

Si tout est OK : Render affiche l'URL de votre API (ex: `https://pp-blog-api.onrender.com`).

La documentation Swagger sera accessible via :

```
https://pp-blog-api.onrender.com/api-docs
```

---

## 🔄 Mises à jour du code

- Chaque **push sur GitHub** vers la branche `main` déclenche un **Auto Deploy**.
- Vos changements sont automatiquement déployés en ligne.

Pour vérifier :

1. Push vers GitHub.
2. Render reconstruit et redéploie.

---

## 🛠️ Accès et Gestion de la base PostgreSQL Render

- Render fournit un bouton **Connect** pour ouvrir un terminal SQL.
- Vous pouvez aussi utiliser **pgAdmin** ou **DBeaver** avec les infos Render.
- Plus besoin du fichier `.sql` local pour Render : la base se gère directement en ligne.

---

## 📈 Avantages de Render

- Accessible publiquement sans configuration serveur.
- Auto Deploy grâce à GitHub.
- PostgreSQL et Node.js gérés sans serveur.
- Gratuit en mode développement.

---

## 📅 Prochaines étapes possibles

- Déploiement du **frontend React** (Render ou Vercel).
- Mise en place de la **CI/CD** complète avec GitHub Actions.
- Ajout de logs avancés (Sentry, LogRocket).

---

📅 Auteur : Alex Pondart
Projet : **PP-Blog-API** pour la formation **CDA**
