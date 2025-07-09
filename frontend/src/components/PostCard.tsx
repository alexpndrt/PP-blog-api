// ✅ src/components/PostCard.tsx (avec modale rapide de modification + affichage auteur)

import { useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

interface PostCardProps {
  post: {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    author?: {
      username: string;
    };
  };
}

export default function PostCard({ post }: PostCardProps) {
  const { username } = useAuth();
  const isAdmin = username === "admin";

  const [showEdit, setShowEdit] = useState(false);
  const [newTitle, setNewTitle] = useState(post.title);
  const [newContent, setNewContent] = useState(post.content);

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:3000/api/posts/${post.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      window.location.reload();
    } catch (err) {
      console.error("Erreur suppression:", err);
    }
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `http://localhost:3000/api/posts/${post.id}`,
        {
          title: newTitle,
          content: newContent,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setShowEdit(false);
      window.location.reload();
    } catch (err) {
      console.error("Erreur modification:", err);
    }
  };

  return (
    <div className="bg-white rounded shadow p-4">
      <h3 className="font-bold text-lg mb-1">{post.title}</h3>
      <p className="text-sm text-gray-500 mb-2">
        Auteur : {post.author?.username || "Inconnu"}
      </p>

      <p className="text-gray-700 mb-2">{post.content}</p>
      <p className="text-xs text-gray-400">
        {new Date(post.createdAt).toLocaleString()}
      </p>

      {isAdmin && (
        <div className="mt-3 flex gap-4">
          <button
            onClick={() => setShowEdit(true)}
            className="text-blue-600 hover:underline"
          >
            Modifier
          </button>
          <button
            onClick={handleDelete}
            className="text-red-600 hover:underline"
          >
            Supprimer
          </button>
        </div>
      )}

      {/* ✅ Modale rapide */}
      {showEdit && (
        <div className="mt-4 border-t pt-4">
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

          <button
            onClick={handleUpdate}
            className="bg-green-600 text-white px-4 py-2 rounded mr-2"
          >
            Valider
          </button>
          <button
            onClick={() => setShowEdit(false)}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Annuler
          </button>
        </div>
      )}
    </div>
  );
}
