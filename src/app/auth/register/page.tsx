"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const { register, loading } = useAuth(); // ✅ usar loading do contexto
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // ✅ usar nome correto do parâmetro
      await register({ fullName, email, password });
      alert("Conta criada com sucesso!");
      router.push("/auth/login");
    } catch (error) {
      console.error(error);
      alert("Erro ao criar conta");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-black mb-6">
          Click&Go - Criar Conta
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Nome completo */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Nome completo
            </label>
            <input
              type="text"
              placeholder="Seu nome completo"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-sky-400 outline-none text-gray-500"
              required
            />
          </div>

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

          {/* Telefone */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Telefone
            </label>
            <input
              type="tel"
              placeholder="+244 XXX XXX XXX"
              value={tel}
              onChange={(e) => setTel(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-sky-400 outline-none text-gray-500"
              required
            />
          </div>

          {/* Data de nascimento */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Data de nascimento
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-sky-400 outline-none text-gray-500"
            />
          </div>

          {/* Senha */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Senha
            </label>
            <input
              type="password"
              placeholder="Crie uma senha forte"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-sky-400 outline-none text-gray-500"
              required
            />
          </div>

          {/* Botão */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-lg py-2 font-semibold transition ${
              loading
                ? "bg-sky-400 cursor-not-allowed"
                : "bg-gray-600 hover:bg-gray-900 text-white"
            }`}
          >
            {loading ? "Criando conta..." : "Criar conta"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Já tem uma conta?{" "}
          <a
            href="/auth/login"
            className="text-sky-600 font-medium hover:underline"
          >
            Entre aqui
          </a>
        </p>
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";
