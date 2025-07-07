// src/controllers/index.js

// Importation et exportation centralisée des contrôleurs

export { register, login } from "./authController.js";
export {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "./postController.js";
