// src/context/AuthContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type User = {
  id: number;
  full_name?: string;
  email: string;
  avatar_url?: string;
} | null;

type AuthContextType = {
  user: User;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);

  const login = async ({ email, password }: { email: string; password: string }) => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro no login");

      // Definir o usuário
      if (data.tipo === "usuario") {
        setUser(data.user);
      } else if (data.tipo === "instituicao") {
        setUser(data.instituicao);
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  return context;
};
