// src/controllers/postController.js

import { Post, User } from "../models/index.js";

// Récupérer tous les articles
export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      include: {
        model: User,
        as: 'author',   // ✅ doit correspondre au alias défini dans Post.belongsTo
        attributes: ["username"], // On ne récupère que le username de l'auteur
      },
      order: [["createdAt", "DESC"]], // Tri du plus récent au plus ancien
    });
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

// Récupérer un article par son ID
export const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.params.id);

    if (!post) {
      return res.status(404).json({ error: "Article non trouvé" });
    }

    res.json(post);
  } catch (err) {
    next(err);
  }
};

// Créer un nouvel article (admin uniquement)
export const createPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const newPost = await Post.create({
      title,
      content,
      userId: req.user.id, // 🔑 Associe le post à l'utilisateur connecté
    });
    res.status(201).json(newPost);
  } catch (err) {
    next(err);
  }
};

// Mettre à jour un article existant (admin uniquement)
export const updatePost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const post = await Post.findByPk(req.params.id);

    if (!post) {
      return res.status(404).json({ error: "Article non trouvé" });
    }

    post.title = title;
    post.content = content;
    await post.save();

    res.json(post);
  } catch (err) {
    next(err);
  }
};

// Supprimer un article (admin uniquement)
export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.params.id);

    if (!post) {
      return res.status(404).json({ error: "Article non trouvé" });
    }

    await post.destroy();
    res.json({ message: "Article supprimé" });
  } catch (err) {
    next(err);
  }
};
