// src/middlewares/postValidator.js

import { body, validationResult } from "express-validator";

// Middleware de validation pour la création et la modification d'articles
export const validatePost = [
  // Vérifie que le titre n'est pas vide et ne dépasse pas 255 caractères
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Le titre est obligatoire")
    .isLength({ max: 255 })
    .withMessage("Le titre ne doit pas dépasser 255 caractères"),

  // Vérifie que le contenu n'est pas vide
  body("content").trim().notEmpty().withMessage("Le contenu est obligatoire"),

  // Vérifie s'il y a des erreurs de validation et les retourne si besoin
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  },
];
