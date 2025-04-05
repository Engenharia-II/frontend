import Image from 'next/image';
import { Button } from '../ui/button';
import { Search } from 'lucide-react';
import LogoCaminhoDev from '@/assets/images/caminho_dev_logo.png';

export default function Header() {
  return (
    <div className="relative py-20 px-4 overflow-hidden bg-gradient-to-r from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto relative">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center items-center">
            <Image src={LogoCaminhoDev} alt="Caminho Dev" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-light">
            Aprenda Ciência da Computação de forma estruturada
          </h1>
          <div className="flex flex-row sm:flew-col gap-4 justify-center">
            <Button
              size={'lg'}
              className="bg-white text-slate-900 hover:bg-slate-300 hover:cursor-pointer px-6"
            >
              Começar Agora
            </Button>
            <Button
              size={'lg'}
              className="bg-white text-slate-900 hover:bg-slate-300 hover:cursor-pointer px-6"
            >
              Como Funciona
            </Button>
          </div>
        </div>

        <div className="relative mt-12 max-w-xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Busque tópicos, cursos ou perguntas..."
            className="w-full pl-10 pr-4 py-3 rounded-md bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-white/30"
          />
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-slate-300">
          <span>Algoritmos</span>
          <span>•</span>
          <span>Python</span>
          <span>•</span>
          <span>Javascript</span>
          <span>•</span>
          <span>Estruturas de Dados</span>
          <span>•</span>
          <span>Machine Learning</span>
        </div>
      </div>
    </div>
  );
}
