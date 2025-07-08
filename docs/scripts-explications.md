# 📄 Documentation des Scripts - Blog API

Cette documentation explique en détail les scripts disponibles dans le `package.json` du projet **Blog API**.

---

## 🚀 Scripts de Démarrage

| Script              | Commande             | Description                                                       |
| ------------------- | -------------------- | ----------------------------------------------------------------- |
| **Production**      | `npm run start`      | Lance l'application en mode production (ex : Render)              |
| **Développement**   | `npm run dev`        | Lance l'application en développement avec nodemon                 |
| **Dev Local .env**  | `npm run dev:local`  | Lance le dev en utilisant les variables du fichier `.env.dev`     |
| **Dev Docker .env** | `npm run dev:docker` | Lance le dev avec `.env.docker` (Docker Compose)                  |
| **Dev Prod .env**   | `npm run dev:prod`   | Lance le projet avec les variables de `.env.prod` (simulate prod) |

---

## 🛠 Scripts Base de Données

| Script           | Commande                 | Description                                                             |
| ---------------- | ------------------------ | ----------------------------------------------------------------------- |
| **Créer DB**     | `npm run create-db`      | Crée manuellement la base de données PostgreSQL                         |
| **Supprimer DB** | `npm run drop-db`        | Supprime la base existante                                              |
| **Seeder DB**    | `npm run seed-db`        | Exécute le script SQL pour insérer les données initiales (roles, admin) |
| **Reset DB**     | `npm run reset-db`       | Supprime puis recrée la base (sans données)                             |
| **Reset + Seed** | `npm run reset-and-seed` | Supprime, recrée et insère les données                                  |

---

## 🧪 Scripts de Tests

| Script           | Commande              | Description                                               |
| ---------------- | --------------------- | --------------------------------------------------------- |
| **Tests locaux** | `npm run test`        | Lance tous les tests en environnement local               |
| **Tests Docker** | `npm run test:docker` | Lance les tests avec environnement Docker (`.env.docker`) |

---

## 📄 Notes Importantes

- Les variables d'environnement sont centralisées dans des fichiers distincts :

  - `.env.dev` ➔ Développement local
  - `.env.docker` ➔ Docker Compose
  - `.env.prod` ➔ Production (Render)

- Un fichier `.env.example` est fourni comme modèle sans valeurs sensibles.

---

✅ Cette documentation doit être mise à jour en cas d'ajout ou de modification de scripts.
