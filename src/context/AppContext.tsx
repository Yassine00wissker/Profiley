'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Template, 
  TemplateReview, 
  UserDocument, 
  UserProfile, 
  Section, 
  SectionType, 
  ThemeConfig 
} from '@/types';
import { INITIAL_TEMPLATES, INITIAL_REVIEWS, INITIAL_USER_PROFILE } from '@/lib/mockData';

interface AppContextType {
  // Auth state
  user: UserProfile | null;
  isLoggedIn: boolean;
  login: (customProfile?: Partial<UserProfile>) => void;
  logout: () => void;
  updateUserProfile: (profile: Partial<UserProfile>) => void;

  // Templates & Community
  templates: Template[];
  reviews: Record<string, TemplateReview[]>;
  addReview: (templateId: string, rating: number, comment: string) => void;

  // Document & Editor state
  activeDocument: UserDocument;
  selectTemplate: (template: Template) => void;
  
  // Section management
  addSection: (type: SectionType, title?: string) => void;
  updateSection: (id: string, updates: Partial<Section>) => void;
  deleteSection: (id: string) => void;
  reorderSections: (fromIndex: number, toIndex: number) => void;
  toggleSectionVisibility: (id: string) => void;

  // Theme & Style management
  updateTheme: (updates: Partial<ThemeConfig>) => void;

  // Publishing & Deployment
  publishDocument: () => string; // returns slug
  deployedDocuments: Record<string, UserDocument>;
  
  // Auth modal trigger for guest saving
  isAuthModalOpen: boolean;
  openAuthModal: (onSuccessCallback?: () => void) => void;
  closeAuthModal: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'protemp_app_state_v1';

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [templates, setTemplates] = useState<Template[]>(INITIAL_TEMPLATES);
  const [reviews, setReviews] = useState<Record<string, TemplateReview[]>>(INITIAL_REVIEWS);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [postAuthCallback, setPostAuthCallback] = useState<(() => void) | null>(null);

  // Default initial active document (instantiated from Nexus Developer Pro)
  const defaultTemplate = INITIAL_TEMPLATES[0];
  const [activeDocument, setActiveDocument] = useState<UserDocument>(() => ({
    id: 'doc_' + Date.now(),
    title: 'My Personal Portfolio',
    type: 'portfolio',
    slug: 'alex-rivera-nexus',
    templateId: defaultTemplate.id,
    theme: { ...defaultTemplate.defaultTheme },
    sections: JSON.parse(JSON.stringify(defaultTemplate.defaultSections)),
    isPublished: false,
    updatedAt: new Date().toISOString(),
  }));

  const [deployedDocuments, setDeployedDocuments] = useState<Record<string, UserDocument>>({});

  // Load from local storage on mount (preserves guest draft & previous state)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.activeDocument) setActiveDocument(parsed.activeDocument);
        if (parsed.deployedDocuments) setDeployedDocuments(parsed.deployedDocuments);
        if (parsed.user) {
          setUser(parsed.user);
          setIsLoggedIn(true);
        }
        if (parsed.reviews) setReviews(parsed.reviews);
      }
    } catch {
      // Fallback to memory defaults
    }
  }, []);

  // Save to local storage whenever critical state changes
  useEffect(() => {
    try {
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({
          activeDocument,
          deployedDocuments,
          user,
          reviews,
        })
      );
    } catch {
      // Ignore storage errors
    }
  }, [activeDocument, deployedDocuments, user, reviews]);

  const login = (customProfile?: Partial<UserProfile>) => {
    const profile: UserProfile = {
      ...INITIAL_USER_PROFILE,
      ...customProfile,
    };
    setUser(profile);
    setIsLoggedIn(true);
    setIsAuthModalOpen(false);

    // Sync guest edits to profile if the guest customized their name/headline in the hero section!
    const heroSection = activeDocument.sections.find((s) => s.type === 'hero');
    if (heroSection?.content?.heading) {
      profile.name = heroSection.content.heading.replace(/^Hi,\s*(I'm|I am)\s*/i, '');
    }
    if (heroSection?.content?.subheading) {
      profile.headline = heroSection.content.subheading;
    }
    if (heroSection?.content?.bio) {
      profile.bio = heroSection.content.bio;
    }
    setUser({ ...profile });

    if (postAuthCallback) {
      postAuthCallback();
      setPostAuthCallback(null);
    }
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : null));
  };

  const selectTemplate = (template: Template) => {
    setActiveDocument((prev) => ({
      ...prev,
      title: `My ${template.title}`,
      type: template.type,
      templateId: template.id,
      theme: { ...template.defaultTheme },
      sections: JSON.parse(JSON.stringify(template.defaultSections)),
      updatedAt: new Date().toISOString(),
    }));
  };

  // Section Management
  const addSection = (type: SectionType, title?: string) => {
    const sectionTitles: Record<SectionType, string> = {
      hero: 'Hero / Bio',
      about: 'About Me',
      experience: 'Work Experience',
      education: 'Education',
      projects: 'Projects Showcase',
      skills: 'Skills & Toolkit',
      contact: 'Contact & Links',
      custom: 'Custom Section',
    };

    const newSection: Section = {
      id: `sec_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      type,
      title: title || sectionTitles[type] || 'New Section',
      isVisible: true,
      sortOrder: activeDocument.sections.length + 1,
      content: {
        heading: type === 'custom' ? 'Custom Section Title' : undefined,
        subheading: type === 'custom' ? 'Describe your special achievements or highlights' : undefined,
        customText: type === 'custom' ? 'Add your custom content or achievements here.' : undefined,
        items: type === 'experience' || type === 'projects' || type === 'education' ? [
          {
            id: `item_${Date.now()}`,
            title: type === 'experience' ? 'Software Role' : type === 'projects' ? 'Exciting Project' : 'Degree / Certificate',
            organization: type === 'experience' ? 'Company Name' : type === 'education' ? 'University / Institute' : undefined,
            period: '2023 - Present',
            description: 'Provide an overview of key achievements, metrics, and technologies used.',
            tags: ['React', 'TypeScript'],
          }
        ] : undefined,
        skillsList: type === 'skills' ? [
          { category: 'General', items: ['Leadership', 'Problem Solving', 'Communication'] }
        ] : undefined,
      },
    };

    setActiveDocument((prev) => ({
      ...prev,
      sections: [...prev.sections, newSection],
      updatedAt: new Date().toISOString(),
    }));
  };

  const updateSection = (id: string, updates: Partial<Section>) => {
    setActiveDocument((prev) => ({
      ...prev,
      sections: prev.sections.map((s) => (s.id === id ? { ...s, ...updates } : s)),
      updatedAt: new Date().toISOString(),
    }));
  };

  const deleteSection = (id: string) => {
    setActiveDocument((prev) => ({
      ...prev,
      sections: prev.sections.filter((s) => s.id !== id),
      updatedAt: new Date().toISOString(),
    }));
  };

  const reorderSections = (fromIndex: number, toIndex: number) => {
    if (fromIndex < 0 || toIndex < 0 || fromIndex >= activeDocument.sections.length || toIndex >= activeDocument.sections.length) {
      return;
    }
    setActiveDocument((prev) => {
      const updated = [...prev.sections];
      const [moved] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, moved);
      return {
        ...prev,
        sections: updated.map((sec, idx) => ({ ...sec, sortOrder: idx + 1 })),
        updatedAt: new Date().toISOString(),
      };
    });
  };

  const toggleSectionVisibility = (id: string) => {
    setActiveDocument((prev) => ({
      ...prev,
      sections: prev.sections.map((s) => (s.id === id ? { ...s, isVisible: !s.isVisible } : s)),
      updatedAt: new Date().toISOString(),
    }));
  };

  const updateTheme = (updates: Partial<ThemeConfig>) => {
    setActiveDocument((prev) => ({
      ...prev,
      theme: { ...prev.theme, ...updates },
      updatedAt: new Date().toISOString(),
    }));
  };

  const publishDocument = (): string => {
    const slug = activeDocument.slug || `portfolio-${Date.now().toString(36)}`;
    const deployedDoc: UserDocument = {
      ...activeDocument,
      slug,
      isPublished: true,
      publishedUrl: `/p/${slug}`,
      updatedAt: new Date().toISOString(),
    };

    setActiveDocument(deployedDoc);
    setDeployedDocuments((prev) => ({
      ...prev,
      [slug]: deployedDoc,
    }));

    return slug;
  };

  const addReview = (templateId: string, rating: number, comment: string) => {
    const newRev: TemplateReview = {
      id: `rev_${Date.now()}`,
      templateId,
      userId: user?.id || 'guest_user',
      userName: user?.name || 'Community Member',
      userAvatar: user?.avatarUrl,
      rating: Math.max(1, Math.min(5, rating)),
      comment,
      createdAt: 'Just now',
    };

    setReviews((prev) => {
      const existing = prev[templateId] || [];
      const updated = [newRev, ...existing];
      return {
        ...prev,
        [templateId]: updated,
      };
    });

    // Recalculate average rating for the template
    setTemplates((prev) =>
      prev.map((tmpl) => {
        if (tmpl.id === templateId) {
          const currentList = reviews[templateId] || [];
          const allReviews = [newRev, ...currentList];
          const avg = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
          return {
            ...tmpl,
            averageRating: Math.round(avg * 10) / 10,
            reviewCount: allReviews.length,
          };
        }
        return tmpl;
      })
    );
  };

  const openAuthModal = (callback?: () => void) => {
    if (callback) setPostAuthCallback(() => callback);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setPostAuthCallback(null);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        isLoggedIn,
        login,
        logout,
        updateUserProfile,
        templates,
        reviews,
        addReview,
        activeDocument,
        selectTemplate,
        addSection,
        updateSection,
        deleteSection,
        reorderSections,
        toggleSectionVisibility,
        updateTheme,
        publishDocument,
        deployedDocuments,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
