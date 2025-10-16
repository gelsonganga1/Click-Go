// components/BenefitsSection.tsx
type Benefit = {
  title: string;
  subtitle: string;
  description: string;
};

const benefits: Benefit[] = [
  {
    title: "Economia",
    subtitle: "Economize seu tempo precioso",
    description:
      "Elimine longas esperas e planeje melhor os seus compromissos. Com o Click&Go você economiza horas do seu dia.",
  },
  {
    title: "Eficiência",
    subtitle: "Agilidade no atendimento",
    description:
      "Reduza o tempo de espera e otimize o fluxo de clientes com uma solução digital prática e rápida.",
  },
  {
    title: "Comodidade",
    subtitle: "Atendimento onde você estiver",
    description:
      "Use o Click&Go do conforto de casa ou em movimento, sem precisar enfrentar filas.",
  },
  {
    title: "Controle",
    subtitle: "Gerencie suas filas facilmente",
    description:
      "Tenha controle total sobre suas reservas e horários, tudo na palma da sua mão.",
  },
];

export default function BenefitsSection() {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="text-center mb-12">
        <h2 className="text-sm text-black font-medium">Benefícios</h2>
        <h1 className="text-3xl text-black font-bold mt-2">Por que usar o Click&Go</h1>
        <p className="mt-2 text-gray-500">
          Transforme sua experiência de atendimento com nossa solução inovadora
        </p>
      </div>

      <div className="space-y-12 max-w-6xl mx-auto">
        {benefits.map((benefit, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={index}
              className={`grid md:grid-cols-2 gap-8 items-center border border-gray-300 rounded-lg overflow-hidden`}
            >
              {/* Conteúdo */}
              <div className={`p-8 ${isEven ? "" : "order-last"}`}>
                <p className="text-sm text-gray-700 mb-1">{benefit.title}</p>
                <h3 className="text-2xl text-black font-bold mb-4">{benefit.subtitle}</h3>
                <p className="text-gray-700 mb-6">{benefit.description}</p>
                <div className="inline-block">
                    <button className="text-sm text-black px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition">
                       Saiba mais
                    </button>
                </div>

              </div>

              {/* Imagem ou área visual */}
              <div className="bg-gray-200 h-full w-full min-h-[250px]" />
            </div>
          );
        })}
      </div>
    </section>
  );
}
