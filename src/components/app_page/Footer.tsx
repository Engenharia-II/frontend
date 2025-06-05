import Image from 'next/image';
import Link from 'next/link';
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-8 dark:bg-gray-900 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
            <div className="flex items-center">
              {/* Logo para tema claro */}
              <Image
                src="/assets/logos/caminho_dev_logo_black.png"
                alt="CaminhoDev Logo"
                width={40}
                height={40}
                className="mr-3 block dark:hidden"
              />
              {/* Logo para tema escuro */}
              <Image
                src="/assets/logos/caminho_dev_logo.png"
                alt="CaminhoDev Logo"
                width={40}
                height={40}
                className="mr-3 hidden dark:block"
              />
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                CaminhoDev
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-2 dark:text-gray-300">
              Plataforma educacional para estudantes de Ciência da Computação
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-6 md:gap-12">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 dark:text-white">
                Plataforma
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/app"
                    className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/app/subjects"
                    className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                  >
                    Disciplinas
                  </Link>
                </li>
                <li>
                  <Link
                    href="/app/saved-content"
                    className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                  >
                    Conteúdos Salvos
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3 dark:text-white">
                Disciplinas
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/subjects/algorithms"
                    className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                  >
                    Algoritmos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/subjects/databases"
                    className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                  >
                    Banco de Dados
                  </Link>
                </li>
                <li>
                  <Link
                    href="/subjects/redes"
                    className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                  >
                    Redes
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 md:mt-0">
            <h4 className="font-semibold text-gray-900 mb-3 text-center md:text-right dark:text-white">
              Contato
            </h4>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
              >
                <FaLinkedin size={20} />
              </Link>
              <Link
                href="#"
                className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
              >
                <FaGithub size={20} />
              </Link>
              <Link
                href="#"
                className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
              >
                <FaInstagram size={20} />
              </Link>
              <Link
                href="#"
                className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
              >
                <FaTwitter size={20} />
              </Link>
            </div>
            <p className="text-gray-600 text-sm mt-3 dark:text-gray-300">
              contato@caminhodev.com
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6 text-center dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            &copy; {new Date().getFullYear()} CaminhoDev. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
