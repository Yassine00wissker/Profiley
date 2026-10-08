'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Template } from '@/types';
import { useApp } from '@/context/AppContext';
import { Star, MessageSquare, ArrowRight, Eye, Sparkles } from 'lucide-react';
import TemplateReviewsModal from './TemplateReviewsModal';

interface TemplateCardProps {
  template: Template;
}

export default function TemplateCard({ template }: TemplateCardProps) {
  const router = useRouter();
  const { selectTemplate } = useApp();
  const [showReviews, setShowReviews] = useState(false);

  const handleUseTemplate = () => {
    selectTemplate(template);
    router.push('/editor');
  };

  return (
    <>
      <div className="group relative rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10">
        
        {/* Thumbnail & Badges */}
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
          <img
            src={template.thumbnailUrl}
            alt={template.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
          
          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase border backdrop-blur-md ${
              template.type === 'portfolio' 
                ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' 
                : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
            }`}>
              {template.type === 'portfolio' ? 'Web Portfolio' : 'ATS Resume / CV'}
            </span>

            <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-900/80 text-slate-300 border border-slate-700/80 backdrop-blur-md">
              {template.category}
            </span>
          </div>

          {/* Rating button on thumbnail */}
          <button
            onClick={() => setShowReviews(true)}
            className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/85 hover:bg-slate-850 border border-slate-700/80 backdrop-blur-md text-xs font-semibold text-amber-300 transition-colors"
          >
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{template.averageRating.toFixed(1)}</span>
            <span className="text-slate-400 font-normal">({template.reviewCount})</span>
            <MessageSquare className="w-3 h-3 text-slate-400 ml-1" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <h4 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
              {template.title}
            </h4>
            <p className="mt-1 text-xs text-slate-400 line-clamp-2 leading-relaxed">
              {template.description}
            </p>
          </div>

          {/* Action Footer */}
          <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center gap-2">
            <button
              onClick={() => setShowReviews(true)}
              className="px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800 transition-colors flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Reviews</span>
            </button>

            <button
              onClick={handleUseTemplate}
              className="flex-1 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/20 active:scale-95 transition-all"
            >
              <span>Use & Customize</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

      {showReviews && (
        <TemplateReviewsModal
          template={template}
          onClose={() => setShowReviews(false)}
        />
      )}
    </>
  );
}
