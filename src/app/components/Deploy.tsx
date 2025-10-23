export default function CTA() {
  return (
    <section className="bg-gray-950 text-white py-20 text-center">
      <h2 className="text-3xl font-bold mb-4">
        Transforme sua experiência de atendimento
      </h2>
      <p className="text-gray-400 mb-8">
        Baixe agora o Kudi e comece a economizar tempo em seus serviços diários.
      </p>
      <div className="flex justify-center gap-4">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium">
          Baixar
        </button>
        <button className="border border-gray-500 hover:border-white px-6 py-3 rounded-xl font-medium">
          Saiba mais
        </button>
      </div>
    </section>
  );
}