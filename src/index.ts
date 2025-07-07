import express from "express";
import dotenv from "dotenv";

import { sequelize } from './config/database.js';
import { Post } from './models/Post.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Blog fonctionne 🚀");
});

// Synchronisation BDD
sequelize.sync()
  .then(() => console.log('✅ Base de données synchronisée'))
  .catch((error) => console.error('❌ Erreur de synchronisation:', error));

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
