import { TopicType } from '@/@types/DashboardTypes/TopicType';
import Link from 'next/link';
import { FaRegClock } from 'react-icons/fa';
import { TiArrowRight } from 'react-icons/ti';

interface TopicItemProps {
  topic: TopicType;
}

export default function TopicItem({ topic }: TopicItemProps) {
  const getBadgeColor = () => {
    switch (topic.type) {
      case 'Vídeo':
        return 'bg-red-500';
      case 'Artigo':
        return 'bg-blue-500';
      case 'PDF':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Link
      href={topic.link}
      className="flex flex-col bg-white border border-slate-300 hover:shadow-md transition-shadow rounded-lg p-5"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <FaRegClock className="text-2xl" />
          <div>
            <h2 className="text-lg text-gray-900 font-semibold">
              {topic.title}
            </h2>
            <div>
              <p className="text-gray-600">
                {topic.category} • {topic.resourceCount} recursos
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <p
            className={`${getBadgeColor()} text-sm font-semibold text-slate-50 px-3 rounded-full`}
          >
            {topic.type}
          </p>
          <TiArrowRight className="text-2xl text-slate-500" />
        </div>
      </div>
    </Link>
  );
}
