// src/controllers/postController.js

import { Post, User } from "../models/index.js";

/******************************
 * Récupérer tous les articles
 ******************************/
export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      include: {
        model: User,
        as: "author",
        attributes: ["username"],
      },
      order: [["createdAt", "DESC"]],
    });
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

/******************************
 * Récupérer un article par ID
 ******************************/
export const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: {
        model: User,
        as: "author",
        attributes: ["username"],
      },
    });

    if (!post) {
      return res.status(404).json({ error: "Article non trouvé" });
    }

    res.json(post);
  } catch (err) {
    next(err);
  }
};

/******************************
 * Créer un nouvel article (user & admin)
 ******************************/
export const createPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "Champs manquants" });
    }

    const newPost = await Post.create({
      title,
      content,
      userId: req.user.id,
    });

    res.status(201).json(newPost);
  } catch (err) {
    next(err);
  }
};

/******************************
 * Mettre à jour un article (user pour le sien, admin pour tout)
 ******************************/
export const updatePost = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    const post = await Post.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Article non trouvé" });
    }

    const isAdmin = req.user.roleId === 1;
    const isOwner = req.user.id === post.userId;

    if (!isAdmin && !isOwner) {
      return res.status(403).json({ error: "Non autorisé à modifier ce post" });
    }

    if (!title || !content) {
      return res.status(400).json({ error: "Champs manquants" });
    }

    post.title = title;
    post.content = content;
    await post.save();

    res.json({ message: "Post mis à jour", post });
  } catch (err) {
    next(err);
  }
};

/******************************
 * Supprimer un article (user pour le sien, admin pour tout)
 ******************************/
export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.params.id);

    if (!post) {
      return res.status(404).json({ error: "Article non trouvé" });
    }

    const isAdmin = req.user.roleId === 1;
    const isOwner = req.user.id === post.userId;

    if (!isAdmin && !isOwner) {
      return res
        .status(403)
        .json({ error: "Non autorisé à supprimer ce post" });
    }

    await post.destroy();
    res.json({ message: "Article supprimé" });
  } catch (err) {
    next(err);
  }
};
