import Header from './Header';
import ProgressTracker from './ProgressTracker';

export function DashboardLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="flex items-center justify-center">
        <div className="w-2/3">
          <ProgressTracker />
        </div>
      </main>
    </div>
  );
}
