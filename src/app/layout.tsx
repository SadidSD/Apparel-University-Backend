import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/Sidebar';

export const metadata: Metadata = {
  title: 'Sedap Admin Dashboard',
  description: 'Modern Admin Dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#F3F4F6] text-gray-800">
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1 ml-64 p-8">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
