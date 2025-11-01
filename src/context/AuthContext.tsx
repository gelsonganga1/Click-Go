"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

// 🔹 Tipo de usuário
type User = {
  id: string;
  name?: string;
  email: string;
  tipo: "usuario" | "instituicao";
  avatar?: string | null;
} | null;

// 🔹 Tipo do contexto
type AuthContextType = {
  user: User;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => void;
  logout: () => void;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 🔹 Carrega usuário salvo no localStorage (mantém login entre recarregamentos)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  // 🔸 Login REAL — chama a rota /api/login
  const login = async (email: string, password: string) => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Erro ao autenticar");
        return;
      }

      let loggedUser: User;

      if (data.tipo === "usuario") {
        loggedUser = {
          id: data.user.id,
          email: data.user.email,
          tipo: "usuario",
          name: data.user.name || "Usuário",
        };
        router.push("/dashboard");
      } else {
        loggedUser = {
          id: data.instituicao.id,
          email: data.instituicao.email,
          tipo: "instituicao",
          name: data.instituicao.name || "Instituição",
        };
        router.push("/instituicao");
      }

      setUser(loggedUser);
      localStorage.setItem("user", JSON.stringify(loggedUser));
    } catch (err) {
      console.error("Erro no login:", err);
      alert("Erro ao conectar ao servidor");
    }
  };

const register = async (name: string, email: string, password: string) => {
  try {
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        full_name: name,
        email,
        password,
        tel: "+244000000000", // ou pegue do formulário
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Erro ao criar conta");
      return;
    }

    // salva no contexto e localStorage
    const newUser = {
      id: data.user.id,
      email: data.user.email,
      name: data.user.full_name,
      tipo: "usuario" as const,
    };

    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    alert("Conta criada com sucesso!");
    router.push("/dashboard");
  } catch (err) {
    console.error("Erro ao registrar:", err);
    alert("Erro de conexão com o servidor.");
  }
};


  // 🔸 Logout
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/auth/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// 🔹 Hook para usar o contexto
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  return context;
}

// 🧩 Gera iniciais a partir do nome ou e-mail (para o avatar)
export function getInitials(nameOrEmail: string | undefined): string {
  if (!nameOrEmail) return "?";
  const parts = nameOrEmail.split(" ");
  if (parts.length > 1) return (parts[0][0] + parts[1][0]).toUpperCase();
  if (nameOrEmail.includes("@"))
    return nameOrEmail.slice(0, 2).toUpperCase();
  return nameOrEmail.slice(0, 2).toUpperCase();
}
