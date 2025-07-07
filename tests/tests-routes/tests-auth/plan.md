# 📄 Plan de Tests - Authentification (API Blog)

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
