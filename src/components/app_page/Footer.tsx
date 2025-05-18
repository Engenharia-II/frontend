import Image from 'next/image';
import Link from 'next/link';
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
            <div className="flex items-center">
              <Image
                src="/assets/logos/caminho_dev_logo.png"
                alt="CaminhoDev Logo"
                width={32}
                height={32}
                className="mr-2"
              />
              <span className="text-lg font-bold text-gray-900">
                CaminhoDev
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Plataforma educacional para estudantes de Ciência da Computação
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-6 md:gap-12">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Plataforma</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/app"
                    className="text-gray-600 hover:text-blue-600"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/app/subjects"
                    className="text-gray-600 hover:text-blue-600"
                  >
                    Disciplinas
                  </Link>
                </li>
                <li>
                  <Link
                    href="/app/saved-content"
                    className="text-gray-600 hover:text-blue-600"
                  >
                    Conteúdos Salvos
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Disciplinas</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/subjects/algorithms"
                    className="text-gray-600 hover:text-blue-600"
                  >
                    Algoritmos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/subjects/databases"
                    className="text-gray-600 hover:text-blue-600"
                  >
                    Banco de Dados
                  </Link>
                </li>
                <li>
                  <Link
                    href="/subjects/redes"
                    className="text-gray-600 hover:text-blue-600"
                  >
                    Redes
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 md:mt-0">
            <h4 className="font-semibold text-gray-900 mb-3 text-center md:text-right">
              Contato
            </h4>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-600 hover:text-blue-600">
                <FaLinkedin size={20} />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-blue-600">
                <FaGithub size={20} />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-blue-600">
                <FaInstagram size={20} />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-blue-600">
                <FaTwitter size={20} />
              </Link>
            </div>
            <p className="text-gray-600 text-sm mt-3">contato@caminhodev.com</p>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} CaminhoDev. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
