// ✅ src/components/CreatePostForm.tsx (refactored avec types centralisés)

import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../api/postsApi';
import type { CreatePostData, CreatePostFormProps } from '../types';

export default function CreatePostForm({ onPostCreated }: CreatePostFormProps) {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState<CreatePostData['title']>('');
  const [content, setContent] = useState<CreatePostData['content']>('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await createPost(token, { title, content });

      if (res.status === 201) {
        setSuccess('Article créé avec succès.');
        setTitle('');
        setContent('');
        if (onPostCreated) onPostCreated();
        navigate('/posts');
      }

    } catch (err) {
      console.error(err);
      setError("Impossible de créer l'article. Vérifiez les champs ou votre connexion.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Créer un nouvel article</h2>

      {success && <p className="text-green-600 mb-2">{success}</p>}
      {error && <p className="text-red-600 mb-2">{error}</p>}

      <div className="mb-4">
        <label className="block mb-1 font-medium">Titre</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded w-full p-2"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Contenu</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border rounded w-full p-2"
          rows={5}
          required
        ></textarea>
      </div>

      <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
        Publier
      </button>
    </form>
  );
}
