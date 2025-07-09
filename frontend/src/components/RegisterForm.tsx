// ✅ src/components/RegisterForm.tsx (refactored avec types centralisés)

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/authApi';
import type { RegisterRequest } from '../types';

export default function RegisterForm() {
  const [username, setUsername] = useState<RegisterRequest['username']>('');
  const [password, setPassword] = useState<RegisterRequest['password']>('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await registerUser({ username, password });
      setSuccess("Inscription réussie. Vous pouvez vous connecter.");
      setUsername('');
      setPassword('');
      setTimeout(() => navigate('/login'), 1500);

    } catch (err: any) {
      console.error(err);
      setError("Erreur lors de l'inscription. Veuillez réessayer.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Inscription</h2>

      {success && <p className="text-green-600 mb-3">{success}</p>}
      {error && <p className="text-red-600 mb-3">{error}</p>}

      <div className="mb-4">
        <label className="block mb-1 font-medium">Nom d'utilisateur</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Mot de passe</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
      </div>

      <button type="submit" className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded">
        S'inscrire
      </button>
    </form>
  );
}
