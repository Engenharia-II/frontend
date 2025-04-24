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
        color="text-blue-500"
        bgColor="bg-blue-200"
      />

      <StatCard
        icon={<VscMortarBoard />}
        label="Tópicos concluídos"
        value={12}
        color="text-green-500"
        bgColor="bg-green-200"
      />

      <StatCard
        icon={<IoBookmarksOutline />}
        label="Recursos salvos"
        value={24}
        color="text-purple-500"
        bgColor="bg-purple-200"
      />
    </div>
  );
}
