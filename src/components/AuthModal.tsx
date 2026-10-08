'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { useLang } from '@/context/LanguageContext';
import { X, Sparkles, User, Mail, Briefcase, CheckCircle2 } from 'lucide-react';

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, login, activeDocument } = useApp();
  const { t } = useLang();

  // Pre-fill fields from what user might have already typed in the editor!
  const heroSection = activeDocument.sections.find((s) => s.type === 'hero');
  const defaultName = heroSection?.content?.heading?.replace(/^Hi,\s*(I'm|I am)\s*/i, '') || 'Alex Rivera';
  const defaultHeadline = heroSection?.content?.subheading || 'Full-Stack Software Engineer';
  const defaultEmail = heroSection?.content?.contactInfo?.email || 'alex.rivera@example.com';
  const defaultBio = heroSection?.content?.bio || 'Building resilient web software & sleek interfaces.';

  const [name, setName] = useState(defaultName);
  const [headline, setHeadline] = useState(defaultHeadline);
  const [email, setEmail] = useState(defaultEmail);
  const [bio, setBio] = useState(defaultBio);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({
      name,
      headline,
      email,
      bio,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl text-slate-100">
        
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{t('auth.title')}</h3>
            <p className="text-xs text-slate-400">{t('auth.subtitle')}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-medium mb-1 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-blue-400" />
              {t('auth.name')}
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="e.g. Alex Rivera"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
              {t('auth.headline')}
            </label>
            <input
              type="text"
              required
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="e.g. Senior Frontend Engineer & UI Designer"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="alex@example.com"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">
              {t('auth.bio')}
            </label>
            <textarea
              rows={2}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-blue-500 transition-colors resize-none"
              placeholder="Describe your focus, passion, and accomplishments..."
            />
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 active:scale-95 transition-all text-xs"
            >
              <CheckCircle2 className="w-4 h-4" />
              {t('auth.submit')}
            </button>
            <p className="text-[11px] text-center text-slate-500">
              Your edits are preserved and immediately available on your public URL.
            </p>
          </div>
        </form>

      </div>
    </div>
  );
}
