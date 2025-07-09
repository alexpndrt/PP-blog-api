// ✅ src/routes/postRoutes.js (CRUD complet corrigé avec Swagger)

import { Router } from "express";
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/index.js";
import {
  authenticateToken,
  validatePost,
} from "../middlewares/index.js";

const router = Router();

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Récupérer tous les articles
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des articles
 *       401:
 *         description: Token manquant ou invalide
 */
router.get("/", authenticateToken, getAllPosts);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Récupérer un article par ID
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'article
 *     responses:
 *       200:
 *         description: Article trouvé
 *       404:
 *         description: Article non trouvé
 */
router.get("/:id", authenticateToken, getPostById);

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Créer un nouvel article (User ou Admin)
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *                 example: Mon premier article
 *               content:
 *                 type: string
 *                 example: Contenu de l'article...
 *     responses:
 *       201:
 *         description: Article créé
 *       400:
 *         description: Erreur de validation
 */
router.post("/", authenticateToken, validatePost, createPost);

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Mettre à jour un article (User propriétaire ou Admin)
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'article
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *                 example: Titre mis à jour
 *               content:
 *                 type: string
 *                 example: Contenu mis à jour
 *     responses:
 *       200:
 *         description: Article mis à jour
 *       403:
 *         description: Non autorisé
 *       404:
 *         description: Article non trouvé
 */
router.put("/:id", authenticateToken, validatePost, updatePost);

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Supprimer un article (User propriétaire ou Admin)
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'article
 *     responses:
 *       200:
 *         description: Article supprimé
 *       403:
 *         description: Non autorisé
 *       404:
 *         description: Article non trouvé
 */
router.delete("/:id", authenticateToken, deletePost);

export default router;
