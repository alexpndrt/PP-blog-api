# 📄 Plan de Tests - Authentification (API Blog)

---

## Plan de tests complet avec ID

| ID   | Fonction testée         | Cas de test             | Données envoyées                       | Résultat attendu          |
| ---- | ----------------------- | ----------------------- | -------------------------------------- | ------------------------- |
| T-A1 | Inscription utilisateur | ✅ Inscription valide   | username, password, roleId valides     | 201 Created + User object |
| T-A2 | Inscription utilisateur | ❌ Champs manquants     | username manquant ou password manquant | 400 Bad Request           |
| T-A3 | Inscription utilisateur | ❌ Username existant    | username déjà pris                     | 400 Bad Request           |
| T-A4 | Inscription utilisateur | ❌ Rôle inexistant      | roleId inexistant                      | 400 ou 500                |
| T-L1 | Connexion utilisateur   | ✅ Connexion valide     | username & password corrects           | 200 OK + token JWT        |
| T-L2 | Connexion utilisateur   | ❌ Mauvais username     | username inexistant                    | 401 Unauthorized          |
| T-L3 | Connexion utilisateur   | ❌ Mauvais mot de passe | mauvais password                       | 401 Unauthorized          |
| T-L4 | Connexion utilisateur   | ❌ Champs manquants     | username ou password manquant          | 400 Bad Request           |

---

## 1️⃣ Tests d'inscription (`POST /api/register`)

| Cas de test           | Données envoyées                       | Résultat attendu               |
| --------------------- | -------------------------------------- | ------------------------------ |
| ✅ Inscription valide | username, password, roleId valides     | 201 Created + User object      |
| ❌ Champs manquants   | username manquant ou password manquant | 400 Bad Request                |
| ❌ Username existant  | username déjà pris                     | 400 Bad Request                |
| ❌ Rôle inexistant    | roleId inexistant                      | 400 ou 500 (selon logique API) |

---

## 2️⃣ Tests de connexion (`POST /api/login`)

| Cas de test             | Données envoyées              | Résultat attendu   |
| ----------------------- | ----------------------------- | ------------------ |
| ✅ Connexion valide     | username et password corrects | 200 OK + token JWT |
| ❌ Mauvais username     | username inexistant           | 401 Unauthorized   |
| ❌ Mauvais mot de passe | mauvais password              | 401 Unauthorized   |
| ❌ Champs manquants     | username ou password manquant | 400 Bad Request    |

---
