export type BlockType = 'hero' | 'project' | 'service' | 'job' | 'skill' | 'testimonial' | 'faq' | 'text' | 'cta' | 'scene';

export type SectionName = 'hero' | 'projects' | 'services' | 'experience' | 'stack' | 'testimonials' | 'faq' | 'contact' | 'footer';

export interface SiteBlock {
  id: string;
  section: SectionName;
  type: BlockType;
  data: Record<string, unknown>;
  sort_order: number;
  is_published: boolean;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface SiteBlockLog {
  id: number;
  block_id: string | null;
  action: string;
  before: Record<string, unknown> | null;
  after: Record<string, unknown> | null;
  changed_by: string | null;
  changed_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  project_type: string | null;
  budget: string | null;
  timeline: string | null;
  message: string;
  created_at: string;
  read: boolean;
}

// Block data shapes
export interface HeroData {
  name: string;
  role: string;
  availability: string;
  cta_primary_text: string;
  cta_primary_url: string;
  cta_secondary_text: string;
  cta_secondary_url: string;
}

export interface ProjectData {
  title: string;
  summary: string;
  problem: string;
  stack: string[];
  status: 'completed' | 'in-progress' | 'maintained';
  featured: boolean;
  live_url?: string;
  repo_url?: string;
  case_study_url?: string;
  image_url?: string;
}

export interface ServiceData {
  title: string;
  description: string;
  duration: string;
  best_for: string;
  includes: string[];
  icon?: string;
}

export interface JobData {
  role: string;
  organization: string;
  org_url?: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  impact: string[];
}

export interface SkillData {
  category: string;
  name: string;
  level: number; // 1-5
}

export interface TestimonialData {
  author: string;
  role: string;
  company: string;
  quote: string;
  avatar_url?: string;
}

export interface FaqData {
  question: string;
  answer: string;
}

export interface TextData {
  heading?: string;
  body: string;
}

export interface CtaData {
  text: string;
  url: string;
  variant: 'primary' | 'secondary';
}

export interface SceneData {
  kind: 'tech-orb';
  config?: Record<string, unknown>;
}
