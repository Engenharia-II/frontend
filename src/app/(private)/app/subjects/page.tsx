import Header from '@/components/app_page/Header';
import { AllSubjectsPageContent } from '@/components/subjects_page/AllSubjectsPageContent';

export default function Subjects() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors flex flex-col">
      <Header />
      <main className="flex-1">
        <AllSubjectsPageContent />
      </main>
    </div>
  );
}
