// src/middlewares/errorHandler.js

// Middleware global pour capturer et gérer toutes les erreurs
export const errorHandler = (err, req, res, next) => {
  console.error("❌ Erreur attrapée par le middleware :", err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Erreur serveur";

  res.status(statusCode).json({
    error: message,
  });
};
