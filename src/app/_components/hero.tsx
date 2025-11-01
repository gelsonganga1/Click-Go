"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Hero() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const router = useRouter();

  const phrases = [
    "Seu tempo é precioso.<br />Gerencie filas com inteligência.",
    "Evite esperas desnecessárias.<br />Use o Click&Go para agendar rápido.",
    "Agende seus serviços públicos<br />e privados com facilidade.",
  ];

  useEffect(() => {
    let i = 0;
    let deleting = false;
    const currentPhrase = phrases[index].replace(/<br\s*\/?>/g, "\n");

    const interval = setInterval(() => {
      if (!deleting) {
        i++;
        if (i > currentPhrase.length) {
          deleting = true;
          setTimeout(() => {}, 2000);
        }
      } else {
        i--;
        if (i < 0) {
          deleting = false;
          setIndex((prev) => (prev + 1) % phrases.length);
          i = 0;
        }
      }
      setText(currentPhrase.slice(0, i));
    }, 100);

    return () => clearInterval(interval);
  }, [index]);

  const handleReserve = () => {
    router.push("/reservar");
  };

  return (
    <section className="py-16 bg-white text-black">
      <div className="max-w-6xl mx-auto text-center px-6">
        <h2
          className="text-3xl md:text-4xl font-bold inline-block relative min-h-[4rem] leading-snug"
          dangerouslySetInnerHTML={{
            __html: text.replace(/\n/g, "<br />"),
          }}
        />
        <span className="border-r-2 border-white animate-pulse ml-1" />
        <p className="text-gray-700 max-w-2xl mx-auto mt-2">
          A Click&Go é a solução definitiva para eliminar longas esperas em
          serviços públicos e privados. Agende, monitore e otimize seu tempo com
          apenas alguns toques.
        </p>
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={handleReserve}
            className="px-6 py-3 border rounded-lg bg-black text-white hover:bg-gray-800 transition"
          >
            Reservar
          </button>
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

