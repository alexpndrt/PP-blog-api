// ✅ src/components/Header.tsx (mis à jour avec message "Bienvenue : username" centré)

import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function Header() {
  const { username, logout } = useAuth();
  const isConnected = !!username;

  return (
    <header className="flex items-center justify-between p-4 shadow bg-white">
      {/* ➔ Colonne gauche */}
      <div className="w-1/3">
        {/* 🏠 Logo Blog ➔ clique pour revenir à l'accueil */}
        <Link to="/" className="text-xl font-bold hover:text-blue-600">
          Mon Blog
        </Link>
      </div>

      {/* 👋 Message Bienvenue centré si connecté */}
      {/* ➔ Colonne centre */}
      <div className="w-1/3 text-center">
        {isConnected && (
          <span className="font-bold text-gray-700">
            Bienvenue : {username}
          </span>
        )}
      </div>

      {/* ➔ Colonne droite */}
      <nav className="w-1/3 flex justify-end items-center space-x-4">
        {isConnected && (
          <Link to="/posts" className="text-blue-600 hover:underline">
            Mes Articles
          </Link>
        )}
        <Link to="/" className="text-gray-600 hover:underline">
          Accueil
        </Link>
        {!isConnected ? (
          <>
            <Link to="/login" className="text-blue-600 hover:underline">
              Connexion
            </Link>
            <Link to="/register" className="text-blue-600 hover:underline">
              Inscription
            </Link>
          </>
        ) : (
          <button onClick={logout} className="text-red-600 hover:underline">
            Déconnexion
          </button>
        )}
      </nav>
    </header>
  );
}
