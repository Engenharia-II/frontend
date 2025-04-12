export default function Footer() {
  return (
    <div className="text-center text-slate-300 mt-8">
      <div className="mb-2">
        <span>&copy;</span> 2025 CaminhoDev. Todos os direitos reservados.
      </div>
      <div className="flex justify-center gap-4 max-sm:flex-wrap">
        <a href="#" className="no-underline">
          Sobre
        </a>
        <a href="#" className="no-underline">
          Termos
        </a>
        <a href="#" className="no-underline">
          Privacidade
        </a>
        <a href="#" className="no-underline">
          Contato
        </a>
      </div>
    </div>
  );
}
