'use client';

import React, { useRef } from 'react';
import { UserDocument, Section } from '@/types';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  ExternalLink, 
  Briefcase, 
  GraduationCap, 
  Code2, 
  Printer, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';

const GithubIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedinIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

interface LivePreviewProps {
  document: UserDocument;
  isPublicView?: boolean;
}

export default function LivePreview({ document, isPublicView = false }: LivePreviewProps) {
  const { theme, sections, type, title } = document;
  const printRef = useRef<HTMLDivElement>(null);

  const visibleSections = [...sections]
    .filter((s) => s.isVisible)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const handlePrint = () => {
    window.print();
  };

  const getFontClass = () => {
    if (theme.fontFamily === 'serif') return 'font-serif';
    if (theme.fontFamily === 'mono') return 'font-mono';
    return 'font-sans';
  };

  const getRadiusClass = () => {
    if (theme.borderRadius === 'none') return 'rounded-none';
    if (theme.borderRadius === 'sm') return 'rounded-md';
    if (theme.borderRadius === 'lg') return 'rounded-2xl';
    if (theme.borderRadius === 'full') return 'rounded-3xl';
    return 'rounded-xl';
  };

  // ==========================================
  // CV / RESUME VIEW
  // ==========================================
  if (type === 'cv') {
    return (
      <div className="w-full flex flex-col items-center">
        {!isPublicView && (
          <div className="w-full max-w-4xl mb-4 flex items-center justify-between px-2">
            <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              ATS-Optimized Printable A4 Format
            </span>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>
          </div>
        )}

        <div
          ref={printRef}
          style={{
            backgroundColor: theme.backgroundColor || '#ffffff',
            color: theme.textColor || '#0f172a',
          }}
          className={`w-full max-w-4xl shadow-2xl p-8 sm:p-12 min-h-[1050px] border border-slate-200/20 ${getFontClass()} ${getRadiusClass()}`}
        >
          {visibleSections.map((sec) => (
            <div key={sec.id} className="mb-8 last:mb-0">
              {/* Header / Summary Section */}
              {sec.type === 'hero' && (
                <div className="border-b pb-6" style={{ borderColor: `${theme.primaryColor}30` }}>
                  <h1 
                    className="text-3xl sm:text-4xl font-black tracking-tight"
                    style={{ color: theme.primaryColor }}
                  >
                    {sec.content.heading}
                  </h1>
                  {sec.content.subheading && (
                    <p className="text-lg font-semibold mt-1 opacity-90">
                      {sec.content.subheading}
                    </p>
                  )}

                  {/* Contact row */}
                  {sec.content.contactInfo && (
                    <div className="flex flex-wrap items-center gap-4 text-xs mt-3 opacity-80">
                      {sec.content.contactInfo.email && (
                        <span className="flex items-center gap-1">
                          <Mail className="w-3.5 h-3.5" />
                          {sec.content.contactInfo.email}
                        </span>
                      )}
                      {sec.content.contactInfo.phone && (
                        <span className="flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5" />
                          {sec.content.contactInfo.phone}
                        </span>
                      )}
                      {sec.content.contactInfo.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {sec.content.contactInfo.location}
                        </span>
                      )}
                      {sec.content.contactInfo.linkedin && (
                        <span className="flex items-center gap-1">
                          <LinkedinIcon className="w-3.5 h-3.5" />
                          LinkedIn
                        </span>
                      )}
                    </div>
                  )}

                  {sec.content.bio && (
                    <p className="text-xs sm:text-sm mt-3 leading-relaxed opacity-85">
                      {sec.content.bio}
                    </p>
                  )}
                </div>
              )}

              {/* Experience Section */}
              {sec.type === 'experience' && (
                <div>
                  <h3 
                    className="text-base font-bold uppercase tracking-wider mb-3 pb-1 border-b"
                    style={{ color: theme.primaryColor, borderColor: `${theme.primaryColor}40` }}
                  >
                    {sec.title}
                  </h3>
                  <div className="space-y-4">
                    {sec.content.items?.map((item) => (
                      <div key={item.id} className="text-xs sm:text-sm">
                        <div className="flex flex-wrap items-baseline justify-between font-semibold">
                          <span className="text-sm font-bold">{item.title}</span>
                          <span className="text-xs opacity-70">{item.period}</span>
                        </div>
                        <div className="flex flex-wrap items-baseline justify-between text-xs opacity-80 mb-1.5 italic">
                          <span>{item.organization}</span>
                          {item.location && <span>{item.location}</span>}
                        </div>
                        {item.description && (
                          <div className="text-xs leading-relaxed opacity-90 whitespace-pre-line">
                            {item.description}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education Section */}
              {sec.type === 'education' && (
                <div>
                  <h3 
                    className="text-base font-bold uppercase tracking-wider mb-3 pb-1 border-b"
                    style={{ color: theme.primaryColor, borderColor: `${theme.primaryColor}40` }}
                  >
                    {sec.title}
                  </h3>
                  <div className="space-y-3">
                    {sec.content.items?.map((item) => (
                      <div key={item.id} className="text-xs sm:text-sm">
                        <div className="flex justify-between font-semibold">
                          <span>{item.title}</span>
                          <span className="text-xs opacity-70">{item.period}</span>
                        </div>
                        <div className="text-xs opacity-80">{item.organization}</div>
                        {item.description && <p className="text-xs mt-1 opacity-90">{item.description}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills Section */}
              {sec.type === 'skills' && (
                <div>
                  <h3 
                    className="text-base font-bold uppercase tracking-wider mb-3 pb-1 border-b"
                    style={{ color: theme.primaryColor, borderColor: `${theme.primaryColor}40` }}
                  >
                    {sec.title}
                  </h3>
                  <div className="space-y-2 text-xs">
                    {sec.content.skillsList?.map((grp, idx) => (
                      <div key={idx} className="flex flex-wrap items-baseline gap-2">
                        <span className="font-semibold min-w-[120px]">{grp.category}:</span>
                        <span className="opacity-90">{grp.items.join(' • ')}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Custom / Other Section */}
              {sec.type === 'custom' && (
                <div>
                  <h3 
                    className="text-base font-bold uppercase tracking-wider mb-2 pb-1 border-b"
                    style={{ color: theme.primaryColor, borderColor: `${theme.primaryColor}40` }}
                  >
                    {sec.title}
                  </h3>
                  {sec.content.subheading && <p className="text-xs font-semibold mb-1">{sec.content.subheading}</p>}
                  <p className="text-xs leading-relaxed opacity-90 whitespace-pre-line">{sec.content.customText}</p>
                </div>
              )}

            </div>
          ))}
        </div>
      </div>
    );
  }

  // ==========================================
  // WEB PORTFOLIO VIEW
  // ==========================================
  return (
    <div 
      style={{ 
        backgroundColor: theme.backgroundColor, 
        color: theme.textColor 
      }} 
      className={`w-full min-h-screen ${getFontClass()} transition-colors duration-300`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        
        {visibleSections.map((sec) => (
          <section key={sec.id} className="relative scroll-mt-20">

            {/* HERO SECTION */}
            {sec.type === 'hero' && (
              <div className="py-12 sm:py-20 flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12">
                <div className="flex-1 space-y-5 text-center md:text-left">
                  <div 
                    className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold rounded-full border backdrop-blur-md"
                    style={{ 
                      backgroundColor: `${theme.primaryColor}15`, 
                      borderColor: `${theme.primaryColor}30`,
                      color: theme.primaryColor
                    }}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Available for New Opportunities
                  </div>

                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                    {sec.content.heading}
                  </h1>

                  {sec.content.subheading && (
                    <p 
                      className="text-lg sm:text-xl font-medium"
                      style={{ color: theme.accentColor }}
                    >
                      {sec.content.subheading}
                    </p>
                  )}

                  {sec.content.bio && (
                    <p className="text-sm sm:text-base leading-relaxed opacity-80 max-w-2xl">
                      {sec.content.bio}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
                    {sec.content.ctaText && (
                      <a
                        href={sec.content.ctaLink || '#projects'}
                        style={{ backgroundColor: theme.primaryColor }}
                        className={`px-5 py-2.5 text-white font-semibold text-xs shadow-lg shadow-blue-500/25 hover:opacity-90 transition-opacity ${getRadiusClass()}`}
                      >
                        {sec.content.ctaText}
                      </a>
                    )}
                    <a
                      href="#contact"
                      style={{ borderColor: `${theme.textColor}30` }}
                      className={`px-5 py-2.5 font-semibold text-xs border hover:bg-white/5 transition-colors ${getRadiusClass()}`}
                    >
                      Contact Me
                    </a>
                  </div>
                </div>

                {sec.content.avatarUrl && (
                  <div className="relative group">
                    <div 
                      className="absolute -inset-1 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity"
                      style={{ background: `radial-gradient(circle, ${theme.primaryColor}, ${theme.accentColor})` }}
                    />
                    <img
                      src={sec.content.avatarUrl}
                      alt="Profile Avatar"
                      className="relative w-36 h-36 sm:w-48 sm:h-48 rounded-full object-cover border-4 shadow-2xl"
                      style={{ borderColor: theme.cardColor }}
                    />
                  </div>
                )}
              </div>
            )}

            {/* PROJECTS SECTION */}
            {sec.type === 'projects' && (
              <div>
                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                      {sec.title}
                    </h2>
                    <div 
                      className="h-1 w-12 mt-2 rounded-full"
                      style={{ backgroundColor: theme.primaryColor }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {sec.content.items?.map((item) => (
                    <div
                      key={item.id}
                      style={{ backgroundColor: theme.cardColor }}
                      className={`overflow-hidden border border-white/5 p-5 flex flex-col justify-between hover:border-white/20 transition-all ${getRadiusClass()}`}
                    >
                      {item.image && (
                        <div className="relative aspect-video rounded-lg overflow-hidden mb-4 bg-black/40">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold text-lg">{item.title}</h3>
                          {item.link && (
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1 hover:opacity-80 transition-opacity"
                              style={{ color: theme.accentColor }}
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                        <p className="text-xs opacity-75 leading-relaxed mb-4">
                          {item.description}
                        </p>
                      </div>

                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
                          {item.tags.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2 py-0.5 text-[10px] font-medium rounded-md"
                              style={{ backgroundColor: `${theme.primaryColor}20`, color: theme.primaryColor }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* EXPERIENCE SECTION */}
            {sec.type === 'experience' && (
              <div>
                <div className="mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                    {sec.title}
                  </h2>
                  <div 
                    className="h-1 w-12 mt-2 rounded-full"
                    style={{ backgroundColor: theme.primaryColor }}
                  />
                </div>

                <div className="space-y-6">
                  {sec.content.items?.map((item) => (
                    <div
                      key={item.id}
                      style={{ backgroundColor: theme.cardColor }}
                      className={`p-6 border border-white/5 hover:border-white/20 transition-all ${getRadiusClass()}`}
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                        <h3 className="text-lg font-bold">{item.title}</h3>
                        <span 
                          className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                          style={{ backgroundColor: `${theme.accentColor}20`, color: theme.accentColor }}
                        >
                          {item.period}
                        </span>
                      </div>
                      <div className="text-xs font-medium opacity-80 mb-3 flex items-center gap-3">
                        <span style={{ color: theme.primaryColor }}>{item.organization}</span>
                        {item.location && <span>• {item.location}</span>}
                      </div>
                      <p className="text-xs opacity-80 leading-relaxed whitespace-pre-line mb-3">
                        {item.description}
                      </p>
                      {item.tags && (
                        <div className="flex flex-wrap gap-1.5">
                          {item.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 text-[10px] rounded-md bg-white/5 border border-white/10"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SKILLS SECTION */}
            {sec.type === 'skills' && (
              <div>
                <div className="mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                    {sec.title}
                  </h2>
                  <div 
                    className="h-1 w-12 mt-2 rounded-full"
                    style={{ backgroundColor: theme.primaryColor }}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {sec.content.skillsList?.map((group, gIdx) => (
                    <div
                      key={gIdx}
                      style={{ backgroundColor: theme.cardColor }}
                      className={`p-5 border border-white/5 ${getRadiusClass()}`}
                    >
                      <h3 
                        className="font-bold text-sm mb-3"
                        style={{ color: theme.primaryColor }}
                      >
                        {group.category}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {group.items.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2.5 py-1 text-xs rounded-lg font-medium border"
                            style={{ 
                              backgroundColor: `${theme.primaryColor}10`,
                              borderColor: `${theme.primaryColor}25`,
                              color: theme.textColor
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CONTACT SECTION */}
            {sec.type === 'contact' && (
              <div id="contact" className="pt-8">
                <div 
                  style={{ backgroundColor: theme.cardColor }}
                  className={`p-8 sm:p-12 border border-white/10 text-center space-y-6 ${getRadiusClass()}`}
                >
                  <h2 className="text-2xl sm:text-4xl font-black">
                    {sec.title}
                  </h2>
                  {sec.content.subheading && (
                    <p className="text-sm opacity-80 max-w-xl mx-auto">
                      {sec.content.subheading}
                    </p>
                  )}

                  {sec.content.contactInfo && (
                    <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium pt-2">
                      {sec.content.contactInfo.email && (
                        <a
                          href={`mailto:${sec.content.contactInfo.email}`}
                          style={{ backgroundColor: theme.primaryColor }}
                          className={`px-4 py-2 text-white font-semibold flex items-center gap-2 hover:opacity-90 ${getRadiusClass()}`}
                        >
                          <Mail className="w-4 h-4" />
                          {sec.content.contactInfo.email}
                        </a>
                      )}
                      {sec.content.contactInfo.github && (
                        <a
                          href={sec.content.contactInfo.github}
                          target="_blank"
                          rel="noreferrer"
                          className={`px-4 py-2 border border-white/20 hover:bg-white/10 flex items-center gap-2 ${getRadiusClass()}`}
                        >
                          <GithubIcon className="w-4 h-4" />
                          GitHub
                        </a>
                      )}
                      {sec.content.contactInfo.linkedin && (
                        <a
                          href={sec.content.contactInfo.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className={`px-4 py-2 border border-white/20 hover:bg-white/10 flex items-center gap-2 ${getRadiusClass()}`}
                        >
                          <LinkedinIcon className="w-4 h-4" />
                          LinkedIn
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* CUSTOM SECTION */}
            {sec.type === 'custom' && (
              <div
                style={{ backgroundColor: theme.cardColor }}
                className={`p-6 sm:p-8 border border-white/5 ${getRadiusClass()}`}
              >
                <h2 className="text-xl sm:text-2xl font-bold mb-2">
                  {sec.title}
                </h2>
                {sec.content.subheading && (
                  <p className="text-xs font-semibold mb-3" style={{ color: theme.accentColor }}>
                    {sec.content.subheading}
                  </p>
                )}
                <div className="text-xs sm:text-sm leading-relaxed opacity-85 whitespace-pre-line">
                  {sec.content.customText}
                </div>
              </div>
            )}

          </section>
        ))}

      </div>
    </div>
  );
}
