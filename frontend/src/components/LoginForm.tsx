// ✅ src/components/LoginForm.tsx (refactored avec types)

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { loginUser } from "../api/authApi";

interface LoginFormProps {
  // Ajout possible d'extensions futures
}

interface LoginResponse {
  token: string;
}

export default function LoginForm({}: LoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const res = await loginUser({ username, password });
      const data = res.data as LoginResponse;

      login(data.token, username);
      navigate("/posts");
    } catch (err: any) {
      console.error(err);
      setError("Identifiants invalides ou serveur indisponible.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow rounded p-6 max-w-md mx-auto"
    >
      <h2 className="text-xl font-bold mb-4">Connexion</h2>

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

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
      >
        Se connecter
      </button>
    </form>
  );
}
