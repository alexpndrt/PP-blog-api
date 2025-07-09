// ✅ src/contexts/AuthContext.tsx (avec redirection dans logout)

import { createContext, useContext, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { type AuthContextType } from "../types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [username, setUsername] = useState<string | null>(
    localStorage.getItem("username")
  );

  const login = (newToken: string, newUsername: string) => {
    setToken(newToken);
    setUsername(newUsername);
    localStorage.setItem("token", newToken);
    localStorage.setItem("username", newUsername);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setToken(null);
    setUsername(null);
    navigate("/"); // ✅ Redirection ici fonctionnelle maintenant
  };

  return (
    <AuthContext.Provider value={{ token, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
