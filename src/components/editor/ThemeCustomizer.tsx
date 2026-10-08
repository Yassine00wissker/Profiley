'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Palette, Type, Square, Sparkles } from 'lucide-react';

const PRESET_THEMES = [
  {
    name: 'Midnight Sapphire',
    primaryColor: '#3b82f6',
    accentColor: '#06b6d4',
    backgroundColor: '#090d16',
    cardColor: '#131b2e',
    textColor: '#f8fafc',
    fontFamily: 'sans' as const,
  },
  {
    name: 'Purple Aura',
    primaryColor: '#a855f7',
    accentColor: '#f43f5e',
    backgroundColor: '#0c0a13',
    cardColor: '#171226',
    textColor: '#faf5ff',
    fontFamily: 'serif' as const,
  },
  {
    name: 'Emerald Lead',
    primaryColor: '#10b981',
    accentColor: '#38bdf8',
    backgroundColor: '#06130d',
    cardColor: '#0b2419',
    textColor: '#f0fdf4',
    fontFamily: 'sans' as const,
  },
  {
    name: 'Minimal Paper (Light)',
    primaryColor: '#2563eb',
    accentColor: '#4f46e5',
    backgroundColor: '#ffffff',
    cardColor: '#f8fafc',
    textColor: '#0f172a',
    fontFamily: 'sans' as const,
  },
  {
    name: 'Amber Terminal',
    primaryColor: '#f59e0b',
    accentColor: '#10b981',
    backgroundColor: '#0c0a09',
    cardColor: '#1c1917',
    textColor: '#fafaf9',
    fontFamily: 'mono' as const,
  },
];

export default function ThemeCustomizer() {
  const { activeDocument, updateTheme } = useApp();
  const { theme } = activeDocument;

  return (
    <div className="space-y-6 text-xs text-slate-200">
      
      {/* Preset Palettes */}
      <div>
        <h4 className="font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          Curated Palettes
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {PRESET_THEMES.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => updateTheme(preset)}
              className="p-2.5 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-slate-750 text-left transition-all hover:scale-[1.02]"
            >
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="w-3 h-3 rounded-full border border-black/30" style={{ backgroundColor: preset.primaryColor }} />
                <span className="w-3 h-3 rounded-full border border-black/30" style={{ backgroundColor: preset.accentColor }} />
                <span className="w-3 h-3 rounded-full border border-black/30" style={{ backgroundColor: preset.backgroundColor }} />
              </div>
              <p className="font-semibold text-[11px] text-slate-200">{preset.name}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Granular Color Pickers */}
      <div className="space-y-3">
        <h4 className="font-semibold text-slate-300 flex items-center gap-1.5">
          <Palette className="w-3.5 h-3.5 text-cyan-400" />
          Color Adjustments
        </h4>

        {/* Primary Color */}
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800">
          <div>
            <span className="font-medium text-slate-300 block">Primary Brand Color</span>
            <span className="text-[10px] text-slate-500">Buttons, titles, accents</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] text-slate-400 uppercase">{theme.primaryColor}</span>
            <input
              type="color"
              value={theme.primaryColor}
              onChange={(e) => updateTheme({ primaryColor: e.target.value })}
              className="w-7 h-7 rounded-lg border-0 cursor-pointer bg-transparent"
            />
          </div>
        </div>

        {/* Accent Color */}
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800">
          <div>
            <span className="font-medium text-slate-300 block">Secondary / Accent</span>
            <span className="text-[10px] text-slate-500">Subheadings & tags</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] text-slate-400 uppercase">{theme.accentColor}</span>
            <input
              type="color"
              value={theme.accentColor}
              onChange={(e) => updateTheme({ accentColor: e.target.value })}
              className="w-7 h-7 rounded-lg border-0 cursor-pointer bg-transparent"
            />
          </div>
        </div>

        {/* Background Color */}
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800">
          <div>
            <span className="font-medium text-slate-300 block">Page Background</span>
            <span className="text-[10px] text-slate-500">Dark / Light canvas</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] text-slate-400 uppercase">{theme.backgroundColor}</span>
            <input
              type="color"
              value={theme.backgroundColor}
              onChange={(e) => updateTheme({ backgroundColor: e.target.value })}
              className="w-7 h-7 rounded-lg border-0 cursor-pointer bg-transparent"
            />
          </div>
        </div>

        {/* Card Color */}
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800">
          <div>
            <span className="font-medium text-slate-300 block">Card & Container Tone</span>
            <span className="text-[10px] text-slate-500">Section boxes & cards</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] text-slate-400 uppercase">{theme.cardColor}</span>
            <input
              type="color"
              value={theme.cardColor}
              onChange={(e) => updateTheme({ cardColor: e.target.value })}
              className="w-7 h-7 rounded-lg border-0 cursor-pointer bg-transparent"
            />
          </div>
        </div>

        {/* Text Color */}
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800">
          <div>
            <span className="font-medium text-slate-300 block">Main Text Color</span>
            <span className="text-[10px] text-slate-500">Paragraphs & body</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] text-slate-400 uppercase">{theme.textColor}</span>
            <input
              type="color"
              value={theme.textColor}
              onChange={(e) => updateTheme({ textColor: e.target.value })}
              className="w-7 h-7 rounded-lg border-0 cursor-pointer bg-transparent"
            />
          </div>
        </div>
      </div>

      {/* Typography Selector */}
      <div>
        <h4 className="font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
          <Type className="w-3.5 h-3.5 text-indigo-400" />
          Typography Pairing
        </h4>
        <div className="grid grid-cols-3 gap-2">
          {(['sans', 'serif', 'mono'] as const).map((font) => (
            <button
              key={font}
              type="button"
              onClick={() => updateTheme({ fontFamily: font })}
              className={`p-2.5 rounded-xl border text-center transition-all ${
                theme.fontFamily === font
                  ? 'border-blue-500 bg-blue-500/10 text-white font-semibold'
                  : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              <span className={`block capitalize text-xs ${font === 'serif' ? 'font-serif' : font === 'mono' ? 'font-mono' : 'font-sans'}`}>
                {font}
              </span>
              <span className="text-[9px] text-slate-500">
                {font === 'sans' ? 'Modern Clean' : font === 'serif' ? 'Editorial' : 'Technical'}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Border Radius */}
      <div>
        <h4 className="font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
          <Square className="w-3.5 h-3.5 text-emerald-400" />
          Corner Styling
        </h4>
        <div className="grid grid-cols-4 gap-1.5">
          {(['none', 'sm', 'md', 'lg'] as const).map((radius) => (
            <button
              key={radius}
              type="button"
              onClick={() => updateTheme({ borderRadius: radius })}
              className={`p-2 rounded-lg border text-center text-[10px] capitalize transition-all ${
                theme.borderRadius === radius
                  ? 'border-blue-500 bg-blue-500/10 text-white font-semibold'
                  : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              {radius}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
