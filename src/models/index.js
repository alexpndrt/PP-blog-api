// src/models/index.js

import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import { User } from "./User.js";
import { Post } from "./Post.js";

// Chargement des variables d'environnement
dotenv.config();

// Création de l'instance Sequelize avec les paramètres de connexion
export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: process.env.DB_PORT,
    logging: false, // Désactive les logs SQL pour un affichage plus propre
  }
);

// Export des modèles pour un accès centralisé
export { User, Post };
