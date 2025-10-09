"use client";

const features = [
  "Agendamento",
  "Senha Digital",
  "Alertas",
  "Avaliação",
  "Painel Empresarial",
  "Gestão de filas",
];

export default function Features() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h3 className="text-gray-600">Recursos</h3>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Funcionalidade do Click&Go
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Descubra como a nossa aplicação transforma a experiência de atendimento em diversos setores
          </p>
        </div>

        <div className="flex flex-col md:flex-row border rounded-lg overflow-hidden">
          {/* Lista lateral */}
          <div className="w-full md:w-1/3 border-r">
            {features.map((item, i) => (
              <div
                key={i}
                className="p-4 border-b hover:bg-gray-50 cursor-pointer"
              >
                <h4 className="font-medium text-gray-700">{item}</h4>
              </div>
            ))}
          </div>

          {/* Conteúdo da funcionalidade */}
          <div className="flex-1 p-6">
            <h4 className="font-bold text-lg text-gray-800 mb-2">
              Agendamento Online Simplificado
            </h4>
            <p className="text-gray-600 mb-4">
              Marque seus atendimentos em bancos, hospitais e repartições públicas 
              com total facilidade e praticidade.
            </p>
            <div className="flex gap-4">
              <button className="px-4 py-2 border rounded-lg">Detalhes</button>
              <button className="px-4 py-2 border rounded-lg">Ver mais ➝</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
