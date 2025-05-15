import Navbar from '@/components/app_page/Navbar';
import { TopicContentPageContent } from '@/components/topics_page/TopicContentPageContent';

export default function TopicContentsPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <main className="flex-grow pb-6">
        <TopicContentPageContent />
      </main>
    </div>
  );
}
