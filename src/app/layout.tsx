import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Caminho Dev',
  description: 'Construa sua carreira',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
