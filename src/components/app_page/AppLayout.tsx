import Header from './Header';
import ProgressTracker from './ProgressTracker';
import StatsSection from './StatsSection';
import Footer from './Footer';
import TopicList from './TopicList';

export function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="flex flex-col">
        <section className="flex flex-col md:flex-row md:items-start items-stretch justify-center md:gap-x-8 gap-3 px-6 py-8">
          <div className="md:flex-[2]">
            <ProgressTracker />
          </div>
          <div className="md:flex-[1]">
            <StatsSection />
          </div>
        </section>
        <section>
          <TopicList />
        </section>
      </main>
      <Footer />
    </div>
  );
}
