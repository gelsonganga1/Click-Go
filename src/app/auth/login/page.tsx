"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-black p-8 rounded-2xl shadow-md w-full max-w-md space-y-4 text-white"
      >
        <h2 className="text-2xl font-bold text-center text-white">Click&Go</h2>
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full border-none rounded text-gray-600 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          className="border p-2 w-full border-none rounded text-gray-600 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-white text-black font-semibold py-2 rounded-lg hover:bg-gray-200 transition">
          Entrar
        </button>
        <p className="text-sm text-center">
          Não tem conta?{" "}
          <a href="/auth/register" className="text-blue-400 underline">
            Cadastre-se
          </a>
        </p>
      </form>
    </div>
  );
}

// 👇 Isto impede o Next.js de tentar pré-renderizar no servidor
export const dynamic = "force-dynamic";
