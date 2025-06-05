import { FC } from 'react';
import { FaBookOpen, FaCheckCircle, FaHourglassHalf } from 'react-icons/fa';

type StatsCardProps = {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  bgColor: string;
  textColor: string;
};

const StatsCard: FC<StatsCardProps> = ({
  title,
  value,
  icon,
  bgColor,
  textColor
}) => (
  <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-black dark:border-gray-700 p-6 flex items-center">
    <div className={`${bgColor} p-3 rounded-lg mr-4`}>{icon}</div>
    <div>
      <h3 className="text-gray-500 dark:text-gray-400 font-medium text-sm">
        {title}
      </h3>
      <p className={`text-2xl font-bold ${textColor}`}>{value}</p>
    </div>
  </div>
);

type SubjectsStatsProps = {
  subjects: Array<{
    status?: 'not_started' | 'in_progress' | 'completed';
  }>;
};

export const SubjectsStats: FC<SubjectsStatsProps> = ({ subjects }) => {
  const totalSubjects = subjects.length;
  const completedSubjects = subjects.filter(
    (s) => s.status === 'completed'
  ).length;
  const inProgressSubjects = subjects.filter(
    (s) => s.status === 'in_progress'
  ).length;

  const completionRate =
    totalSubjects > 0
      ? Math.round((completedSubjects / totalSubjects) * 100)
      : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatsCard
        title="Total de Disciplinas"
        value={totalSubjects}
        icon={
          <FaBookOpen className="text-blue-600 dark:text-blue-400 text-xl" />
        }
        bgColor="bg-blue-100 dark:bg-blue-900"
        textColor="text-blue-600 dark:text-blue-400"
      />

      <StatsCard
        title="Em Andamento"
        value={inProgressSubjects}
        icon={
          <FaHourglassHalf className="text-amber-600 dark:text-amber-400 text-xl" />
        }
        bgColor="bg-amber-100 dark:bg-amber-900"
        textColor="text-amber-600 dark:text-amber-400"
      />

      <StatsCard
        title="Concluídas"
        value={completedSubjects}
        icon={
          <FaCheckCircle className="text-green-600 dark:text-green-400 text-xl" />
        }
        bgColor="bg-green-100 dark:bg-green-900"
        textColor="text-green-600 dark:text-green-400"
      />

      <StatsCard
        title="Taxa de Conclusão"
        value={`${completionRate}%`}
        icon={
          <div className="w-6 h-6 rounded-full bg-indigo-600 dark:bg-indigo-400 flex items-center justify-center text-white dark:text-indigo-900 text-sm">
            %
          </div>
        }
        bgColor="bg-indigo-100 dark:bg-indigo-900"
        textColor="text-indigo-600 dark:text-indigo-400"
      />
    </div>
  );
};
