// src/routes/postRoutes.js

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
  authorizeRoles,
  validatePost,
} from "../middlewares/index.js";

const router = Router();

// Route pour récupérer tous les articles (authentification requise)
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

// Route pour récupérer un article par ID (authentification requise)
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

// Route pour créer un nouvel article (admin uniquement + validation des données)
/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Créer un nouvel article (Admin uniquement)
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
 *       403:
 *         description: Accès interdit
 */

router.post(
  "/",
  authenticateToken,
  authorizeRoles(1), // 1 correspond au rôle admin
  validatePost,
  createPost
);

// Route pour mettre à jour un article existant (admin uniquement + validation des données)
/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Mettre à jour un article (Admin uniquement)
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
 *       404:
 *         description: Article non trouvé
 */

router.put(
  "/:id",
  authenticateToken,
  authorizeRoles(1), // 1 correspond au rôle admin
  validatePost,
  updatePost
);

// Route pour supprimer un article (admin uniquement)
/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Supprimer un article (Admin uniquement)
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
 *       404:
 *         description: Article non trouvé
 */

router.delete("/:id", authenticateToken, authorizeRoles(1), deletePost);

export default router;
