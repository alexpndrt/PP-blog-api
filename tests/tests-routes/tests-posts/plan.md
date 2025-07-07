# 📄 Plan de Tests - Routes Articles (Posts)

---

## 3️⃣ Lecture des articles (`GET /api/posts`)

| Cas de test                    | Prérequis                | Résultat attendu         |
| ------------------------------ | ------------------------ | ------------------------ |
| ✅ Lecture avec token valide   | Token d'un user ou admin | 200 OK + liste des posts |
| ❌ Lecture sans token          | Aucun token fourni       | 401 Unauthorized         |
| ❌ Lecture avec token invalide | Token JWT incorrect      | 401 Unauthorized         |

## 4️⃣ Création d'article (`POST /api/posts`)

| Cas de test                         | Prérequis   | Données envoyées                   | Résultat attendu          |
| ----------------------------------- | ----------- | ---------------------------------- | ------------------------- |
| ✅ Création réussie                 | Token admin | title et content valides           | 201 Created + Post object |
| ❌ Création sans token              | Aucun token | -                                  | 401 Unauthorized          |
| ❌ Création avec token non-admin    | Token user  | title, content                     | 403 Forbidden             |
| ❌ Création avec données manquantes | Token admin | title manquant ou content manquant | 400 Bad Request           |

## 5️⃣ Modification d'article (`PUT /api/posts/:id`)

| Cas de test                          | Prérequis   | Données envoyées | Résultat attendu      |
| ------------------------------------ | ----------- | ---------------- | --------------------- |
| ✅ Modification réussie              | Token admin | title et content | 200 OK + Post modifié |
| ❌ Modification sans token           | Aucun token | -                | 401 Unauthorized      |
| ❌ Modification avec token non-admin | Token user  | title, content   | 403 Forbidden         |
| ❌ Modification de post inexistant   | Token admin | title, content   | 404 Not Found         |

## 6️⃣ Suppression d'article (`DELETE /api/posts/:id`)

| Cas de test                         | Prérequis   | Résultat attendu                 |
| ----------------------------------- | ----------- | -------------------------------- |
| ✅ Suppression réussie              | Token admin | 200 OK + message de confirmation |
| ❌ Suppression sans token           | Aucun token | 401 Unauthorized                 |
| ❌ Suppression avec token non-admin | Token user  | 403 Forbidden                    |
| ❌ Suppression de post inexistant   | Token admin | 404 Not Found                    |

---
