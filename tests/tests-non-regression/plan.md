# 📄 Plan de Tests - Cycle CRUD Complet (Non-Régression)

---

## Plan de tests complet avec ID

| ID    | Fonction testée        | Cas de test                      | Données envoyées / Prérequis             | Résultat attendu      |
| ----- | ---------------------- | -------------------------------- | ---------------------------------------- | --------------------- |
| T-CR1 | Création d'article     | ✅ Création valide par Admin     | Token admin + title + content            | 201 Created + Post ID |
| T-CR2 | Lecture d'article      | ✅ Lecture du post créé          | Token admin/user + postId valide         | 200 OK + post complet |
| T-CR3 | Modification d'article | ✅ Modification valide par Admin | Token admin + postId + nouvelles données | 200 OK + post modifié |
| T-CR4 | Suppression d'article  | ✅ Suppression valide par Admin  | Token admin + postId valide              | 200 OK                |

---

## 1️⃣ Cycle complet (`POST /api/posts` ➔ `GET` ➔ `PUT` ➔ `DELETE`)

| Étape           | Cas de test                   | Résultat attendu           |
| --------------- | ----------------------------- | -------------------------- |
| ✅ Création     | Création avec données valides | 201 Created + Post ID      |
| ✅ Lecture      | Récupérer le post créé        | 200 OK + données complètes |
| ✅ Modification | Modifier les données du post  | 200 OK + post modifié      |
| ✅ Suppression  | Supprimer le post créé        | 200 OK + confirmation      |

---
