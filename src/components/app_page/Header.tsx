'use client';

import Navbar from './Navbar';
import UserGreeting from './UserGreeting';
import { useUser } from '@/contexts/UserContext';
import { SkeletonBox } from '../ui/skeleton-box';

export default function Header() {
  const { user, loading } = useUser();

  return (
    <header className="w-full relative p-4 border-b border-slate-200 bg-white">
      <Navbar />
      {loading ? (
        <div className="mt-2 md:mt-4 md:ml-18">
          <SkeletonBox width="w-40" height="h-6" />
          <SkeletonBox width="w-64" height="h-4" className="mt-2" />
        </div>
      ) : (
        user && (
          <UserGreeting name={user.name} lastAccess={user.lastAccess || ''} />
        )
      )}
    </header>
  );
}
