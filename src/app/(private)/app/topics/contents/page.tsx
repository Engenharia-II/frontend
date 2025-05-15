import DashboardHeader from '@/components/app_page/dashboard/DashboardHeader';
import { TopicContentPageContent } from '@/components/topics_page/TopicContentPageContent';

export default function TopicContentsPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <DashboardHeader />
      <main className="flex-grow pb-6">
        <TopicContentPageContent />
      </main>
    </div>
  );
}
