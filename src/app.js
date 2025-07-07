// src/app.js

import express from "express";
import cors from "cors";
import { errorHandler } from "./src/middlewares/index.js";
import routes from "./src/routes/index.js";

// Initialisation de l'application Express
const app = express();

// Middleware pour parser le JSON des requêtes entrantes
app.use(express.json());

// Middleware CORS pour accepter les requêtes cross-origin
app.use(cors());

// Définition des routes de l'application
app.use("/api", routes);

// Middleware global de gestion des erreurs
app.use(errorHandler);

export default app;
