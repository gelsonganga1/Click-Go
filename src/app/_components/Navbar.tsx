"use client";

import { useAuth, getInitials } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white text-black shadow-sm">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        {/*  Logo */}
        <Link href="/" className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">Click&Go</h1>
        </Link>

        {/* 🔹 Área do usuário */}
        {user ? (
          <div className="flex items-center gap-4">
            {/* Avatar (imagem ou iniciais) */}
            {user.avatar ? (
              <Image
                src={user.avatar}
                alt="Avatar"
                width={40}
                height={40}
                className="rounded-full object-cover border border-gray-700"
              />
            ) : (
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 text-white font-semibold">
                {getInitials(user.name || user.email)}
              </div>
            )}

            {/* Nome e e-mail */}
            <div className="text-sm">
              <p className="font-medium">{user.name || "Usuário"}</p>
              <p className="text-gray-400">{user.email}</p>
            </div>

            {/* Botão de sair */}
            <button
              onClick={logout}
              className="px-3 py-1 text-sm rounded-md bg-gray-800 hover:bg-gray-700 transition"
            >
              Sair
            </button>
          </div>
        ) : (
          <Link
            href="/auth/login"
            className="px-4 py-2 rounded-md bg-gray-800 hover:bg-gray-700 transition"
          >
            Entrar
          </Link>
        )}
      </nav>
    </header>
  );
}

