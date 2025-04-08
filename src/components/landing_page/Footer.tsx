'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="py-12 px-4 bg-slate-900 text-slate-200">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-xl font-bold">Caminho Dev</h2>
            <p className="mt-2 text-slate-400">
              Seu guia definitivo para Ciência da Computação
            </p>
          </div>
          <div className="flex gap-8">
            <Link href="/about" className="hover:text-white transition-colors">
              Sobre
            </Link>
            <Link href="/blog" className="hover:text-white transition-colors">
              Blog
            </Link>
            <Link
              href="/contact"
              className="hover:text-white transition-colors"
            >
              Contato
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Termos
            </Link>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-800 text-center text-slate-400">
          <p>
            <span>&copy;</span> 2025 CaminhoDev. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
