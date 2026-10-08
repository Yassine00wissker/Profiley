'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Template } from '@/types';
import { X, Star, MessageSquare, Send, Sparkles } from 'lucide-react';

interface TemplateReviewsModalProps {
  template: Template;
  onClose: () => void;
}

export default function TemplateReviewsModal({ template, onClose }: TemplateReviewsModalProps) {
  const { reviews, addReview, isLoggedIn, openAuthModal } = useApp();
  const templateReviews = reviews[template.id] || [];

  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    addReview(template.id, rating, comment.trim());
    setComment('');
    setHasSubmitted(true);
    setTimeout(() => setHasSubmitted(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl max-h-[85vh] flex flex-col bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl text-slate-100 overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-semibold uppercase tracking-wider">
                {template.type}
              </span>
              <div className="flex items-center gap-1 text-amber-400 text-xs font-semibold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{template.averageRating.toFixed(1)}</span>
                <span className="text-slate-500 font-normal">({templateReviews.length} reviews)</span>
              </div>
            </div>
            <h3 className="text-lg font-bold text-white leading-tight">{template.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Reviews List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-slate-800/60">
          {templateReviews.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-xs">
              <MessageSquare className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <p>No reviews yet for this template. Be the first to rate it!</p>
            </div>
          ) : (
            templateReviews.map((rev) => (
              <div key={rev.id} className="pt-4 first:pt-0">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={rev.userAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'}
                      alt={rev.userName}
                      className="w-7 h-7 rounded-full object-cover border border-slate-700"
                    />
                    <div>
                      <p className="text-xs font-semibold text-slate-200">{rev.userName}</p>
                      <p className="text-[10px] text-slate-500">{rev.createdAt}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3.5 h-3.5 ${
                          s <= rev.rating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-700'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-slate-300 pl-9 leading-relaxed">{rev.comment}</p>
              </div>
            ))
          )}
        </div>

        {/* Submit Review Form */}
        <div className="p-5 border-t border-slate-800 bg-slate-950/60">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300">Rate this template:</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        star <= (hoverRating || rating)
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-slate-600'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="relative">
              <textarea
                required
                rows={2}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts on design, layout, or typography..."
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none pr-20"
              />
              <button
                type="submit"
                className="absolute right-2 bottom-3 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <Send className="w-3 h-3" />
                Post
              </button>
            </div>

            {hasSubmitted && (
              <p className="text-[11px] text-emerald-400 font-medium animate-in fade-in">
                Thank you! Your rating and feedback have been published.
              </p>
            )}
          </form>
        </div>

      </div>
    </div>
  );
}
