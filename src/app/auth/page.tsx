import AuthLayout from '@/components/auth_page/AuthLayout';
import Footer from '@/components/auth_page/Footer';

export default function AuthPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-t from-slate-900 to-slate-800">
      <AuthLayout />
      <Footer />
    </div>
  );
}
