// src/controllers/homeController.js

// Contrôleur pour la page d'accueil
export const home = (req, res) => {
  res.status(200).json({
    message: "Bienvenue sur mon API d'entrainement Blog 🚀. Consultez /api-docs pour la documentation complète."
  });
};
