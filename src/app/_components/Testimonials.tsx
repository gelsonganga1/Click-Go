

export default function Testimonials() {
  const testimonials = [
    {
      name: "Maria Silva",
      role: "Usuária, Luanda",
      text: "O Click&Go mudou completamente minha forma de lidar com atendimentos. Nunca mais perdi tempo em filas!",
    },
    {
      name: "João Santos",
      role: "Diretor, Banco Local",
      text: "Como gerente, o painel do Click&Go nos ajudou a otimizar nosso atendimento em 40%.",
    },
    {
      name: "Ana Oliveira",
      role: "Empreendedora, Luanda",
      text: "Praticidade e economia de tempo. O Click&Go é perfeito para quem valoriza produtividade!",
    },
  ];

  return (
    <section className="bg-gray-900 text-white py-16">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-2">O que dizem sobre nós</h2>
        <p className="text-gray-400 mb-10">
          Histórias reais de quem já usa o Click&Go
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-lg transition"
            >
              <div className="text-yellow-400 text-xl mb-3">★★★★★</div>
              <p className="text-gray-300 mb-4">{t.text}</p>
              <h3 className="font-semibold">{t.name}</h3>
              <p className="text-sm text-gray-500">{t.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}