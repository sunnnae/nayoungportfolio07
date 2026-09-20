export type ProjectCategory = 'all' | 'bx' | 'graphic' | 'ads';

export interface ProjectDetailSection {
  title: string;
  subtitle?: string;
  description: string;
  image?: string;
  imageAlt?: string;
  keyPoints?: string[];
  visualHighlights?: {
    label: string;
    value: string;
    color?: string;
  }[];
}

export interface Project {
  id: string;
  title: string;
  subTitle: string;
  category: 'bx' | 'graphic' | 'ads';
  categoryLabel: string;
  summary: string;
  heroImage: string;
  galleryImages?: string[];
  role: string;
  period: string;
  tools: string[];
  tags: string[];
  accentColor?: string;
  target?: string;
  visualConcept?: string;
  designRationale?: string;
  sections: ProjectDetailSection[];
}

export interface AdCreativeItem {
  id: string;
  number: string;
  brand: string;
  headline: string;
  subtext?: string;
  platform?: string;
  dimensions: string;
  year: string;
  image?: string;
  isPlaceholder?: boolean;
  marketingAngle?: string;
  metricsHighlight?: string;
}

export interface CareerExperience {
  period: string;
  title: string;
  company: string;
  description: string;
  highlights?: string[];
}

export interface ThemePalette {
  id: string;
  name: string;
  bg: string;
  surface: string;
  text: string;
  textMuted: string;
  border: string;
  accent: string;
  badgeBg: string;
}
