// src/routes/index.js

import authRoutes from "./authRoutes.js";
import postRoutes from "./postRoutes.js";
import { Router } from "express";

// Création d'un routeur principal pour regrouper les routes
const router = Router();

// Regroupement des routes sous le préfixe /api
router.use("/posts", postRoutes);
router.use("/", authRoutes);

export default router;
