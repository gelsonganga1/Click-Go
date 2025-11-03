"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login, user, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
      router.push("/"); // redireciona para Home após login
    } catch (err: any) {
      alert(err.message);
    }
  };

  useEffect(() => {
    if (!loading && user) {
      router.push("/"); // já logado, vai direto pra Home
    }
  }, [user, loading, router]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Carregando...
      </div>
    );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-black mb-6">
          Click&Go - Entrar
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="exemplo@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-sky-400 outline-none text-gray-500"
              required
            />
          </div>

          {/* Senha */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Senha
            </label>
            <input
              type="password"
              placeholder="Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-sky-400 outline-none text-gray-500"
              required
            />
          </div>

          {/* Botão */}
          <button
            type="submit"
            className="w-full rounded-lg py-2 font-semibold bg-gray-600 hover:bg-gray-900 text-white transition"
          >
            Entrar
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Não tem uma conta?{" "}
          <a
            href="/auth/register"
            className="text-sky-600 font-medium hover:underline"
          >
            Registre-se aqui
          </a>
        </p>
      </div>
    </div>
  );
}

