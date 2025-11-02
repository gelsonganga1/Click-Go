"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";

// ✅ Função utilitária para pegar iniciais do nome ou email
export function getInitials(nameOrEmail: string) {
  if (!nameOrEmail) return "";
  const nameParts = nameOrEmail.split(" ");
  if (nameParts.length === 1) return nameParts[0][0].toUpperCase();
  return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
}

export default function Navbar() {
  const { user, logout } = useAuth();
  const [menuAberto, setMenuAberto] = useState(false);

  const avatar = user?.full_name || user?.email || "";

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <Link href="/" className="font-bold text-xl">
        Click&Go
      </Link>

      <div className="relative">
        <button
          onClick={() => setMenuAberto(!menuAberto)}
          className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center"
        >
          {user?.avatar_url ? (
            <Image
              src={user.avatar_url}
              alt="Avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
          ) : (
            <span className="text-white font-bold">{getInitials(avatar)}</span>
          )}
        </button>

        {menuAberto && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded shadow-lg py-2">
            <p className="px-4 py-2 border-b">{user?.full_name || user?.email}</p>
            <button
              onClick={() => {
                logout();
                setMenuAberto(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-200"
            >
              Sair
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
