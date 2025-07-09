// ✅ src/pages/PostsPage.tsx (mise à jour pour fil vertical et tri)

import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import PostCard from "../components/PostCard";
import { useAuth } from "../contexts/AuthContext";

interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/posts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // ✅ Trie les posts par date décroissante côté client (sécurité)
        const sortedPosts = response.data.sort(
          (a: Post, b: Post) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setPosts(sortedPosts);
      } catch (error) {
        console.error("Erreur lors du chargement des posts:", error);
      }
    };

    fetchPosts();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-xl mx-auto p-4 space-y-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </main>
    </div>
  );
}
