# 📄 Plan de Tests - Authentification (API Blog)

---

## Plan global des tests avec ID (Connexion & Inscription)

| ID   | Fonction testée         | Cas de test             | Données envoyées / Prérequis       | Résultat attendu            |
|------|-------------------------|-------------------------|-------------------------------------|-----------------------------|
| T-A1 | Inscription utilisateur | ✅ Inscription valide   | username, password                 | 201 Created + User object   |
| T-A2 | Inscription utilisateur | ❌ Champs manquants     | username ou password manquant      | 400 Bad Request             |
| T-A3 | Inscription utilisateur | ❌ Username existant    | username déjà pris                 | 400 Bad Request             |
| T-L1 | Connexion utilisateur   | ✅ Connexion valide     | username & password corrects       | 200 OK + token JWT          |
| T-L2 | Connexion utilisateur   | ❌ Mauvais username     | username inexistant                | 401 Unauthorized            |
| T-L3 | Connexion utilisateur   | ❌ Mauvais mot de passe | mauvais password                   | 401 Unauthorized            |
| T-L4 | Connexion utilisateur   | ❌ Champs manquants     | username ou password manquant      | 400 Bad Request             |

---

## 1️⃣ Tests d'inscription (`POST /api/register`)

| Cas de test           | Données envoyées                       | Résultat attendu               |
|----------------------|-----------------------------------------|---------------------------------|
| ✅ Inscription valide | username, password                     | 201 Created + User object      |
| ❌ Champs manquants   | username ou password manquant          | 400 Bad Request                |
| ❌ Username existant  | username déjà existant                 | 400 Bad Request                |

---

## 2️⃣ Tests de connexion (`POST /api/login`)

| Cas de test             | Données envoyées              | Résultat attendu   |
|------------------------|-------------------------------|--------------------|
| ✅ Connexion valide     | username & password corrects   | 200 OK + token JWT |
| ❌ Mauvais username     | username inexistant            | 401 Unauthorized   |
| ❌ Mauvais mot de passe | mauvais password               | 401 Unauthorized   |
| ❌ Champs manquants     | username ou password manquant  | 400 Bad Request    |

---
