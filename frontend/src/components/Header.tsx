// ✅ src/components/Header.tsx (modifié pour afficher Bienvenue)

import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
  const { username, logout } = useAuth();

  return (
    <header className="flex justify-between items-center p-4 shadow bg-white">
      <Link to="/" className="text-xl font-bold hover:text-blue-600">
        Mon Blog
      </Link>

      <nav className="space-x-4 flex items-center">
        {username && <span className="text-gray-700">Bienvenue : {username}</span>}

        <Link to="/" className="text-gray-600 hover:underline">Accueil</Link>

        {!username ? (
          <>
            <Link to="/login" className="text-blue-600 hover:underline">Connexion</Link>
            <Link to="/register" className="text-blue-600 hover:underline">Inscription</Link>
          </>
        ) : (
          <button onClick={logout} className="text-red-600 hover:underline">Déconnexion</button>
        )}
      </nav>
    </header>
  );
}

