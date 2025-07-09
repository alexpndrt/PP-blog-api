// 🔗 Header.tsx ➔ Barre de navigation en haut de la page

import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 shadow bg-white">
      <h1 className="text-xl font-bold">Mon Blog</h1>
      <nav className="space-x-4">
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
