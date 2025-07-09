// ✅ src/components/Header.tsx (centrage corrigé)

import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const { username, logout } = useAuth();
  const navigate = useNavigate();

  const isConnected = !!username;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="relative flex items-center justify-between p-4 shadow bg-white">
      <Link to="/" className="text-xl font-bold hover:text-blue-600">
        Mon Blog
      </Link>

      {isConnected && (
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <span className="font-bold text-gray-700">
            Bienvenue : {username}
          </span>
        </div>
      )}

      <nav className="space-x-4 flex items-center">
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
          <button
            onClick={handleLogout}
            className="text-red-600 hover:underline"
          >
            Déconnexion
          </button>
        )}
      </nav>
    </header>
  );
}
