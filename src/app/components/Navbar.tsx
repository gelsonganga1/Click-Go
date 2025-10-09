"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-6xl mx-auto flex justify-between items-center py-4 px-6">
        <h1 className="text-2xl font-bold text-black">Click&Go</h1>
        <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <Link href="#">Início</Link>
          <Link href="#">Recursos</Link>
          <Link href="#">Como funciona</Link>
          <Link href="#">Benefícios</Link>
        </nav>
        <div className="flex space-x-3">
          <button className="px-4 py-2 border rounded-lg text-black">Entrar</button>
          <button className="px-4 py-2 bg-black text-white rounded-lg">Cadastrar</button>
        </div>
      </div>
    </header>
  );
}
