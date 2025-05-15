import DashboardHeader from '@/components/app_page/dashboard/DashboardHeader';
import { SubjectTopicsContent } from '@/components/subjects_page/SubjectTopicsContent';

export default function Topics() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <DashboardHeader />
      <main className="flex-grow pb-6">
        <SubjectTopicsContent />
      </main>
    </div>
  );
}
