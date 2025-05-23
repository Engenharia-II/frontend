import { FC } from 'react';
import Link from 'next/link';
import { TiArrowRight } from 'react-icons/ti';
import {
  FaBook,
  FaCheckCircle,
  FaHourglassHalf,
  FaRegCircle
} from 'react-icons/fa';

type SubjectProps = {
  subject: {
    id: string;
    name: string;
    description: string;
    status?: 'not_started' | 'in_progress' | 'completed';
    startedAt?: string | null;
    finishedAt?: string | null;
  };
};

const SubjectCard: FC<SubjectProps> = ({ subject }) => {
  const getStatusInfo = () => {
    switch (subject.status) {
      case 'completed':
        return {
          icon: <FaCheckCircle className="text-green-500" />,
          text: 'Concluído',
          color: 'text-green-600',
          bg: 'bg-green-100'
        };
      case 'in_progress':
        return {
          icon: <FaHourglassHalf className="text-blue-500" />,
          text: 'Em andamento',
          color: 'text-blue-600',
          bg: 'bg-blue-100'
        };
      default:
        return {
          icon: <FaRegCircle className="text-gray-500" />,
          text: 'Não iniciado',
          color: 'text-gray-600',
          bg: 'bg-gray-100'
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <div className="flex flex-col h-full bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="p-6 flex-grow">
        <div className="flex items-start justify-between">
          <div className="bg-blue-100 p-2 rounded-lg">
            <FaBook className="text-2xl text-blue-600" />
          </div>
          <div
            className={`${statusInfo.bg} px-3 py-1 rounded-full flex items-center gap-1.5`}
          >
            {statusInfo.icon}
            <span className={`text-sm font-medium ${statusInfo.color}`}>
              {statusInfo.text}
            </span>
          </div>
        </div>

        <h2 className="text-xl font-semibold mt-4 text-gray-900">
          {subject.name}
        </h2>
        <p className="mt-2 text-gray-600 line-clamp-3">{subject.description}</p>
      </div>

      <div className="p-6 pt-0 mt-auto">
        <Link
          href={`/app/subjects/topics?subjectId=${subject.id}`}
          className="flex items-center justify-between w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium py-2.5 px-4 rounded-lg transition-colors group"
        >
          <span>Ver Tópicos</span>
          <TiArrowRight className="text-xl group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default SubjectCard;
