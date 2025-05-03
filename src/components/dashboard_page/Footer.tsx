import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 mt-12 py-12 px-8">
      <div className="flex flex-col gap-6 md:flex-row justify-between w-full text-gray-400">
        <div>
          <h2 className="text-gray-200 text-xl font-bold mb-4">CaminhoDev</h2>
          <p>Plataforma educacional para estudantes de Ciência</p>
          <p>da Computação com conteúdos de qualidade.</p>
        </div>
        <div>
          <h2 className="text-gray-200 text-xl font-bold mb-4">
            Links Rápidos
          </h2>
          <ul className="flex flex-col gap-2">
            <Link href={'/dashboard'} className="hover:text-gray-200">
              Início
            </Link>
            <Link href={'/subjects'} className="hover:text-gray-200">
              Disciplinas
            </Link>
            <Link href={'/about'} className="hover:text-gray-200">
              Sobre
            </Link>
          </ul>
        </div>
        <div>
          <h2 className="text-gray-200 text-xl font-bold mb-4">Disciplinas</h2>
          <ul className="flex flex-col gap-2">
            <Link href={'/subjects/algorithms'} className="hover:text-gray-200">
              Algoritmos
            </Link>
            <Link href={'/subjects/databases'} className="hover:text-gray-200">
              Banco de Dados
            </Link>
            <Link href={'/subjects/redes'} className="hover:text-gray-200">
              Redes
            </Link>
            <Link href={'/subjects/OOP'} className="hover:text-gray-200">
              POO
            </Link>
          </ul>
        </div>
        <div>
          <h2 className="text-gray-200 text-xl font-bold mb-4">Contato</h2>
          <div className="flex flex-col gap-2">
            <p>Email: contato@caminhodev.com</p>
            <p>Instagram: @caminhodev</p>
            <p>Twitter: @caminhodev</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center border-t border-gray-800 leading-loose mt-8 pt-8 text-gray-500 text-sm md:text-lg">
        <p>
          &copy; 2025 <span className="font-bold">CaminhoDev</span>. Todos os
          direitos reservados.
        </p>
      </div>
    </footer>
  );
}
