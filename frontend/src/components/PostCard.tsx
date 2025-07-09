// ✅ src/components/PostCard.tsx (ajout boutons admin)
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

interface PostCardProps {
  post: {
    id: number;
    title: string;
    content: string;
    createdAt: string;
  };
}

export default function PostCard({ post }: PostCardProps) {
  const { username } = useAuth();
  const isAdmin = username === "admin"; // 💡 Remplacer par un vrai contrôle de rôle plus tard

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:3000/api/posts/${post.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      window.location.reload(); // 🚨 Simple mais efficace pour rafraîchir
    } catch (err) {
      console.error("Erreur suppression:", err);
    }
  };

  return (
    <div className="bg-white rounded shadow p-4">
      <h3 className="font-bold text-lg mb-2">{post.title}</h3>
      <p className="text-gray-700 mb-2">{post.content}</p>
      <p className="text-sm text-gray-500">
        Publié le: {new Date(post.createdAt).toLocaleString()}
      </p>

      {isAdmin && (
        <div className="mt-3 flex gap-4">
          <button className="text-blue-600 hover:underline">Modifier</button>
          <button
            onClick={handleDelete}
            className="text-red-600 hover:underline"
          >
            Supprimer
          </button>
        </div>
      )}
    </div>
  );
}
