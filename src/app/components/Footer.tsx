export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-10">
        <div>
          <h3 className="font-semibold text-white mb-3">Logo</h3>
          <p className="text-sm mb-3">
            Fique por dentro das novidades e atualizações do Kudi
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Seu email"
              className="px-3 py-2 rounded-l-lg bg-gray-800 border border-gray-700 focus:outline-none"
            />
            <button className="bg-blue-600 px-4 py-2 rounded-r-lg text-white">
              Assinar
            </button>
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Click&Go</h4>
          <ul className="space-y-2 text-sm">
            <li>Início</li>
            <li>Recursos</li>
            <li>Como funciona</li>
            <li>Benefícios</li>
            <li>Contato</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Suporte</h4>
          <ul className="space-y-2 text-sm">
            <li>Termos</li>
            <li>Privacidade</li>
            <li>Suporte</li>
            <li>Blog</li>
            <li>Carreiras</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Siga-nos</h4>
          <ul className="space-y-2 text-sm">
            <li>Facebook</li>
            <li>Instagram</li>
            <li>X (Twitter)</li>
            <li>LinkedIn</li>
            <li>YouTube</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-10 pt-6 text-center text-xs">
        © 2024 Click&Go. Todos os direitos reservados. <br />
        <a href="#" className="text-gray-500 hover:text-white">
          Política de privacidade
        </a>{" "}
        |{" "}
        <a href="#" className="text-gray-500 hover:text-white">
          Termos de serviço
        </a>
      </div>
    </footer>
  );
}
