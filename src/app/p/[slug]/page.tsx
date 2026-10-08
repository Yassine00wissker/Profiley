'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import LivePreview from '@/components/renderer/LivePreview';
import Link from 'next/link';
import { Sparkles, Edit3, ArrowLeft, Globe } from 'lucide-react';

export default function PublicPortfolioPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const { deployedDocuments, activeDocument } = useApp();

  // Find deployed document by slug, or fallback to activeDocument if matching, or default
  const doc = deployedDocuments[slug] || (activeDocument.slug === slug ? activeDocument : activeDocument);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col relative">
      
      {/* Top Banner for Visitors */}
      <div className="sticky top-0 z-40 w-full bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80 px-4 py-2 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-slate-300">
          <Globe className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-semibold text-white">Live Public Preview:</span>
          <span className="text-slate-400 font-mono">/p/{slug}</span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/editor"
            className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Customize This Site</span>
          </Link>
          <Link
            href="/"
            className="px-2.5 py-1 rounded-lg border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            All Templates
          </Link>
        </div>
      </div>

      {/* Render Document */}
      <main className="flex-1">
        <LivePreview document={doc} isPublicView={true} />
      </main>

      {/* Floating CTA Badge */}
      <div className="fixed bottom-4 right-4 z-40">
        <Link
          href="/"
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-900/90 border border-slate-700/80 text-white text-xs font-semibold shadow-2xl backdrop-blur-md hover:border-blue-500/50 hover:scale-105 transition-all group"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-12 transition-transform" />
          <span>Made with <strong className="text-blue-400">ProTemp</strong> • Build Yours</span>
        </Link>
      </div>

    </div>
  );
}
