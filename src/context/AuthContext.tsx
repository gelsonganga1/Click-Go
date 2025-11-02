"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type User = {
  id: number;
  full_name?: string;
  email: string;
  tel?: string;
  birth_date?: string;
  avatar_url?: string;
} | null;

type AuthContextType = {
  user: User;
  loading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  register: (data: {
    fullName: string;
    email: string;
    password: string;
    tel: string;
    birthDate?: string;
  }) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(false);

  const login = async ({ email, password }: { email: string; password: string }) => {
    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Erro no login");

      setUser(data.user);
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async ({
    fullName,
    email,
    password,
    tel,
    birthDate,
  }: {
    fullName: string;
    email: string;
    password: string;
    tel: string;
    birthDate?: string;
  }) => {
    setLoading(true);
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          password,
          tel,
          birthDate,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao criar conta");

      setUser(data.user); // opcional: logar automaticamente
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  return context;
};
