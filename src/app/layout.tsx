import type { Metadata } from 'next';
import './globals.css';

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
      <body>{children}</body>
    </html>
  );
}
