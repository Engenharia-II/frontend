import { TopicType } from '@/@types/TopicPageTypes/TopicType';
import { ClockIcon } from 'lucide-react';

interface TopicDataProps {
  topicData: TopicType;
}

export default function TopicsHeader({ topicData }: TopicDataProps) {
  const expectedDuration = topicData.contents.reduce(
    (acc, content) => acc + content.duration,
    0
  );

  return (
    <section className="bg-gray-900 text-white py-7">
      <div className="flex flex-col gap-4 ml-10">
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold">{topicData.name}</h1>
          <div className="flex items-center gap-2 text-sm">
            <ClockIcon className="text-blue-300" size={16} />
            <p className="text-gray-300">
              Estimativa: {expectedDuration} horas
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <p>Progresso: </p>
          <div className="w-sm bg-slate-100 border-1 border-slate-300 h-2 rounded-full overflow-hidden">
            <div
              className="bg-slate-800 h-full rounded-full"
              style={{ width: `${topicData.progress}%` }}
            />
          </div>
          <p>{topicData.progress}%</p>
        </div>
        <p className="w-2xl text-justify">{topicData.description}</p>
      </div>
    </section>
  );
}
