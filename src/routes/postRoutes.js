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
router.get("/", authenticateToken, getAllPosts);

// Route pour récupérer un article par ID (authentification requise)
router.get("/:id", authenticateToken, getPostById);

// Route pour créer un nouvel article (admin uniquement + validation des données)
router.post(
  "/",
  authenticateToken,
  authorizeRoles("admin"),
  validatePost,
  createPost
);

// Route pour mettre à jour un article existant (admin uniquement + validation des données)
router.put(
  "/:id",
  authenticateToken,
  authorizeRoles("admin"),
  validatePost,
  updatePost
);

// Route pour supprimer un article (admin uniquement)
router.delete("/:id", authenticateToken, authorizeRoles("admin"), deletePost);

export default router;
