# 📦 Docker - Mémo Complet pour le projet Blog API

Ce document est une fiche pratique pour comprendre, utiliser et partager les bonnes pratiques Docker sur le projet **blog-api**. Il est destiné à la fois pour moi et pour mes coéquipiers.

---

## 🐳 1. Les bases de Docker

* **Image** : le "modèle" (gabarit) ➔ ex : `node:20`, `postgres:15`, ou ton image `blog-api-api`.
* **Container** : l'application "vivante" ➔ instance en cours d'exécution créée depuis une image.
* **Volume** : un disque dur virtuel ➔ permet de **sauvegarder les données persistantes** (comme une base de données).
* **Build** : le processus qui transforme le code + Dockerfile en une image.

---

## 🗂 2. Les fichiers essentiels dans ce projet

* `Dockerfile` ➔ définit comment construire l'image de l'API.
* `docker-compose.yml` ➔ décrit les services (API + PostgreSQL) et comment ils interagissent.
* `.env` ➔ stocke les variables d'environnement (ne jamais publier).
* `.env.example` ➔ modèle de fichier `.env` sans données sensibles.

---

## ⚙️ 3. Les commandes Docker utiles

### 🚀 Démarrer l'application avec Docker Compose

```bash
docker compose up --build
```

* `up` ➔ démarre les containers.
* `--build` ➔ reconstruit les images si le code a changé.

### ⏹ Arrêter l'application

```bash
docker compose down
```

* Arrête et supprime les containers mais garde les volumes (les données).

### 💣 Arrêt + Suppression des volumes (efface les données de la base)

```bash
docker compose down -v
```

### 🔍 Visualiser les ressources

| Action                  | Commande                           |
| ----------------------- | ---------------------------------- |
| Voir containers         | `docker ps` ou `docker compose ps` |
| Voir images             | `docker images`                    |
| Voir volumes            | `docker volume ls`                 |
| Voir logs en temps réel | `docker compose logs -f`           |

### 🧹 Supprimer ce qui est inutile

\| Supprimer container | `docker rm nom_container` |
\| Supprimer image | `docker rmi nom_image` |
\| Supprimer volume | `docker volume rm nom_volume` |

---

## 💾 4. Les Volumes ➔ Pourquoi et comment ?

* Les **volumes** stockent les **données persistantes** ➔ par exemple les données de la base PostgreSQL.
* Si tu arrêtes un container, les données sont conservées dans le volume.
* Pour supprimer complètement une base ➔ il faut supprimer le **volume**.

👉 Exemple dans ce projet ➔ Volume important : `blog-api_postgres_data`

---

## 📦 5. Ce qui apparaît dans Docker Desktop et à quoi ça sert

| Onglet     | Contenu                       | Ce qu'on garde                          | Ce qu'on peut supprimer           |
| ---------- | ----------------------------- | --------------------------------------- | --------------------------------- |
| Containers | Les applications qui tournent | Le projet actif (`blog-api`)            | Les vieux containers inutilisés   |
| Images     | Les modèles d'application     | L'image `blog-api-api` et `postgres:15` | Images non utilisées ou obsolètes |
| Volumes    | Les données persistantes      | Le volume de la BDD actuelle            | Volumes orphelins ou anciens      |
| Builds     | Historique des constructions  | Rien d'indispensable                    | Peut être vidé sans risque        |

---

## 🚀 6. Cas pratique : Démarrer le projet Blog API sur une autre machine

### A. Prérequis

* Avoir **Docker Desktop** installé.
* Avoir accès au dépôt GitHub.

### B. Étapes :

1️⃣ Cloner le projet

```bash
git clone <url_du_repo>
cd blog-api
```

2️⃣ Créer un fichier `.env` à partir de `.env.example` et remplir les variables :

```env
PORT=3000
DB_NAME=blogapi
DB_USER=blogapi
DB_PASSWORD=blogapi
DB_HOST=database
DB_PORT=5432
JWT_SECRET=supersecret
```

3️⃣ Lancer le projet :

```bash
docker compose up --build
```

4️⃣ Accéder à l'application :

* API : [http://localhost:3000/api](http://localhost:3000/api)
* Swagger : [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

### C. Pour tout arrêter et garder les données :

```bash
docker compose down
```

### D. Pour réinitialiser complètement (vider la base) :

```bash
docker compose down -v
```

---

## 💡 7. Bonnes pratiques Docker à retenir

* Toujours **externaliser les variables sensibles** dans un fichier `.env`.
* Ne jamais exposer un `.env` sur un dépôt public.
* Nettoyer régulièrement les **containers**, **images** et **volumes** inutiles.
* Pour les images ➔ préférer une **version spécifique** (ex : `postgres:15`) plutôt que `latest`.
* Documenter les procédures pour que l'équipe puisse reproduire sans friction.

---

✅ Ce document peut être enrichi au fil du temps selon les besoins du projet ou des évolutions techniques.
