export type DocumentType = 'portfolio' | 'cv';

export type SectionType = 
  | 'hero' 
  | 'about' 
  | 'experience' 
  | 'education' 
  | 'projects' 
  | 'skills' 
  | 'contact' 
  | 'custom';

export interface Section {
  id: string;
  type: SectionType;
  title: string;
  isVisible: boolean;
  sortOrder: number;
  content: {
    heading?: string;
    subheading?: string;
    bio?: string;
    avatarUrl?: string;
    ctaText?: string;
    ctaLink?: string;
    items?: Array<{
      id: string;
      title: string;
      subtitle?: string;
      organization?: string;
      period?: string;
      location?: string;
      description?: string;
      tags?: string[];
      link?: string;
      image?: string;
    }>;
    skillsList?: Array<{
      category: string;
      items: string[];
    }>;
    contactInfo?: {
      email?: string;
      phone?: string;
      location?: string;
      github?: string;
      linkedin?: string;
      website?: string;
    };
    customText?: string;
  };
}

export interface ThemeConfig {
  primaryColor: string;
  accentColor: string;
  backgroundColor: string;
  cardColor: string;
  textColor: string;
  fontFamily: 'sans' | 'serif' | 'mono';
  layoutStyle: 'modern' | 'minimal' | 'bold' | 'compact';
  borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'full';
}

export interface TemplateReview {
  id: string;
  templateId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number; // 1 to 5
  comment: string;
  createdAt: string;
}

export interface Template {
  id: string;
  title: string;
  slug: string;
  type: DocumentType;
  description: string;
  category: 'Tech' | 'Design' | 'Executive' | 'Academic' | 'Creative';
  thumbnailUrl: string;
  averageRating: number;
  reviewCount: number;
  defaultTheme: ThemeConfig;
  defaultSections: Section[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  headline: string;
  bio: string;
  avatarUrl: string;
  location: string;
  website: string;
  github: string;
  linkedin: string;
}

export interface UserDocument {
  id: string;
  title: string;
  type: DocumentType;
  slug: string;
  templateId: string;
  theme: ThemeConfig;
  sections: Section[];
  isPublished: boolean;
  publishedUrl?: string;
  updatedAt: string;
}
