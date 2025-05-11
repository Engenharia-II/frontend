import { ActivityType } from '@/@types/AppTypes/ActivityType';
import Link from 'next/link';
import ActivityItem from './ActivityItem';
import { TiArrowRight } from 'react-icons/ti';

interface ActivityListProps {
  activities: ActivityType[];
}

export default function ActivityList({ activities }: ActivityListProps) {
  return (
    <div className="mx-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Atividades Recentes</h1>
        <Link
          href={'/user_activities'}
          className="flex items-center justify-center bg-white hover:bg-slate-100 border rounded-lg border-slate-300 shadow-slate-200 px-4 py-2 font-semibold group"
        >
          Ver tudo
          <TiArrowRight className="text-2xl group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
      <div className="bg-white border border-slate-200 rounded-xl shadow-slate-200">
        {activities.map((activity, index) => (
          <ActivityItem key={index} activity={activity} />
        ))}
      </div>
    </div>
  );
}
