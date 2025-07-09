// ✅ src/pages/PostsPage.tsx (refactored)

import { useEffect, useState } from 'react';
import Header from '../components/Header';
import PostCard from '../components/PostCard';
import CreatePostForm from '../components/CreatePostForm';
import { useAuth } from '../contexts/AuthContext';
import { getPosts } from '../api/postsApi';

export default function PostsPage() {
  const { token } = useAuth();
  type Post = {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    author?: { username: string };
    // Ajoutez d'autres propriétés selon votre modèle de post
    [key: string]: any;
  };
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState('');

  const fetchPosts = async () => {
    try {
      const res = await getPosts(token);
      const sorted = res.data.sort(
        (a: { createdAt: string | number | Date; }, b: { createdAt: string | number | Date; }) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setPosts(sorted);
      setError('');
    } catch (err) {
      console.error(err);
      setError("Impossible de charger les articles.");
    }
  };

  useEffect(() => {
    if (token) {
      fetchPosts();
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-2xl mx-auto p-6">

        <CreatePostForm onPostCreated={fetchPosts} />

        <h2 className="text-xl font-bold my-4">Tous les articles</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {posts.map((post) => (
          <PostCard key={post.id} post={post} onPostUpdated={fetchPosts} />
        ))}

        {posts.length === 0 && !error && (
          <p className="text-gray-600 mt-4">Aucun article à afficher pour le moment.</p>
        )}

      </main>
    </div>
  );
}
