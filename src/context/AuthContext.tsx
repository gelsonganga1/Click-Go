"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type User = {
  email: string;
} | null;

type AuthContextType = {
  user: User;
  loading: boolean;
  login: (email: string, password: string) => void;
  register: (email: string, password: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  // Simula persistência do usuário
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login falso (simulado)
  const login = (email: string, password: string) => {
    const fakeUser = { email };
    localStorage.setItem("user", JSON.stringify(fakeUser));
    setUser(fakeUser);
  };

  // Cadastro falso (simulado)
  const register = (email: string, password: string) => {
    const fakeUser = { email };
    localStorage.setItem("user", JSON.stringify(fakeUser));
    setUser(fakeUser);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
