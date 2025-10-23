"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register(email, password);
    router.push("/"); // redireciona para home após cadastro
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <form
        onSubmit={handleSubmit}
        className="bg-black p-8 rounded-xl shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">
          Criar conta
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 mb-3 border-none rounded-lg focus:outline-none "
          required
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-4 border-none rounded-lg focus:outline-none "
          required
        />

        <button
          type="submit"
          className="w-full bg-white hover:bg-gray-200 text-black font-semibold py-2 rounded-lg transition"
        >
          Cadastrar
        </button>

        <p className="text-sm text-center text-gray-500 mt-4">
          Já tem conta?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Entrar
          </a>
        </p>
      </form>
    </div>
  );
}
