"use client";

const steps = [
  {
    id: 1,
    title: "Escolha o serviço",
    desc: "Selecione o local e tipo de atendimento desejado",
  },
  {
    id: 2,
    title: "Agende seu horário",
    desc: "Escolha data e horário que melhor se adequam à sua rotina.",
  },
  {
    id: 3,
    title: "Receba sua senha",
    desc: "Acompanhe sua posição na fila e receba alertas em tempo real.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="text-center mb-12">
        <h3 className="text-gray-600">Como funciona</h3>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Seu novo jeito de economizar tempo
        </h2>
        <p className="text-gray-500">
          Três passos simples para um atendimento sem complicações
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6">
        {steps.map((step) => (
          <div
            key={step.id}
            className="bg-white shadow-md rounded-lg overflow-hidden border"
          >
            <div className="h-40 bg-gray-200"></div>
            <div className="p-4">
              <p className="text-sm text-gray-500">Passo {step.id}</p>
              <h4 className="font-bold text-gray-800 mt-1">{step.title}</h4>
              <p className="text-sm text-gray-600 mt-2">{step.desc}</p>
              <button className="mt-4 text-sm font-medium flex items-center text-gray-800">
                Saiba mais <span className="ml-1">➝</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
