// src/middlewares/index.js

// Importation et exportation centralisée des middlewares

export { authenticateToken, authorizeRoles } from "./authMiddleware.js";
export { validatePost } from "./postValidator.js";
export { errorHandler } from "./errorHandler.js";
