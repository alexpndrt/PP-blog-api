import { Post } from "../models/Post.js";

// GET /api/posts ➔ Récupérer tous les articles
export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

// GET /api/posts/:id ➔ Récupérer un article par ID
export const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      const error = new Error("Article non trouvé");
      error.statusCode = 404;
      throw error;
    }
    res.json(post);
  } catch (err) {
    next(err);
  }
};

// POST /api/posts ➔ Créer un nouvel article
export const createPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const newPost = await Post.create({ title, content });
    res.status(201).json(newPost);
  } catch (err) {
    next(err);
  }
};

// PUT /api/posts/:id ➔ Mettre à jour un article
export const updatePost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      const error = new Error("Article non trouvé");
      error.statusCode = 404;
      throw error;
    }

    post.title = title;
    post.content = content;
    await post.save();

    res.json(post);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/posts/:id ➔ Supprimer un article
export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      const error = new Error("Article non trouvé");
      error.statusCode = 404;
      throw error;
    }

    await post.destroy();
    res.json({ message: "Article supprimé" });
  } catch (err) {
    next(err);
  }
};
