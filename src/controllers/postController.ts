import { Request, Response } from 'express';
import { Post } from '../models/Post.js';

// 🔹 GET /api/posts — Liste tous les articles
export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// 🔹 GET /api/posts/:id — Récupérer un article par ID
export const getPostById = async (req: Request, res: Response) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ error: 'Article non trouvé' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// 🔹 POST /api/posts — Créer un nouvel article
export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    const newPost = await Post.create({ title, content });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// 🔹 PUT /api/posts/:id — Mettre à jour un article
export const updatePost = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ error: 'Article non trouvé' });

    post.title = title;
    post.content = content;
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// 🔹 DELETE /api/posts/:id — Supprimer un article
export const deletePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ error: 'Article non trouvé' });

    await post.destroy();
    res.json({ message: 'Article supprimé' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
