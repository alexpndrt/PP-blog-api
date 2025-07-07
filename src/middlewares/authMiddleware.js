// src/middlewares/authMiddleware.js

import jwt from "jsonwebtoken";

// Middleware pour vérifier la présence et la validité du token JWT
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Vérifie la présence du header Authorization
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token manquant ou invalide" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Vérifie et décode le token JWT
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user; // Stocke l'utilisateur décodé dans la requête
    next();
  } catch (err) {
    res.status(403).json({ error: "Token invalide ou expiré" });
  }
};

// Middleware pour vérifier le rôle de l'utilisateur
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.roleId)) {
      return res
        .status(403)
        .json({ error: "Accès interdit : rôle insuffisant" });
    }
    next();
  };
};
