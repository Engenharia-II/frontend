import { ReactNode } from 'react';

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
    <div className="bg-white shadow-slate-200 border-slate-200 border w-full overflow-hidden pl-7 pr-3 py-[25px] rounded-lg border-solid max-md:px-5">
      <div className="flex max-md:flex-col max-md:items-stretch">
        <div
          className={`flex items-center justify-center text-2xl p-4 rounded-4xl text-${color} font-bold bg-${bgColor}`}
        >
          {icon}
        </div>
        <div className="w-[78%] ml-5 max-md:w-full max-md:ml-0">
          <div className="h-11 max-md:mt-10">
            <div className="text-gray-600 text-[13px] font-normal leading-loose">
              {label}
            </div>
            <div className="text-[rgba(2,8,23,1)] text-[22px] font-bold leading-none">
              {value}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
