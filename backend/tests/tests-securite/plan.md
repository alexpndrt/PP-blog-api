# 📄 Plan de Tests - Sécurité API

---

## Plan de tests complet avec ID

| ID   | Fonction testée           | Cas de test                              | Données envoyées               | Résultat attendu |
| ---- | ------------------------- | ---------------------------------------- | ------------------------------ | ---------------- |
| T-S1 | Sécurité login            | ❌ Tentative d'injection SQL             | username et password malicieux | 401 Unauthorized |
| T-S2 | Accès sans token          | ❌ Appel d'une route protégée sans token | Aucun header Authorization     | 401 Unauthorized |
| T-S3 | Accès avec token invalide | ❌ Appel d'une route avec mauvais token  | Faux token Bearer              | 401 Unauthorized |

---

## 2️⃣ Tests Sécurité Login (`POST /api/login`)

| Cas de test      | Données envoyées                       | Résultat attendu |
| ---------------- | -------------------------------------- | ---------------- |
| ❌ Injection SQL | username = ' OR '1'='1', fake password | 401 Unauthorized |

## 3️⃣ Tests Sécurité Accès Protégé

| Cas de test                            | Prérequis / Données | Résultat attendu |
| -------------------------------------- | ------------------- | ---------------- |
| ❌ Accès sans token (`GET /api/posts`) | Aucun token         | 401 Unauthorized |
| ❌ Accès avec token invalide           | Faux token Bearer   | 401 Unauthorized |

---

✅ Ces plans doivent être enrichis à chaque évolution fonctionnelle ou correctif de sécurité.

📌 Les résultats attendus doivent toujours respecter les standards HTTP pour assurer la cohérence de l'API.
