import Navbar from './Navbar';
import UserGreeting from './UserGreeting';

export default function Header() {
  return (
    <header className="relative p-4 border-b-1 border-slate-200 bg-white">
      <Navbar />
      <UserGreeting name="João Silva" lastAccess="Hoje, 14:30" />
    </header>
  );
}
