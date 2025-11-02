// src/app/_not-found/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function NotFoundPage() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) router.push("/auth/login");
  }, [user, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">404</h1>
        <p className="text-gray-600 mb-4">Página não encontrada</p>
        {!user && <p className="text-gray-500">Redirecionando para login...</p>}
      </div>
    </div>
  );
}
