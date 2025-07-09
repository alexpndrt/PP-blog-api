// ✅ src/components/PostCard.tsx
// ➔ Composant d'affichage individuel d'un article (Post)

interface PostCardProps {
  title: string;
  content: string;
}

export default function PostCard({ title, content }: PostCardProps) {
  return (
    <div className="bg-white shadow rounded p-4">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-700">{content}</p>
    </div>
  );
}