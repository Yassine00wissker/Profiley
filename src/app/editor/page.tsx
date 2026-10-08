'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import SectionEditor from '@/components/editor/SectionEditor';
import ThemeCustomizer from '@/components/editor/ThemeCustomizer';
import LivePreview from '@/components/renderer/LivePreview';
import { 
  Layers, 
  Palette, 
  Settings, 
  Smartphone, 
  Monitor, 
  Globe, 
  Share2, 
  CheckCircle2, 
  FileText, 
  ArrowLeft,
  Sparkles,
  UserCheck
} from 'lucide-react';

export default function EditorPage() {
  const { 
    activeDocument, 
    publishDocument, 
    isLoggedIn, 
    openAuthModal,
    user
  } = useApp();

  const [activeTab, setActiveTab] = useState<'sections' | 'theme' | 'settings'>('sections');
  const [viewportMode, setViewportMode] = useState<'desktop' | 'mobile'>('desktop');
  const [justPublished, setJustPublished] = useState(false);

  const handleDeploy = () => {
    if (!isLoggedIn) {
      // Prompt user to save to profile on deploy, as requested!
      openAuthModal(() => {
        publishDocument();
        setJustPublished(true);
        setTimeout(() => setJustPublished(false), 4000);
      });
    } else {
      publishDocument();
      setJustPublished(true);
      setTimeout(() => setJustPublished(false), 4000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col text-slate-100">
      
      {/* Subheader / Editor Controls Bar */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 px-4 py-2.5 flex items-center justify-between gap-4">
        
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Templates</span>
          </Link>

          <div className="h-4 w-[1px] bg-slate-800" />

          <div className="flex items-center gap-2">
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider ${
              activeDocument.type === 'portfolio'
                ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
            }`}>
              {activeDocument.type === 'portfolio' ? 'Portfolio' : 'CV / Resume'}
            </span>
            <h2 className="text-xs font-bold text-slate-200 hidden sm:block truncate max-w-xs">
              {activeDocument.title}
            </h2>
          </div>
        </div>

        {/* Viewport & Actions */}
        <div className="flex items-center gap-3">
          
          {/* Viewport switch for preview */}
          {activeDocument.type === 'portfolio' && (
            <div className="hidden sm:flex items-center bg-slate-950 rounded-lg p-0.5 border border-slate-800">
              <button
                type="button"
                onClick={() => setViewportMode('desktop')}
                className={`p-1.5 rounded-md text-xs transition-colors ${
                  viewportMode === 'desktop' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'
                }`}
                title="Desktop View"
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setViewportMode('mobile')}
                className={`p-1.5 rounded-md text-xs transition-colors ${
                  viewportMode === 'mobile' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'
                }`}
                title="Mobile View"
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Public Link button if deployed */}
          {activeDocument.slug && (
            <Link
              href={`/p/${activeDocument.slug}`}
              target="_blank"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 hover:bg-slate-800 text-slate-300 text-xs font-medium transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>Public Link</span>
            </Link>
          )}

          {/* Save to Profile or Deploy */}
          {!isLoggedIn ? (
            <button
              onClick={() => openAuthModal()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 text-xs font-medium transition-colors"
            >
              <UserCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Save to Profile</span>
            </button>
          ) : (
            <div className="hidden sm:flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Draft Synced to Profile</span>
            </div>
          )}

          <button
            onClick={handleDeploy}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-md shadow-blue-500/20 active:scale-95 transition-all"
          >
            {justPublished ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                <span>Published!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>{activeDocument.type === 'portfolio' ? 'Deploy Portfolio' : 'Publish CV'}</span>
              </>
            )}
          </button>

        </div>

      </div>

      {/* Main Split Layout: Editor Panel on Left, Live Canvas on Right */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* LEFT: Controls Sidebar */}
        <aside className="w-full lg:w-[420px] xl:w-[460px] border-b lg:border-b-0 lg:border-r border-slate-800 bg-slate-900/90 flex flex-col shrink-0 max-h-[50vh] lg:max-h-[calc(100vh-6.5rem)] overflow-hidden">
          
          {/* Tabs Navigation */}
          <div className="p-3 border-b border-slate-800 grid grid-cols-2 gap-2 bg-slate-950/40">
            <button
              onClick={() => setActiveTab('sections')}
              className={`py-2 px-3 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-all ${
                activeTab === 'sections'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Sections & Content</span>
            </button>

            <button
              onClick={() => setActiveTab('theme')}
              className={`py-2 px-3 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-all ${
                activeTab === 'theme'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Style & Colors</span>
            </button>
          </div>

          {/* Active Tab Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5">
            {activeTab === 'sections' && <SectionEditor />}
            {activeTab === 'theme' && <ThemeCustomizer />}
          </div>

        </aside>

        {/* RIGHT: Live Preview Canvas */}
        <main className="flex-1 bg-slate-950/80 p-4 sm:p-8 overflow-y-auto flex justify-center items-start">
          <div 
            className={`w-full transition-all duration-300 ${
              viewportMode === 'mobile' && activeDocument.type === 'portfolio'
                ? 'max-w-sm rounded-[36px] overflow-hidden border-8 border-slate-800 shadow-2xl my-6'
                : 'w-full'
            }`}
          >
            <LivePreview document={activeDocument} />
          </div>
        </main>

      </div>

    </div>
  );
}
