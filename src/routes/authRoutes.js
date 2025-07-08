// src/routes/authRoutes.js

import { Router } from "express";
import { register, login } from "../controllers/index.js";

const router = Router();

// Route pour l'inscription d'un nouvel utilisateur

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Inscription d'un nouvel utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *               - roleId
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 example: MonSuperMotDePasse123!
 *               roleId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Utilisateur créé
 *       400:
 *         description: Erreur de validation
 */

router.post("/register", register);

// Route pour la connexion et l'obtention d'un token JWT

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Connexion et récupération du token JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: "johndoe"
 *               password:
 *                 type: string
 *                 example: "MonSuperMotDePasse123!"
 *     responses:
 *       200:
 *         description: Authentification réussie
 *       400:
 *         description: Erreur de validation
 *       401:
 *         description: Identifiants invalides
 */

router.post("/login", login);

export default router;
