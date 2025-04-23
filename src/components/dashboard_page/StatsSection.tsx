import { IoBookmarksOutline, IoBookOutline } from 'react-icons/io5';
import { VscMortarBoard } from 'react-icons/vsc';
import StatCard from './StatCard';

export default function StatsSection() {
  return (
    <div className="min-w-60 min-h-[354px] grow shrink w-[329px]">
      <StatCard
        icon={<IoBookOutline />}
        label="Disciplinas em andamento"
        value={3}
        color="blue-500"
        bgColor="blue-200"
      />

      <StatCard
        icon={<VscMortarBoard />}
        label="Tópicos concluídos"
        value={12}
        color="green-500"
        bgColor="green-200"
      />

      <StatCard
        icon={<IoBookmarksOutline />}
        label="Recursos salvos"
        value={24}
        color="purple-500"
        bgColor="purple-200"
      />
    </div>
  );
}
