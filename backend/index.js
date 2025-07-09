// index.js (à la racine du projet)

import app from "./src/app.js";
import { sequelize } from "./src/models/index.js";
import dotenv from "dotenv";

// Chargement des variables d'environnement depuis le fichier .env
dotenv.config();

// Définition du port (par défaut 3000 si non défini dans .env)
const PORT = process.env.PORT || 3000;

// Synchronisation des modèles Sequelize avec la base de données
sequelize
  .sync() //{ force: true })
  .then(() => {
    console.log("✅ Base de données synchronisée");

    // Démarrage du serveur Express après synchronisation
    app.listen(PORT, () => {
      console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error(
      "❌ Erreur de synchronisation avec la base de données :",
      error
    );
  });
