// ✅ src/pages/PostsPage.tsx (corrigé pour reset posts à la déconnexion)

import { useEffect, useState } from "react";
import Header from "../components/Header";
import PostCard from "../components/PostCard";
import CreatePostForm from "../components/CreatePostForm";
import { useAuth } from "../contexts/AuthContext";
import { getPosts } from "../api/postsApi";
import type { Post } from "../types";

export default function PostsPage() {
  const { token, username } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState("");

  const fetchPosts = async () => {
    try {
      const res = await getPosts(token);
      const sorted = res.data.sort(
        (a: Post, b: Post) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setPosts(sorted);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Impossible de charger les articles.");
    }
  };

  useEffect(() => {
    if (token) {
      fetchPosts();
    } else {
      setPosts([]); // ✅ Vide la liste dès qu'il n'y a plus de token ou de user
    }
  }, [token, username]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-2xl mx-auto p-6">
        {token && <CreatePostForm onPostCreated={fetchPosts} />}

        <h2 className="text-xl font-bold my-4">Tous les articles</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {posts.map((post) => (
          <PostCard key={post.id} post={post} onPostUpdated={fetchPosts} />
        ))}

        {posts.length === 0 && !error && (
          <p className="text-gray-600 mt-4">
            Aucun article à afficher pour le moment.
          </p>
        )}
      </main>
    </div>
  );
}
