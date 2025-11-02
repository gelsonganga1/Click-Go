"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type User = {
  id: number;
  full_name: string;
  email: string;
  tel: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (full_name: string, email: string, password: string, tel: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Erro ao logar");
    setUser(data.user);
  };

  const register = async (full_name: string, email: string, password: string, tel: string) => {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ full_name, email, password, tel }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Erro ao registrar");
  };

  return <AuthContext.Provider value={{ user, login, register }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return context;
};
