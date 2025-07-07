import { Post } from "../models/Post.js";

export const getAllPosts = async (req, res) => {
  const posts = await Post.findAll();
  res.json(posts);
};

export const getPostById = async (req, res) => {
  const post = await Post.findByPk(req.params.id);
  if (!post) return res.status(404).json({ error: "Article non trouvé" });
  res.json(post);
};

export const createPost = async (req, res) => {
  const { title, content } = req.body;
  const post = await Post.create({ title, content });
  res.status(201).json(post);
};

export const updatePost = async (req, res) => {
  const { title, content } = req.body;
  const post = await Post.findByPk(req.params.id);
  if (!post) return res.status(404).json({ error: "Article non trouvé" });
  post.title = title;
  post.content = content;
  await post.save();
  res.json(post);
};

export const deletePost = async (req, res) => {
  const post = await Post.findByPk(req.params.id);
  if (!post) return res.status(404).json({ error: "Article non trouvé" });
  await post.destroy();
  res.json({ message: "Article supprimé" });
};
