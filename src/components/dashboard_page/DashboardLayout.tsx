import Header from './Header';
import ProgressTracker from './ProgressTracker';
import StatsSection from './StatsSection';

export function DashboardLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="flex items-center justify-around">
        <ProgressTracker />
        <StatsSection />
      </main>
    </div>
  );
}
