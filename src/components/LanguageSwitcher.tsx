'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLang } from '@/context/LanguageContext';
import { LOCALES, Locale } from '@/i18n/translations';
import { Languages, ChevronDown, Check } from 'lucide-react';

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = LOCALES.find((l) => l.code === locale)!;

  // Close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Switch language"
        aria-expanded={open}
        aria-haspopup="listbox"
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-700/60 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-medium transition-all group"
      >
        <Languages className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
        <span className="hidden sm:inline">{current.nativeLabel}</span>
        <span className="sm:hidden uppercase font-bold tracking-wider text-[10px]">{current.code}</span>
        <ChevronDown
          className={`w-3 h-3 text-slate-500 group-hover:text-slate-300 transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          role="listbox"
          aria-label="Select language"
          className="absolute end-0 top-full mt-2 w-44 rounded-xl border border-slate-700/60 bg-slate-900 shadow-2xl shadow-black/40 overflow-hidden z-[999] animate-in fade-in slide-in-from-top-1 duration-150"
        >
          {/* Header */}
          <div className="px-3 py-2 border-b border-slate-800 flex items-center gap-1.5">
            <Languages className="w-3 h-3 text-cyan-400" />
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Language</span>
          </div>

          {LOCALES.map((lang) => {
            const isActive = lang.code === locale;
            return (
              <button
                key={lang.code}
                role="option"
                aria-selected={isActive}
                onClick={() => {
                  setLocale(lang.code as Locale);
                  setOpen(false);
                }}
                className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 text-sm transition-colors ${
                  isActive
                    ? 'bg-blue-600/15 text-white'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {/* Language flag badge */}
                  <span
                    className={`text-[10px] font-black uppercase px-1.5 py-0.5 rounded-md tracking-wider ${
                      isActive
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    {lang.code}
                  </span>
                  <span className="font-medium">{lang.nativeLabel}</span>
                </div>
                {isActive && <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
