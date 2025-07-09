// ✅ src/components/PostCard.tsx (refactored avec types centralisés)

import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { updatePost, deletePost } from '../api/postsApi';
import type { PostCardProps, UpdatePostData } from '../types';

export default function PostCard({ post, onPostUpdated }: PostCardProps) {
  const { username, token } = useAuth();

  const isOwner = username === post.author?.username;
  const isAdmin = username === 'admin';
  const canEditOrDelete = isOwner || isAdmin;

  const [showEdit, setShowEdit] = useState(false);
  const [newTitle, setNewTitle] = useState<UpdatePostData['title']>(post.title);
  const [newContent, setNewContent] = useState<UpdatePostData['content']>(post.content);
  const [error, setError] = useState('');

  const handleDelete = async () => {
    try {
      await deletePost(token, post.id);
      if (onPostUpdated) onPostUpdated();
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la suppression de l'article.");
    }
  };

  const handleUpdate = async () => {
    try {
      await updatePost(token, post.id, { title: newTitle, content: newContent });
      setShowEdit(false);
      if (onPostUpdated) onPostUpdated();
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la mise à jour de l'article.");
    }
  };

  return (
    <div className="bg-white rounded shadow p-4 mb-4">
      <h3 className="font-bold text-lg mb-1">{post.title}</h3>
      <p className="text-sm text-gray-500 mb-2">Auteur : {post.author?.username || 'Inconnu'}</p>
      <p className="text-gray-700 mb-2">{post.content}</p>
      <p className="text-xs text-gray-400">{new Date(post.createdAt).toLocaleString()}</p>

      {canEditOrDelete && (
        <div className="mt-3 flex gap-4">
          <button onClick={() => setShowEdit(true)} className="text-blue-600 hover:underline">Modifier</button>
          <button onClick={handleDelete} className="text-red-600 hover:underline">Supprimer</button>
        </div>
      )}

      {showEdit && (
        <div className="mt-4 border-t pt-4">
          {error && <p className="text-red-500 mb-2">{error}</p>}

          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="border p-2 rounded w-full mb-2"
          />

          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            className="border p-2 rounded w-full mb-2"
          />

          <button onClick={handleUpdate} className="bg-green-600 text-white px-4 py-2 rounded mr-2">Valider</button>
          <button onClick={() => setShowEdit(false)} className="bg-gray-400 text-white px-4 py-2 rounded">Annuler</button>
        </div>
      )}
    </div>
  );
}
