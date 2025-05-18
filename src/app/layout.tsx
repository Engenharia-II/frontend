import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { UserProvider } from '@/contexts/UserContext';

export const metadata: Metadata = {
  title: 'Caminho Dev',
  description: 'Construa sua carreira',
  icons: {
    icon: '/assets/logos/caminho_dev_logo_svg.svg'
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          {children}
          <Toaster richColors />
        </UserProvider>
      </body>
    </html>
  );
}
