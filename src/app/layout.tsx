import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import { LanguageProvider } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';
import AuthModal from '@/components/AuthModal';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'ProTemp | Personal Portfolio & CV Builder',
  description: 'Design, customize sections and colors, rate templates, and deploy your portfolio & ATS CV.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased min-h-screen flex flex-col bg-slate-950 text-slate-100">
        <LanguageProvider>
          <AppProvider>
            <Navbar />
            <div className="flex-1 flex flex-col">
              {children}
            </div>
            <AuthModal />
          </AppProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
