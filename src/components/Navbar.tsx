'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { useLang } from '@/context/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { 
  Sparkles, 
  Layout, 
  Edit3, 
  Globe, 
  User, 
  LogOut, 
  LogIn, 
  ExternalLink,
  CheckCircle2,
  Share2
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { user, isLoggedIn, logout, openAuthModal, activeDocument, publishDocument } = useApp();
  const { t } = useLang();
  const [publishedSlug, setPublishedSlug] = React.useState<string | null>(null);

  const handlePublish = () => {
    const slug = publishDocument();
    setPublishedSlug(slug);
    setTimeout(() => setPublishedSlug(null), 4000);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-[1px] shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <span className="font-bold text-lg text-white tracking-tight flex items-center gap-1.5">
              ProTemp <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-medium">Studio</span>
            </span>
            <span className="text-[11px] block text-slate-400 -mt-0.5 font-normal">{t('nav.subtitle')}</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          <Link
            href="/"
            className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-2 ${
              pathname === '/' 
                ? 'text-white bg-slate-800/70 border border-slate-700/50' 
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Layout className="w-4 h-4 text-cyan-400" />
            {t('nav.templates')}
          </Link>
          <Link
            href="/editor"
            className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-2 ${
              pathname === '/editor' 
                ? 'text-white bg-slate-800/70 border border-slate-700/50' 
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Edit3 className="w-4 h-4 text-blue-400" />
            {t('nav.editor')}
          </Link>
          {activeDocument?.slug && (
            <Link
              href={`/p/${activeDocument.slug}`}
              target="_blank"
              className="px-3.5 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors flex items-center gap-1.5"
            >
              <Globe className="w-4 h-4 text-emerald-400" />
              {t('nav.publicView')}
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </Link>
          )}
        </nav>

        {/* Actions & Auth status */}
        <div className="flex items-center gap-2">
          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* Quick Publish / Deploy Button */}
          <button
            onClick={handlePublish}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-md shadow-blue-500/20 active:scale-95 transition-all"
          >
            {publishedSlug ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>{t('nav.deployed')}</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t('nav.deploy')}</span>
              </>
            )}
          </button>

          {/* User profile / Guest Login */}
          {isLoggedIn && user ? (
            <div className="flex items-center gap-2.5 ps-2 border-s border-slate-800">
              <div className="flex items-center gap-2">
                <img
                  src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                  alt={user.name}
                  className="w-8 h-8 rounded-full border border-slate-700 object-cover"
                />
                <div className="hidden lg:block text-left text-xs">
                  <p className="font-semibold text-slate-200 leading-tight">{user.name}</p>
                  <p className="text-slate-400 text-[10px] truncate max-w-[110px]">{user.headline || t('nav.member')}</p>
                </div>
              </div>
              <button
                onClick={logout}
                title={t('nav.logout')}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-900 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => openAuthModal()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800/80 text-xs font-medium transition-colors"
            >
              <LogIn className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">{t('nav.login')}</span>
            </button>
          )}
        </div>

      </div>
    </header>
  );
}
