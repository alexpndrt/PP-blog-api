# 📝 Documentation des Tests - Projet Blog API

Ce document décrit l'organisation des tests, leur utilité, les résultats attendus et les bonnes pratiques à respecter pour garantir la qualité et la stabilité de l'API Blog.

---

## 📚 Pourquoi faire des tests ?

Les tests permettent de :

- ✅ Vérifier le bon fonctionnement de l'API (comportement attendu).
- ✅ Éviter les régressions lors des évolutions du code.
- ✅ S'assurer que la sécurité et les validations fonctionnent correctement.
- ✅ Automatiser la vérification avec une CI/CD.

---

## ⚙️ Types de tests utilisés

| Type de test           | Définition rapide                                           | Outils utilisés           |
| ---------------------- | ----------------------------------------------------------- | ------------------------- |
| Test unitaire          | Test d'une fonction isolée                                  | `node:test`, `assert`     |
| Test fonctionnel       | Test d'un comportement complet via les routes API           | `supertest` + API Express |
| Test de sécurité       | Test de gestion des accès, permissions, erreurs             | supertest + token JWT     |
| Test de non-régression | Enchaînement de plusieurs actions pour vérifier un workflow | supertest                 |

---

## 🛠️ Outils et technologies de test

- **node\:test** ➔ Framework minimal pour exécuter les tests.
- **assert** ➔ Module natif de Node.js pour les vérifications.
- **supertest** ➔ Permet d'appeler l'API et de vérifier les réponses HTTP.

---

## ✅ Liste des tests réalisés (avec ID et Résultats attendus)

### 1️⃣ Tests Authentification

| ID   | Fonction testée      | Cas de test                              | Résultat attendu          |
| ---- | -------------------- | ---------------------------------------- | ------------------------- |
| T-A1 | Inscription valide   | Envoi username, password, roleId valides | 201 Created + User object |
| T-A2 | Champs manquants     | Champs vides ou manquants                | 400 Bad Request           |
| T-A3 | Username existant    | Username déjà utilisé                    | 400 Bad Request           |
| T-A4 | Rôle inexistant      | RoleId invalide                          | 400 ou 500                |
| T-L1 | Connexion valide     | Identifiants valides                     | 200 OK + token JWT        |
| T-L2 | Mauvais username     | Username incorrect                       | 401 Unauthorized          |
| T-L3 | Mauvais mot de passe | Mot de passe incorrect                   | 401 Unauthorized          |
| T-L4 | Champs manquants     | Username ou password manquant            | 400 Bad Request           |

### 2️⃣ Tests Gestion des Articles (Posts)

| ID    | Fonction testée                 | Cas de test                   | Résultat attendu        |
| ----- | ------------------------------- | ----------------------------- | ----------------------- |
| T-P1  | Lecture avec token valide       | Token valide admin/user       | 200 OK + liste articles |
| T-P2  | Lecture sans token              | Aucun token fourni            | 401 Unauthorized        |
| T-P3  | Lecture avec token invalide     | Token incorrect               | 401 Unauthorized        |
| T-P4  | Création valide (admin)         | Token admin + title + content | 201 Created + post      |
| T-P5  | Création sans token             | Aucun token                   | 401 Unauthorized        |
| T-P6  | Création avec user non-admin    | Token user non admin          | 403 Forbidden           |
| T-P7  | Création données manquantes     | Données incomplètes           | 400 Bad Request         |
| T-P8  | Modification valide             | Token admin + données valides | 200 OK + post modifié   |
| T-P9  | Modification sans token         | Aucun token                   | 401 Unauthorized        |
| T-P10 | Modification par user non-admin | Token user                    | 403 Forbidden           |
| T-P11 | Modification post inexistant    | ID inexistant                 | 404 Not Found           |
| T-P12 | Suppression valide              | Token admin + ID valide       | 200 OK                  |
| T-P13 | Suppression sans token          | Aucun token                   | 401 Unauthorized        |
| T-P14 | Suppression par user            | Token user                    | 403 Forbidden           |
| T-P15 | Suppression post inexistant     | ID inexistant                 | 404 Not Found           |

---

## 🚀 Comment exécuter les tests

### 1️⃣ Installer les dépendances

```bash
npm install
```

### 2️⃣ Lancer tous les tests

```bash
npm run test
```

### 3️⃣ Lancer un test spécifique

```bash
node --test tests/tests-routes/tests-auth/auth.test.js
```

---

## 🔄 Tests & CI/CD ➔ Automatisation des tests

### Pourquoi ?

- Permet d'exécuter les tests **automatiquement** à chaque push ou pull request.
- Garantit la **non-régression** du code dans le temps.

### Exemple de configuration CI/CD avec GitHub Actions :

Fichier `.github/workflows/nodejs.yml` :

```yaml
name: Node.js CI

on:
  push:
    branches: [main, develop, feature/*]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Use Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 20

      - run: npm ci
      - run: npm run test
```

✅ Cela lance automatiquement les tests à chaque action sur GitHub.
✅ Les erreurs ou succès sont visibles directement dans l'interface GitHub.

---

## 💡 Bonnes pratiques pour les tests

- ✅ Tester **cas positifs** et **cas négatifs**.
- ✅ Utiliser des données de test uniques (ex : `user_${Date.now()}`).
- ✅ Tester les erreurs et permissions (401, 403, 404).
- ✅ Automatiser avec CI/CD.
- ✅ Mettre à jour la documentation des tests en cas de modification du comportement de l'API.

---

📌 Ce document est évolutif ➔ il peut être enrichi avec des tests supplémentaires ou des remarques sur la stratégie de test.
