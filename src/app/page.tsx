'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { useLang } from '@/context/LanguageContext';
import TemplateCard from '@/components/TemplateCard';
import { DocumentType } from '@/types';
import { 
  Sparkles, 
  Layout, 
  Layers, 
  Palette, 
  ArrowRight, 
  CheckCircle2, 
  Star, 
  FileText, 
  Globe, 
  ShieldCheck,
  Zap,
  TrendingUp
} from 'lucide-react';

export default function HomePage() {
  const { templates } = useApp();
  const { t } = useLang();
  const [selectedType, setSelectedType] = useState<DocumentType | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredTemplates = templates.filter((tmpl) => {
    if (selectedType !== 'all' && tmpl.type !== selectedType) return false;
    if (selectedCategory !== 'all' && tmpl.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        tmpl.title.toLowerCase().includes(q) ||
        tmpl.description.toLowerCase().includes(q) ||
        tmpl.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-16 pb-20 border-b border-slate-800/60">
        
        {/* Ambient Gradient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-600/20 via-indigo-600/15 to-cyan-500/20 blur-[130px] pointer-events-none rounded-full" />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-semibold text-cyan-400 shadow-xl backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('home.badge')}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
            {t('home.heroTitle1')}{' '}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
              {t('home.heroTitle2')}
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {t('home.heroDesc')}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <Link
              href="/editor"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-xl shadow-blue-500/25 active:scale-95 transition-all"
            >
              <span>{t('home.cta.launch')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="#templates"
              className="px-6 py-3 rounded-xl border border-slate-800 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white font-semibold text-xs sm:text-sm transition-colors"
            >
              {t('home.cta.browse')}
            </a>
          </div>

          {/* Feature Highlights Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 max-w-4xl mx-auto text-start">
            <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-sm">
              <Layers className="w-4 h-4 text-blue-400 mb-2" />
              <h4 className="text-xs font-bold text-white">{t('home.feat.modular.title')}</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">{t('home.feat.modular.desc')}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-sm">
              <Palette className="w-4 h-4 text-cyan-400 mb-2" />
              <h4 className="text-xs font-bold text-white">{t('home.feat.palette.title')}</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">{t('home.feat.palette.desc')}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-sm">
              <Globe className="w-4 h-4 text-emerald-400 mb-2" />
              <h4 className="text-xs font-bold text-white">{t('home.feat.deploy.title')}</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">{t('home.feat.deploy.desc')}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-sm">
              <Star className="w-4 h-4 text-amber-400 mb-2" />
              <h4 className="text-xs font-bold text-white">{t('home.feat.rated.title')}</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">{t('home.feat.rated.desc')}</p>
            </div>
          </div>

        </div>

      </section>

      {/* TEMPLATES DIRECTORY SECTION */}
      <section id="templates" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {t('home.section.title')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {t('home.section.subtitle')}
            </p>
          </div>

          {/* Filter Tabs by Type */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-medium">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                selectedType === 'all'
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t('home.filter.all')}
            </button>
            <button
              onClick={() => setSelectedType('portfolio')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                selectedType === 'portfolio'
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t('home.filter.portfolios')}
            </button>
            <button
              onClick={() => setSelectedType('cv')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                selectedType === 'cv'
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t('home.filter.cvs')}
            </button>
          </div>
        </div>

        {/* Category Pills & Search */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <div className="flex flex-wrap items-center gap-1.5">
            {(['all', 'Tech', 'Creative', 'Executive'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs transition-colors border ${
                  selectedCategory === cat
                    ? 'border-cyan-500/60 bg-cyan-500/10 text-cyan-300 font-semibold'
                    : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white'
                }`}
              >
                {cat === 'all' ? t('home.cat.all') : t(`home.cat.${cat}`)}
              </button>
            ))}
          </div>

          <div className="w-full sm:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('home.search.placeholder')}
              className="w-full px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>

      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 text-center text-xs text-slate-500">
        <p>{t('footer.copy')}</p>
      </footer>

    </div>
  );
}
