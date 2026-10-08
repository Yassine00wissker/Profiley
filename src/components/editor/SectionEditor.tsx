'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Section, SectionType } from '@/types';
import { 
  ChevronUp, 
  ChevronDown, 
  Eye, 
  EyeOff, 
  Trash2, 
  Plus, 
  Edit3, 
  Move, 
  Layers, 
  FolderPlus,
  Sparkles,
  Check
} from 'lucide-react';

export default function SectionEditor() {
  const { 
    activeDocument, 
    addSection, 
    updateSection, 
    deleteSection, 
    reorderSections, 
    toggleSectionVisibility 
  } = useApp();

  const [activeSectionId, setActiveSectionId] = useState<string | null>(
    activeDocument.sections[0]?.id || null
  );
  const [showAddMenu, setShowAddMenu] = useState(false);

  const activeSection = activeDocument.sections.find((s) => s.id === activeSectionId);

  const availableSectionTypes: Array<{ type: SectionType; label: string; desc: string }> = [
    { type: 'hero', label: 'Hero / Bio', desc: 'Main headline, avatar, summary and CTA' },
    { type: 'experience', label: 'Work Experience', desc: 'Job history, achievements, and dates' },
    { type: 'projects', label: 'Projects Showcase', desc: 'Case studies, apps, links and tags' },
    { type: 'skills', label: 'Skills & Toolkit', desc: 'Categorized technical/design skills' },
    { type: 'education', label: 'Education', desc: 'Degrees, certifications, universities' },
    { type: 'contact', label: 'Contact Details', desc: 'Social channels, email, phone' },
    { type: 'custom', label: 'Custom Section', desc: 'Freeform text, achievements, awards' },
  ];

  return (
    <div className="space-y-6 text-xs text-slate-200">
      
      {/* Top Controls: Add Section */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setShowAddMenu(!showAddMenu)}
          className="w-full py-2.5 px-4 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-400 font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Section</span>
        </button>

        {showAddMenu && (
          <div className="absolute top-12 left-0 right-0 z-30 bg-slate-900 border border-slate-750 rounded-xl shadow-2xl p-2 space-y-1 animate-in fade-in slide-in-from-top-2">
            <p className="px-3 py-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              Choose Section Type
            </p>
            {availableSectionTypes.map((item) => (
              <button
                key={item.type}
                type="button"
                onClick={() => {
                  addSection(item.type, item.label);
                  setShowAddMenu(false);
                }}
                className="w-full p-2 rounded-lg text-left hover:bg-slate-800 transition-colors flex flex-col"
              >
                <span className="font-semibold text-white">{item.label}</span>
                <span className="text-[10px] text-slate-400">{item.desc}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Reorderable Section List */}
      <div className="space-y-2">
        <h4 className="font-semibold text-slate-400 uppercase tracking-wider text-[10px] px-1 flex items-center justify-between">
          <span>Sections ({activeDocument.sections.length})</span>
          <span className="text-slate-500 font-normal">Reorder & customize</span>
        </h4>

        {activeDocument.sections.map((sec, idx) => {
          const isSelected = sec.id === activeSectionId;

          return (
            <div
              key={sec.id}
              className={`rounded-xl border transition-all ${
                isSelected
                  ? 'border-blue-500/70 bg-slate-850/90 shadow-lg shadow-blue-500/5'
                  : 'border-slate-800/80 bg-slate-900/60 hover:border-slate-700'
              }`}
            >
              {/* Section Header Row */}
              <div className="p-3 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setActiveSectionId(sec.id)}
                  className="flex-1 text-left font-semibold text-slate-200 hover:text-white flex items-center gap-2 truncate"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span className="truncate">{sec.title}</span>
                  <span className="text-[10px] text-slate-500 font-normal capitalize">({sec.type})</span>
                </button>

                <div className="flex items-center gap-1">
                  {/* Reorder Up */}
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => reorderSections(idx, idx - 1)}
                    className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400"
                    title="Move Up"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>

                  {/* Reorder Down */}
                  <button
                    type="button"
                    disabled={idx === activeDocument.sections.length - 1}
                    onClick={() => reorderSections(idx, idx + 1)}
                    className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400"
                    title="Move Down"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>

                  {/* Toggle Visibility */}
                  <button
                    type="button"
                    onClick={() => toggleSectionVisibility(sec.id)}
                    className={`p-1 rounded transition-colors ${
                      sec.isVisible ? 'text-slate-400 hover:text-white' : 'text-slate-600'
                    }`}
                    title={sec.isVisible ? 'Visible' : 'Hidden'}
                  >
                    {sec.isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5 text-rose-400" />}
                  </button>

                  {/* Delete Section */}
                  <button
                    type="button"
                    onClick={() => deleteSection(sec.id)}
                    className="p-1 rounded text-slate-400 hover:text-rose-400 transition-colors"
                    title="Delete section"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Inline Content Editor when Selected */}
              {isSelected && (
                <div className="p-3 pt-0 border-t border-slate-800/60 mt-1 space-y-3 animate-in fade-in duration-150">
                  
                  {/* Header Title Editor */}
                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">
                      Section Header Title
                    </label>
                    <input
                      type="text"
                      value={sec.title}
                      onChange={(e) => updateSection(sec.id, { title: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-750 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  {/* HERO Fields */}
                  {sec.type === 'hero' && (
                    <div className="space-y-2.5">
                      <div>
                        <label className="block text-[11px] font-medium text-slate-400 mb-1">Heading</label>
                        <input
                          type="text"
                          value={sec.content.heading || ''}
                          onChange={(e) =>
                            updateSection(sec.id, {
                              content: { ...sec.content, heading: e.target.value },
                            })
                          }
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-750 text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-slate-400 mb-1">Subheading / Role</label>
                        <input
                          type="text"
                          value={sec.content.subheading || ''}
                          onChange={(e) =>
                            updateSection(sec.id, {
                              content: { ...sec.content, subheading: e.target.value },
                            })
                          }
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-750 text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-slate-400 mb-1">Bio / Summary</label>
                        <textarea
                          rows={3}
                          value={sec.content.bio || ''}
                          onChange={(e) =>
                            updateSection(sec.id, {
                              content: { ...sec.content, bio: e.target.value },
                            })
                          }
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-750 text-white focus:outline-none focus:border-blue-500 resize-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* EXPERIENCE & PROJECTS Items */}
                  {(sec.type === 'experience' || sec.type === 'projects' || sec.type === 'education') && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-medium text-slate-400">Items / Highlights</span>
                        <button
                          type="button"
                          onClick={() => {
                            const currentItems = sec.content.items || [];
                            const newItem = {
                              id: `item_${Date.now()}`,
                              title: sec.type === 'experience' ? 'New Position' : sec.type === 'projects' ? 'New Project' : 'Degree / Program',
                              organization: sec.type === 'experience' ? 'Company' : undefined,
                              period: '2024 - Present',
                              description: 'Brief overview of responsibilities and achievements.',
                              tags: ['TypeScript'],
                            };
                            updateSection(sec.id, {
                              content: { ...sec.content, items: [newItem, ...currentItems] },
                            });
                          }}
                          className="text-[10px] text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" />
                          Add Item
                        </button>
                      </div>

                      {sec.content.items?.map((item, itemIdx) => (
                        <div key={item.id} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                          <div className="flex items-center justify-between">
                            <input
                              type="text"
                              value={item.title}
                              onChange={(e) => {
                                const updated = [...(sec.content.items || [])];
                                updated[itemIdx] = { ...item, title: e.target.value };
                                updateSection(sec.id, { content: { ...sec.content, items: updated } });
                              }}
                              className="font-semibold text-white bg-transparent border-0 focus:outline-none text-xs w-2/3"
                              placeholder="Title / Role"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const updated = (sec.content.items || []).filter((_, i) => i !== itemIdx);
                                updateSection(sec.id, { content: { ...sec.content, items: updated } });
                              }}
                              className="text-slate-500 hover:text-rose-400 p-1"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              value={item.organization || ''}
                              onChange={(e) => {
                                const updated = [...(sec.content.items || [])];
                                updated[itemIdx] = { ...item, organization: e.target.value };
                                updateSection(sec.id, { content: { ...sec.content, items: updated } });
                              }}
                              placeholder="Organization / Company"
                              className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-200 focus:outline-none"
                            />
                            <input
                              type="text"
                              value={item.period || ''}
                              onChange={(e) => {
                                const updated = [...(sec.content.items || [])];
                                updated[itemIdx] = { ...item, period: e.target.value };
                                updateSection(sec.id, { content: { ...sec.content, items: updated } });
                              }}
                              placeholder="Period (e.g. 2022 - 2024)"
                              className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-200 focus:outline-none"
                            />
                          </div>

                          <textarea
                            rows={2}
                            value={item.description || ''}
                            onChange={(e) => {
                              const updated = [...(sec.content.items || [])];
                              updated[itemIdx] = { ...item, description: e.target.value };
                              updateSection(sec.id, { content: { ...sec.content, items: updated } });
                            }}
                            placeholder="Detailed description..."
                            className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-200 focus:outline-none resize-none"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* SKILLS Fields */}
                  {sec.type === 'skills' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-medium text-slate-400">Skill Categories</span>
                        <button
                          type="button"
                          onClick={() => {
                            const current = sec.content.skillsList || [];
                            updateSection(sec.id, {
                              content: {
                                ...sec.content,
                                skillsList: [...current, { category: 'New Category', items: ['Skill 1', 'Skill 2'] }],
                              },
                            });
                          }}
                          className="text-[10px] text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" />
                          Add Category
                        </button>
                      </div>

                      {sec.content.skillsList?.map((grp, gIdx) => (
                        <div key={gIdx} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                          <div className="flex items-center justify-between">
                            <input
                              type="text"
                              value={grp.category}
                              onChange={(e) => {
                                const updated = [...(sec.content.skillsList || [])];
                                updated[gIdx] = { ...grp, category: e.target.value };
                                updateSection(sec.id, { content: { ...sec.content, skillsList: updated } });
                              }}
                              className="font-semibold text-white bg-transparent border-0 focus:outline-none text-xs"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const updated = (sec.content.skillsList || []).filter((_, i) => i !== gIdx);
                                updateSection(sec.id, { content: { ...sec.content, skillsList: updated } });
                              }}
                              className="text-slate-500 hover:text-rose-400 p-1"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>

                          <input
                            type="text"
                            value={grp.items.join(', ')}
                            onChange={(e) => {
                              const updated = [...(sec.content.skillsList || [])];
                              updated[gIdx] = {
                                ...grp,
                                items: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                              };
                              updateSection(sec.id, { content: { ...sec.content, skillsList: updated } });
                            }}
                            placeholder="Comma separated: React, Node, SQL..."
                            className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-200 focus:outline-none"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* CUSTOM Fields */}
                  {sec.type === 'custom' && (
                    <div className="space-y-2">
                      <label className="block text-[11px] font-medium text-slate-400">Content / Narrative</label>
                      <textarea
                        rows={4}
                        value={sec.content.customText || ''}
                        onChange={(e) =>
                          updateSection(sec.id, {
                            content: { ...sec.content, customText: e.target.value },
                          })
                        }
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500 resize-none"
                        placeholder="Add your custom text, bio, or achievements..."
                      />
                    </div>
                  )}

                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
}
