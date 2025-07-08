# 📄 Plan de Tests - Routes Articles (Posts)

---

## Plan de tests complet avec ID

| ID    | Fonction testée        | Cas de test                     | Prérequis / Données        | Résultat attendu        |
| ----- | ---------------------- | ------------------------------- | -------------------------- | ----------------------- |
| T-P1  | Lecture des articles   | ✅ Token valide                  | Token admin ou user        | 200 OK + Liste articles |
| T-P2  | Lecture des articles   | ❌ Sans token                    | Aucun token                | 401 Unauthorized        |
| T-P3  | Lecture des articles   | ❌ Token invalide                | Token invalide             | 401 Unauthorized        |
| T-P4  | Création d'article     | ✅ Création valide par Admin     | Token admin + data         | 201 Created             |
| T-P5  | Création d'article     | ❌ Sans token                    | Pas de token               | 401 Unauthorized        |
| T-P6  | Création d'article     | ❌ Token user non admin          | Token user                 | 403 Forbidden           |
| T-P7  | Création d'article     | ❌ Données manquantes            | Token admin, data manquant | 400 Bad Request         |
| T-P8  | Modification d'article | ✅ Modification valide par Admin | Token admin, données       | 200 OK                  |
| T-P9  | Modification d'article | ❌ Sans token                    | Aucun token                | 401 Unauthorized        |
| T-P10 | Modification d'article | ❌ Token user                    | Token user                 | 403 Forbidden           |
| T-P11 | Modification d'article | ❌ Article inexistant            | ID inexistant              | 404 Not Found           |
| T-P12 | Suppression d'article  | ✅ Suppression valide par Admin  | Token admin                | 200 OK                  |
| T-P13 | Suppression d'article  | ❌ Sans token                    | Aucun token                | 401 Unauthorized        |
| T-P14 | Suppression d'article  | ❌ Token user                    | Token user                 | 403 Forbidden           |
| T-P15 | Suppression d'article  | ❌ Post inexistant               | ID inexistant              | 404 Not Found           |


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
