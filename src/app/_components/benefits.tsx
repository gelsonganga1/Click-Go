"use client";

import { motion } from "framer-motion";
import { useState } from "react";

type Benefit = {
  title: string;
  subtitle: string;
  description: string;
  image?: string;
};

const benefits: Benefit[] = [
  {
    title: "Economia",
    subtitle: "Economize seu tempo precioso",
    description:
      "Elimine longas esperas e planeje melhor os seus compromissos. Com o Click&Go você economiza horas do seu dia.",
    image: "/images/time-saving.jpg",
  },
  {
    title: "Eficiência",
    subtitle: "Agilidade no atendimento",
    description:
      "Reduza o tempo de espera e otimize o fluxo de clientes com uma solução digital prática e rápida.",
    image: "/images/efficiency.jpg",
  },
  {
    title: "Comodidade",
    subtitle: "Atendimento onde você estiver",
    description:
      "Use o Click&Go do conforto de casa ou em movimento, sem precisar enfrentar filas.",
    image: "/images/convenience.jpg",
  },
  {
    title: "Controle",
    subtitle: "Gerencie suas filas facilmente",
    description:
      "Tenha controle total sobre suas reservas e horários, tudo na palma da sua mão.",
    image: "/images/control.jpg",
  },
];

export default function BenefitsSection() {
  const [selected, setSelected] = useState<number | null>(null);

  const handleLearnMore = (index: number) => {
    setSelected(selected === index ? null : index);
  };

  return (
    <section className="py-16 px-6 bg-white">
      <div className="text-center mb-12">
        <h2 className="text-sm text-black font-medium">Benefícios</h2>
        <h1 className="text-3xl text-black font-bold mt-2">
          Por que usar o Click&Go
        </h1>
        <p className="mt-2 text-gray-500">
          Transforme sua experiência de atendimento com nossa solução inovadora
        </p>
      </div>

      <div className="space-y-12 max-w-6xl mx-auto">
        {benefits.map((benefit, index) => {
          const isEven = index % 2 === 0;
          const isActive = selected === index;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={`grid md:grid-cols-2 gap-8 items-center border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition`}
            >
              {/* Conteúdo */}
              <div className={`p-8 ${isEven ? "" : "order-last"}`}>
                <p className="text-sm text-gray-700 mb-1">{benefit.title}</p>
                <h3 className="text-2xl text-black font-bold mb-4">
                  {benefit.subtitle}
                </h3>
                <p className="text-gray-700 mb-6">{benefit.description}</p>

                <button
                  onClick={() => handleLearnMore(index)}
                  className={`text-sm px-4 py-2 rounded transition ${
                    isActive
                      ? "bg-black text-white"
                      : "bg-gray-200 text-black hover:bg-gray-300"
                  }`}
                >
                  {isActive ? "Fechar" : "Saiba mais"}
                </button>

                {/* Área expandida */}
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.4 }}
                    className="mt-4 text-sm text-gray-600 border-t pt-3"
                  >
                    <p>
                      O Click&Go oferece integração com sistemas de atendimento,
                      alertas automáticos e relatórios em tempo real para uma
                      gestão completa.
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Área visual */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="bg-gray-100 h-full w-full min-h-[250px] flex items-center justify-center"
              >
                {benefit.image ? (
                  <img
                    src={benefit.image}
                    alt={benefit.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-500 text-sm">
                    Área visual / imagem
                  </span>
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

