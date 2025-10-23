"use client";
import Link from "next/link";

import Image from "next/image";

export default function Navbar() {


  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo + nome do site */}
        <div className="flex items-center gap-2">
      
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">Click&Go</h1>
        </div>

        {/* Área do usuário */}
  
      </nav>
    </header>
  );
}

