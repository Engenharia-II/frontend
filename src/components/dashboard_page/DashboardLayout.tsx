import { VscMortarBoard } from 'react-icons/vsc';
import { FaRegClock } from 'react-icons/fa';
import { LuBookMarked } from 'react-icons/lu';
import ActivityList from './ActivityList';
import Header from './Header';
import ProgressTracker from './ProgressTracker';
import StatsSection from './StatsSection';

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

export function DashboardLayout() {
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
      </main>
    </div>
  );
}
