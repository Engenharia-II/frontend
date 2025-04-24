import { ReactNode } from 'react';
import clsx from 'clsx';

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: number;
  color: string;
  bgColor: string;
}

export default function StatCard({
  icon,
  label,
  value,
  color,
  bgColor
}: StatCardProps) {
  return (
    <div className="bg-white shadow-slate-200 border-slate-200 border w-full overflow-hidden pl-7 pr-3 py-6 rounded-lg border-solid px-5">
      <div className="flex items-center justify-center gap-3 md:items-start md:justify-start md:gap-0">
        <div
          className={clsx(
            'flex items-center justify-center text-2xl p-4 rounded-4xl font-bold',
            color,
            bgColor
          )}
        >
          {icon}
        </div>
        <div className="md:ml-5 w-full ml-0">
          <div>
            <div className="text-gray-600 text-md font-normal leading-loose">
              {label}
            </div>
            <div className="text-xl font-bold leading-none">{value}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
