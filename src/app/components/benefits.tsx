// components/BenefitsSection.tsx
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

      <div className="grid md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto border border-gray-300">
        {/* Card esquerdo */}
        <div className="p-8">
          <p className="text-sm text-gray-700 mb-1">Economia</p>
          <h3 className="text-2xl font-bold mb-4">
            Economize seu tempo precioso
          </h3>
          <p className="text-black mb-6">
            Elimine longas esperas e planeje melhor os seus compromissos. Com o Click&Go você economiza horas do seu dia.
          </p>
          <div className="w-24 h-12 bg-gray-200"></div>
        </div>

        {/* Área direita (imagem, vídeo ou gráfico) */}
        <div className="bg-gray-200 h-full w-full min-h-[250px]" />
      </div>
    </section>
  );
}
