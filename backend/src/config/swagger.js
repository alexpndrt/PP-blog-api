// src/config/swagger.js

import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Définition générale de l'API Swagger
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Blog API (NodeJs - Express - PostgreSQL)",
    version: "1.0.0",
    description:
      "API REST sécurisée pour la gestion d’un blog (users, posts, roles)",
  },
  servers: [
    {
      url: "http://localhost:3000/api", // Ici le préfixe de tes routes
    },
    {
      url: "https://pp-blog-api.onrender.com//api", // Ici le préfixe de tes routes
    },
  ],
  components: {
    securitySchemes: {
      // On définit un "schéma de sécurité" que Swagger va utiliser
      bearerAuth: {
        // C'est le nom que tu donnes à ce schéma (tu l'appelles comme tu veux mais c'est ce nom qu'il faudra réutiliser dans les routes)
        type: "http", // Swagger supporte plusieurs types (http, apiKey, oauth2). Ici tu dis que tu veux un token HTTP standard.
        scheme: "bearer", // Tu précises que le schéma est de type "Bearer" ➔ c'est ce qui déclenche l'affichage du champ token dans Swagger UI.
        bearerFormat: "JWT", // Tu ajoutes une indication que le token est un JWT ➔ purement informatif, Swagger ne le valide pas.
      },
    },
  },
};

// Options pour Swagger JSDoc ➔ il va scanner les fichiers de routes
const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.js"], // Les routes où on écrira nos commentaires Swagger
};

// Génération de la spec Swagger
const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec, swaggerUi };
