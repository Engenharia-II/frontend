import Header from '@/components/app_page/Header';
import { TopicContentPageContent } from '@/components/topics_page/TopicContentPageContent';

export default function TopicContentsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors flex flex-col">
      <Header />
      <main className="flex-grow pb-6">
        <TopicContentPageContent />
      </main>
    </div>
  );
}
