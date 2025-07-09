# 📝 Documentation des Tests - Projet Blog API

Ce document rassemble l'ensemble des tests réalisés pour le projet Blog API. Il décrit les types de tests, les cas couverts, les résultats attendus, l'organisation des fichiers et la mise en place de la CI/CD.

---

## 📚 Pourquoi faire des tests ?

Les tests permettent de :

- ✅ Vérifier le bon fonctionnement de chaque fonctionnalité de l'API.
- ✅ Garantir la sécurité (authentification, rôles, erreurs).
- ✅ Assurer la non-régression lors des évolutions du projet.
- ✅ Automatiser les vérifications avec un pipeline CI/CD.

---

## ⚙️ Types de tests utilisés

| Type de test                  | Dossier associé                  | Outils            |
| ----------------------------- | -------------------------------- | ----------------- |
| Authentification              | `tests/tests-routes/tests-auth`  | Supertest, assert |
| Articles (Posts)              | `tests/tests-routes/tests-posts` | Supertest, assert |
| Sécurité (attaques)           | `tests/tests-securite`           | Supertest, assert |
| Non-régression (CRUD complet) | `tests/tests-non-regression`     | Supertest, assert |

---

## 🗂 Organisation des fichiers de tests

```
tests/
├── tests-routes/
│   ├── tests-auth/
│   │   └── auth.test.js
│   ├── tests-posts/
│       └── post.test.js
├── tests-securite/
│   └── securite.test.js
└── tests-non-regression/
    └── cycle-crud.test.js
```

---

## ✅ Cas de tests et Résultats attendus

### 🔐 Tests Authentification (`tests-auth`)

| ID   | Cas testé            | Résultat attendu   |
| ---- | -------------------- | ------------------ |
| T-A1 | Inscription valide   | 201 Created + user |
| T-A2 | Champs manquants     | 400 Bad Request    |
| T-A3 | Username existant    | 400 Bad Request    |
| T-A4 | Rôle inexistant      | 400 ou 500 Error   |
| T-L1 | Connexion valide     | 200 OK + JWT Token |
| T-L2 | Mauvais username     | 401 Unauthorized   |
| T-L3 | Mauvais mot de passe | 401 Unauthorized   |
| T-L4 | Champs manquants     | 400 Bad Request    |

### 📝 Tests Articles (`tests-posts`)

| ID    | Cas testé                       | Résultat attendu |
| ----- | ------------------------------- | ---------------- |
| T-P1  | Lecture articles avec token     | 200 OK + liste   |
| T-P2  | Lecture sans token              | 401 Unauthorized |
| T-P3  | Lecture avec token invalide     | 401 Unauthorized |
| T-P4  | Création article valide (admin) | 201 Created      |
| T-P5  | Création sans token             | 401 Unauthorized |
| T-P6  | Création par user non admin     | 403 Forbidden    |
| T-P7  | Données invalides création post | 400 Bad Request  |
| T-P8  | Modification valide (admin)     | 200 OK           |
| T-P9  | Modification sans token         | 401 Unauthorized |
| T-P10 | Modification par user non admin | 403 Forbidden    |
| T-P11 | Modification post inexistant    | 404 Not Found    |
| T-P12 | Suppression valide (admin)      | 200 OK           |
| T-P13 | Suppression sans token          | 401 Unauthorized |
| T-P14 | Suppression par user non admin  | 403 Forbidden    |
| T-P15 | Suppression post inexistant     | 404 Not Found    |

### 🛡️ Tests Sécurité (`tests-securite`)

| ID   | Cas testé                        | Résultat attendu |
| ---- | -------------------------------- | ---------------- |
| T-S1 | Injection SQL sur login          | 401 Unauthorized |
| T-S2 | Accès sans Bearer Token          | 401 Unauthorized |
| T-S3 | Accès avec Bearer Token corrompu | 401 Unauthorized |

### 🔄 Tests Non-régression (`tests-non-regression`)

| ID    | Cas testé                                       | Résultat attendu      |
| ----- | ----------------------------------------------- | --------------------- |
| T-NR1 | Cycle complet : create + read + update + delete | 200 OK à chaque étape |
| T-NR2 | Vérification des données après update           | Données mises à jour  |

---

## 🚀 Exécuter les tests

### Global :

```bash
npm run test
```

### Ciblé :

```bash
node --test tests/tests-securite/securite.test.js
```

---

## 🔄 CI/CD avec GitHub Actions

### 📄 Pourquoi ?

- Garantir la qualité en lançant automatiquement les tests sur chaque push.
- Faciliter le travail en équipe en détectant les erreurs avant intégration.

### 📄 Fichier : `.github/workflows/nodejs.yml`

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

- ➕ Badge "build passing" possible sur le README.
- ➕ Résultats visibles directement sur l’interface GitHub.

---

## 💡 Bonnes pratiques

- Tester les cas positifs ET négatifs.
- Organiser les tests par dossier et par fonctionnalité.
- Exécuter les tests avant tout merge.
- Documenter et enrichir ce fichier à chaque nouveau test ajouté.

---

✅ Ce document est prêt à être utilisé, partagé et enrichi dans le dossier `doc/tests`.
