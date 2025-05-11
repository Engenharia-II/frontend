import { VscMortarBoard } from 'react-icons/vsc';
import { FaRegClock } from 'react-icons/fa';
import { LuBookMarked } from 'react-icons/lu';
import ActivityList from './ActivityList';
import Header from './Header';
import ProgressTracker from './ProgressTracker';
import StatsSection from './StatsSection';
import Footer from './Footer';
import TopicList from './TopicList';

const activities = [
  {
    icon: <FaRegClock />,
    title: 'Árvores de Busca Binária',
    status: 'Visualizado',
    time: '2 horas atrás',
    color: 'text-blue-500'
  },
  {
    icon: <VscMortarBoard />,
    title: 'Normalização de Bancos de Dados',
    status: 'Concluído',
    time: 'ontem',
    color: 'text-green-500'
  },
  {
    icon: <LuBookMarked />,
    title: 'Modelo TCP/IP',
    status: 'Salvo',
    time: 'há 3 dias',
    color: 'text-purple-500'
  }
];

const topics = [
  {
    icon: 'https://cdn.builder.io/api/v1/image/assets/491acbbbf9904ef49b9d97c38185559a/62ce7d562dc89ad97247bef0d1a112840cba4eb6?placeholderIfAbsent=true',
    title: 'Árvores de Busca Binária',
    category: 'Algoritmos e Estruturas de Dados',
    resourceCount: 8,
    link: '/topics/trees',
    type: 'Vídeo' as const
  },
  {
    icon: 'https://cdn.builder.io/api/v1/image/assets/491acbbbf9904ef49b9d97c38185559a/d1e1c50522e52badd59df25bc65fdbace265bfff?placeholderIfAbsent=true',
    title: 'Normalização de Bancos de Dados',
    category: 'Banco de Dados',
    resourceCount: 5,
    link: '/topics/database-normalization',
    type: 'Artigo' as const
  },
  {
    icon: 'https://cdn.builder.io/api/v1/image/assets/491acbbbf9904ef49b9d97c38185559a/beca6f0a580fab74ae1afd7075f3cc1d1cef4a50?placeholderIfAbsent=true',
    title: 'Modelo TCP/IP',
    category: 'Redes de Computadores',
    resourceCount: 6,
    link: '/topics/tcp-ip-model',
    type: 'Vídeo' as const
  },
  {
    icon: 'https://cdn.builder.io/api/v1/image/assets/491acbbbf9904ef49b9d97c38185559a/1301f28ed7fbd158cea8bef19c47c288b7650985?placeholderIfAbsent=true',
    title: 'Design Patterns em Java',
    category: 'Programação Orientada a Objetos',
    resourceCount: 7,
    link: '/topics/design-patterns-java',
    type: 'PDF' as const
  },
  {
    icon: 'https://cdn.builder.io/api/v1/image/assets/491acbbbf9904ef49b9d97c38185559a/46c284ccc0d0a6740f53db056edc74447016173b?placeholderIfAbsent=true',
    title: 'Criptografia Assimétrica',
    category: 'Segurança da Informação',
    resourceCount: 4,
    link: '/topics/asymmetric-cryptography',
    type: 'Artigo' as const
  }
];

export function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="flex flex-col">
        <section className="flex flex-col md:flex-row md:items-start items-stretch justify-center md:gap-x-8 gap-3 px-6 py-8">
          <div className="md:flex-[2]">
            <ProgressTracker />
          </div>
          <div className="md:flex-[1]">
            <StatsSection />
          </div>
        </section>
        <section className="">
          <ActivityList activities={activities} />
        </section>
        <section>
          <TopicList topics={topics} />
        </section>
      </main>
      <Footer />
    </div>
  );
}
