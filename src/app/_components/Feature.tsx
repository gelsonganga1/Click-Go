"use client";

import { useState } from "react";

const features = [
  {
    title: "Agendamento",
    description:
      "Permite que o cliente marque seu atendimento de forma rápida e organizada, escolhendo data e hora conforme a disponibilidade do serviço.",
  },
  {
    title: "Senha Digital",
    description:
      "Gera uma senha eletrônica que elimina a necessidade de filas físicas, permitindo acompanhar o atendimento em tempo real pelo celular.",
  },
  {
    title: "Alertas",
    description:
      "Envia notificações automáticas sobre o status do atendimento, tempo estimado e lembretes de agendamentos futuros.",
  },
  {
    title: "Avaliação",
    description:
      "Após o atendimento, o cliente pode avaliar o serviço prestado, ajudando a melhorar a qualidade do atendimento da empresa.",
  },
  {
    title: "Painel Empresarial",
    description:
      "As empresas têm acesso a um painel de gestão com métricas e relatórios sobre atendimentos, desempenho e satisfação dos clientes.",
  },
  {
    title: "Gestão de filas",
    description:
      "O sistema organiza as filas de atendimento de forma inteligente, otimizando o tempo de espera e a eficiência do serviço.",
  },
];

export default function Features() {
  const [selected, setSelected] = useState(features[0]); // Começa com a primeira funcionalidade selecionada

  return (
    <section className="py-16 bg-white text-black">
      <div className="max-w-6xl mx-auto px-6">
        {/* Cabeçalho */}
        <div className="text-center mb-12">
          <h3 className="text-gray-600">Recursos</h3>
          <h2 className="text-2xl md:text-3xl font-bold ">
            Funcionalidades do Click&Go
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Descubra como a nossa aplicação transforma a experiência de
            atendimento em diversos setores.
          </p>
        </div>

        {/* Conteúdo dividido */}
        <div className="flex flex-col md:flex-row border rounded-lg overflow-hidden shadow-sm">
          {/* Lista lateral */}
          <div className="w-full md:w-1/3 border-r bg-gray-50">
            {features.map((item) => (
              <div
                key={item.title}
                onClick={() => setSelected(item)}
                className={`p-4 border-b cursor-pointer transition-all ${
                  selected.title === item.title
                    ? "bg-blue-50 border-l-4 border-blue-600"
                    : "hover:bg-gray-100"
                }`}
              >
                <h4
                  className={`font-medium ${
                    selected.title === item.title
                      ? "text-blue-600"
                      : "text-gray-700"
                  }`}
                >
                  {item.title}
                </h4>
              </div>
            ))}
          </div>

          {/* Área de detalhes */}
          <div className="flex-1 p-8">
            <h4 className="font-bold text-lg text-gray-800 mb-2">
              {selected.title}
            </h4>
            <p className="text-gray-600 mb-6">{selected.description}</p>
            <div className="flex gap-4">
              <button className="px-4 py-2 border border-gray-300 text-black rounded-lg hover:bg-gray-100 transition">
                Detalhes
              </button>
              <button className="px-4 py-2 border border-black text-blue-600 rounded-lg hover:bg-black hover:text-white transition">
                Ver mais ➝
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

