// src/routes/authRoutes.js

import { Router } from "express";
import { register, login } from "../controllers/index.js";

const router = Router();

// Route pour l'inscription d'un nouvel utilisateur
router.post("/register", register);

// Route pour la connexion et l'obtention d'un token JWT
router.post("/login", login);

export default router;
