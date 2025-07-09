# 📄 Plan de Tests Complet - Articles (CRUD sécurisé)

---

## Plan global des tests avec ID (Articles)

| ID    | Fonction testée        | Cas de test                             | Données / Prérequis                  | Résultat attendu                |
| ----- | ---------------------- | --------------------------------------- | ------------------------------------ | ------------------------------- |
| T-P1  | Lecture des articles   | ✅ Avec token valide                    | Token user ou admin                  | 200 OK + Liste articles         |
| T-P2  | Lecture des articles   | ❌ Sans token                           | Aucun token                          | 401 Unauthorized                |
| T-P3  | Lecture des articles   | ❌ Token invalide                       | Token erroné                         | 401 Unauthorized                |
| T-P4  | Lecture des articles   | ✅ Contenu correct                      | Token valide                         | Liste contient au moins un post |
| T-P5  | Création d'article     | ✅ User/Admin peuvent créer             | Token valide + title + content       | 201 Created + Post ID           |
| T-P6  | Création d'article     | ❌ Données manquantes                   | Token valide + données incomplètes   | 400 Bad Request                 |
| T-P7  | Création d'article     | ❌ Sans token                           | Aucun token                          | 401 Unauthorized                |
| T-P8  | Modification d'article | ✅ Propriétaire/Admin peuvent modifier  | Token valide + owner/admin + données | 200 OK + Post modifié           |
| T-P9  | Modification d'article | ❌ Sans token                           | Aucun token                          | 401 Unauthorized                |
| T-P10 | Modification d'article | ❌ Ni propriétaire ni admin             | Token autre user                     | 403 Forbidden                   |
| T-P11 | Modification d'article | ❌ Post inexistant                      | Token valide + ID inexistant         | 404 Not Found                   |
| T-P12 | Suppression d'article  | ✅ Propriétaire/Admin peuvent supprimer | Token valide + owner/admin + ID post | 200 OK                          |
| T-P13 | Suppression d'article  | ❌ Sans token                           | Aucun token                          | 401 Unauthorized                |
| T-P14 | Suppression d'article  | ❌ Ni propriétaire ni admin             | Token autre user                     | 403 Forbidden                   |
| T-P15 | Suppression d'article  | ❌ Post inexistant                      | Token valide + ID inexistant         | 404 Not Found                   |

---

## 1️⃣ Lecture des articles (`GET /api/posts`)

| Cas de test             | Données envoyées / Prérequis | Résultat attendu            |
| ----------------------- | ---------------------------- | --------------------------- |
| ✅ Avec token valide    | Token user ou admin          | 200 OK + Liste articles     |
| ❌ Sans token           | Aucun token                  | 401 Unauthorized            |
| ❌ Token invalide       | Token erroné                 | 401 Unauthorized            |
| ✅ Liste contient posts | Token valide                 | Tableau d'articles non vide |

---

## 2️⃣ Création d'article (`POST /api/posts`)

| Cas de test           | Données envoyées           | Résultat attendu |
| --------------------- | -------------------------- | ---------------- |
| ✅ Création valide    | Token + title + content    | 201 Created + ID |
| ❌ Données manquantes | Token + données manquantes | 400 Bad Request  |
| ❌ Sans token         | Aucun token                | 401 Unauthorized |

---

## 3️⃣ Modification d'article (`PUT /api/posts/:id`)

| Cas de test                 | Données envoyées / Prérequis | Résultat attendu    |
| --------------------------- | ---------------------------- | ------------------- |
| ✅ Propriétaire/Admin       | Token owner/admin + données  | 200 OK + post modif |
| ❌ Sans token               | Aucun token                  | 401 Unauthorized    |
| ❌ Ni propriétaire ni admin | Token d’un autre user        | 403 Forbidden       |
| ❌ Post inexistant          | Token valide + ID inexistant | 404 Not Found       |

---

## 4️⃣ Suppression d'article (`DELETE /api/posts/:id`)

| Cas de test                 | Données envoyées / Prérequis | Résultat attendu |
| --------------------------- | ---------------------------- | ---------------- |
| ✅ Propriétaire/Admin       | Token owner/admin + ID post  | 200 OK           |
| ❌ Sans token               | Aucun token                  | 401 Unauthorized |
| ❌ Ni propriétaire ni admin | Token autre user             | 403 Forbidden    |
| ❌ Post inexistant          | Token valide + ID inexistant | 404 Not Found    |

---
