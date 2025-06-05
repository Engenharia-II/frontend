import { UserStatsType } from '@/@types/AppTypes/UserStatsType';
import { Card } from '@/components/ui/card';
import {
  FaBookmark,
  FaGraduationCap,
  FaTrophy,
  FaUserGraduate
} from 'react-icons/fa';

export default function StatsOverview(stats: UserStatsType) {
  const statCards = [
    {
      name: 'Disciplinas em Andamento',
      value: stats?.subjectsInProgress || 0,
      icon: <FaGraduationCap className="text-blue-500" size={24} />,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      name: 'Tópicos Concluídos',
      value: stats?.completedTopics || 0,
      icon: <FaTrophy className="text-green-500" size={24} />,
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      name: 'Conteúdos Salvos',
      value: stats?.savedContents || 0,
      icon: <FaBookmark className="text-amber-500" size={24} />,
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-700'
    },
    {
      name: 'Disciplinas Concluídas',
      value: stats?.completedSubjects || 0,
      icon: <FaUserGraduate className="text-indigo-500" size={24} />,
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-700'
    }
  ];

  return (
    <>
      {statCards.map((stat, index) => (
        <Card
          key={index}
          className="p-6 hover:shadow-md transition-shadow bg-white dark:bg-gray-900"
        >
          <div className="flex items-start">
            <div className={`p-3 rounded-full ${stat.bgColor} mr-4`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500">{stat.name}</p>
              <h4 className={`text-2xl font-bold ${stat.textColor}`}>
                {stat.value}
              </h4>
            </div>
          </div>
        </Card>
      ))}
    </>
  );
}
