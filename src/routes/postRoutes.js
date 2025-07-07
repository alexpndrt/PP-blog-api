import { Router } from "express";
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postController.js";
import {
  authenticateToken,
  authorizeRoles,
} from "../middlewares/authMiddleware.js";
import { validatePost } from "../middlewares/postValidator.js"; // ✅ On réimporte la validation

const router = Router();

// 🔓 Lire les posts ➔ Authentification simple
router.get("/", authenticateToken, getAllPosts);
router.get("/:id", authenticateToken, getPostById);

// 🔐 Créer, modifier, supprimer ➔ Auth + Rôle admin + Validation des entrées
router.post(
  "/",
  authenticateToken,
  authorizeRoles("admin"),
  validatePost,
  createPost
);
router.put(
  "/:id",
  authenticateToken,
  authorizeRoles("admin"),
  validatePost,
  updatePost
);
router.delete("/:id", authenticateToken, authorizeRoles("admin"), deletePost);

export default router;
