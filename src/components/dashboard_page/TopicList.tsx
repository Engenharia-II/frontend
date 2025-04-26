import { TopicType } from '@/@types/DashboardTypes/TopicType';
import Link from 'next/link';
import { TiArrowRight } from 'react-icons/ti';
import TopicItem from './TopicITem';

interface TopicListProps {
  topics: TopicType[];
}

export default function TopicList({ topics }: TopicListProps) {
  return (
    <div className="mx-8 mt-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">Tópicos Recentes</h1>
          <p className="text-gray-600">
            Últimos conteúdos adicionados à plataforma
          </p>
        </div>
        <Link
          href={'/topics'}
          className="flex items-center justify-center bg-white hover:bg-slate-100 border rounded-lg border-slate-300 shadow-slate-200 px-4 py-2 font-semibold"
        >
          Ver tudo
          <TiArrowRight className="text-2xl" />
        </Link>
      </div>
      <div className="mt-8 space-y-4">
        {topics.map((topic, index) => (
          <TopicItem key={index} topic={topic} />
        ))}
      </div>
    </div>
  );
}
