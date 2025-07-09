// src/routes/index.js

import { Router } from "express";
import authRoutes from "./authRoutes.js";
import postRoutes from "./postRoutes.js";
import { home } from "../controllers/homeController.js";

// Création d'un routeur principal pour regrouper les routes
const router = Router();

// ✅ Route de bienvenue
router.get("/", home);

// Regroupement des routes sous le préfixe /api
router.use("/posts", postRoutes);
router.use("/", authRoutes);

export default router;
