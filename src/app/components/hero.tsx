"use client";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto text-center px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 inline-block relative typewriter">
          Seu tempo é precioso.<br /> Gerencie filas com inteligência
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mt-4">
          A Click&Go é a solução definitiva para eliminar longas esperas em serviços públicos e privados. 
          Agende, monitore e otimize seu tempo com apenas alguns toques.
        </p>
        <div className="flex justify-center gap-4 mt-6">
          <button className="px-6 py-3 bg-black text-white rounded-lg">Baixar</button>
          <button className="px-6 py-3 border rounded-lg">Saiba Mais</button>
        </div>
        <div className="mt-10">
          <Image
            src="/hero 1.png"
            alt="Ilustração agendamento"
            width={1584}
            height={911}
            className="w-full h-auto rounded-lg"
            priority
          />
        </div>
      </div>
    </section>
  );
}
