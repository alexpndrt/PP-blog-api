// 🔗 Header.tsx ➔ Barre de navigation en haut de la page

import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 shadow bg-white">
      {/* ✅ Clique sur le titre pour revenir à l'accueil */}
      <Link to="/" className="text-xl font-bold hover:text-blue-600">
        Mon Blog
      </Link>

      <nav className="space-x-4">
        {/* ✅ Lien vers l'accueil accessible depuis n'importe quelle page */}
        <Link to="/" className="text-gray-600 hover:underline">
          Accueil
        </Link>

        <Link to="/login" className="text-blue-600 hover:underline">
          Connexion
        </Link>
        <Link to="/register" className="text-blue-600 hover:underline">
          Inscription
        </Link>
      </nav>
    </header>
  );
}
