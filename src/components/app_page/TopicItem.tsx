import Link from 'next/link';
import { FaRegClock } from 'react-icons/fa';
import { TiArrowRight } from 'react-icons/ti';
import { TopicInterface } from './TopicList';

export default function TopicItem(topic: TopicInterface) {
  return (
    <Link
      href={''}
      className="flex flex-col bg-white border border-slate-300 hover:shadow-md transition-shadow rounded-lg p-5 group"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <FaRegClock className="text-2xl" />
          <div>
            <h2 className="text-lg text-gray-900 font-semibold">
              {topic.name}
            </h2>
            <p className="text-gray-600">{topic.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <TiArrowRight className="text-2xl group-hover:translate-x-1 transition-transform text-slate-500" />
        </div>
      </div>
    </Link>
  );
}
