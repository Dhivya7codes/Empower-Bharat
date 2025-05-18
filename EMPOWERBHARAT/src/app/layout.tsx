import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // Using Inter font
import './globals.css';
import { cn } from '@/lib/utils';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { Toaster } from '@/components/ui/toaster';
import { ProfileProvider } from '@/contexts/profile-context';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'EmpowerBharat - Your Career Partner',
  description: 'AI-Powered Career & Skill Development Platform for Bharat',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          inter.variable
        )}
      >
        <ProfileProvider>
          <SidebarProvider defaultOpen>
            <div className="flex min-h-screen">
              <AppSidebar />
              <SidebarInset className="flex-1 overflow-auto">
                 {/* Adjusted padding for a more spacious and polished feel */}
                 <main className="p-6 md:p-10 lg:p-12">{children}</main>
              </SidebarInset>
            </div>
          </SidebarProvider>
          <Toaster />
        </ProfileProvider>
      </body>
    </html>
  );
}
