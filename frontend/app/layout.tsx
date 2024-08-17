import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import Navbar from '@/components/common/Navbar';
import Layout from '@/components/common/Layout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Oasis',
  description: 'Science Oasis',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Layout>
          <div className="flex h-full relative">
            <Navbar />
            {children}
          </div>
        </Layout>
      </body>
    </html>
  );
}
