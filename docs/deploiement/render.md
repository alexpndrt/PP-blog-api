# 📄 Déploiement de l'API Blog sur Render (Base de Données + Application)

Ce document récapitule **étape par étape** comment déployer votre API ainsi que sa base de données PostgreSQL sur **Render.com**.

---

## 🚀 1. Créer la base de données PostgreSQL

1. Connectez-vous à [Render](https://dashboard.render.com/).
2. Cliquez sur **New ➔ PostgreSQL**.
3. Remplissez les champs suivants :

| Champ      | Valeur Exemple                  |
| ---------- | ------------------------------- |
| Name       | blogapi-db                      |
| Database   | (laisser vide ou personnaliser) |
| User       | (laisser vide ou personnaliser) |
| Region     | Oregon (US West)                |
| PostgreSQL | 16                              |

4. Cliquez sur **Create Database**.

### ✅ Une fois créée :

- Notez les informations suivantes :

  - **Hostname**
  - **Database** (nom de la base)
  - **User**
  - **Password**
  - **Port** (5432 par défaut)

5. Dans **Access Control ➔ Source** : ajoutez `0.0.0.0/0` pour autoriser l'accès depuis partout.

---

## 🗂️ 2. Créer les Variables d'Environnement pour l'application

Vous devez créer un fichier `.env.prod` **localement** dans votre projet avec ces variables (les valeurs sont à adapter) :

```env
PORT=10000
DB_NAME=blogapi_xxxx
DB_USER=bloguser
DB_PASSWORD=lepassworddonneparrender
DB_HOST=lehostname.render.com
DB_PORT=5432
JWT_SECRET=supersecret
```

Ensuite :

1. Sur Render ➔ Votre Web Service ➔ **Environment Variables**.
2. Ajoutez manuellement ces variables.

🔑 **Conseils :**

- Ne mettez jamais ce fichier `.env.prod` sur GitHub.
- Assurez-vous que les noms des clés sont **strictement identiques** à ceux attendus dans le code.

---

## ⚙️ 3. Déployer l'Application API (Docker)

1. Depuis le dashboard Render ➔ **New ➔ Web Service**.
2. Choisissez votre repo GitHub où se trouve votre projet.
3. Configuration à remplir :

| Champ          | Valeur                                       |
| -------------- | -------------------------------------------- |
| Name           | PP-blog-api                                  |
| Language       | Docker                                       |
| Branch         | main                                         |
| Region         | la même que la base (ex : Oregon US West)    |
| Root Directory | (laisser vide si Dockerfile est à la racine) |

4. Choisissez l'instance **Free** (ou Starter si besoin).
5. Ajoutez les **Environment Variables** (voir étape 2).
6. Cliquez sur **Deploy Web Service**.

Render va :

- Lancer votre `Dockerfile`.
- Installer les dépendances.
- Connecter à la base PostgreSQL.
- Exposer votre API à une URL publique.

---

## 🔗 4. Vérifier que tout fonctionne

- Accédez à votre API : `https://nomduprojet.onrender.com/api`
- Accédez à la documentation Swagger : `https://nomduprojet.onrender.com/api-docs`
- Consultez les logs dans l'onglet **Events**.

---

## 🛠️ Commandes utiles en cas de besoin

| Action                         | Commande / Étape                                     |
| ------------------------------ | ---------------------------------------------------- |
| Redéployer manuellement        | Bouton **Manual Deploy** sur Render                  |
| Accéder aux logs               | Onglet **Logs** ou **Events**                        |
| Modifier les variables d'env   | Onglet **Environment ➔ Add/Edit**                    |
| Changer l'instance (puissance) | Onglet **Scaling ➔ Change Instance Type**            |
| Mettre à jour le code          | Faire un `git push` sur la branche suivie par Render |

---

## 📝 Remarques importantes

- Les bases de données gratuites Render expirent au bout de **90 jours** si elles ne sont pas utilisées.
- Prévoyez un budget si vous souhaitez un environnement persistant pour la production.
- Pensez à sécuriser les endpoints sensibles et valider les données côté serveur.

---

_Rédigé par Alex — CDA 2025._
