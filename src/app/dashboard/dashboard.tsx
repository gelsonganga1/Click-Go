"use client";

import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">
        Bem-vindo à Click&Go, {user?.email}
      </h1>
      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Sair
      </button>
    </div>
  );
}
