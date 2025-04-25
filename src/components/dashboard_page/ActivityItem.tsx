import { ActivityType } from '@/@types/DashboardTypes/ActivityType';
import clsx from 'clsx';

interface ActivityListProps {
  activity: ActivityType;
}

export default function ActivityItem({ activity }: ActivityListProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 px-4 py-4">
      <div className={clsx('text-xl p-2', activity.color)}>{activity.icon}</div>
      <div>
        <p className="font-medium">{activity.title}</p>
        <div className="flex items-center gap-2 text-gray-500">
          <p>{activity.status}</p>
          <p>•</p>
          <p>{activity.time}</p>
        </div>
      </div>
    </div>
  );
}
