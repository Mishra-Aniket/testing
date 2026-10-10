import { z } from 'zod';

const httpsUrl = z.string().url().startsWith('https://', { message: 'URL must use HTTPS' }).max(2048);
const optionalHttpsUrl = httpsUrl.optional().or(z.literal(''));

export const heroSchema = z.object({
  name: z.string().min(1).max(100),
  role: z.string().min(1).max(200),
  availability: z.string().max(100).default('Open for freelance'),
  cta_primary_text: z.string().max(50).default('Hire me'),
  cta_primary_url: z.string().max(500).default('#contact'),
  cta_secondary_text: z.string().max(50).default('View projects'),
  cta_secondary_url: z.string().max(500).default('#projects'),
}).strict();

export const projectSchema = z.object({
  title: z.string().min(1).max(200),
  summary: z.string().min(1).max(500),
  problem: z.string().max(1000).default(''),
  stack: z.array(z.string().max(50)).max(20).default([]),
  status: z.enum(['completed', 'in-progress', 'maintained']).default('completed'),
  featured: z.boolean().default(false),
  live_url: optionalHttpsUrl,
  repo_url: optionalHttpsUrl,
  case_study_url: optionalHttpsUrl,
  image_url: optionalHttpsUrl,
}).strict();

export const serviceSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(1000),
  duration: z.string().max(100).default(''),
  best_for: z.string().max(300).default(''),
  includes: z.array(z.string().max(200)).max(20).default([]),
  icon: z.string().max(50).optional(),
}).strict();

export const jobSchema = z.object({
  role: z.string().min(1).max(200),
  organization: z.string().min(1).max(200),
  org_url: optionalHttpsUrl,
  start_date: z.string().min(1).max(20),
  end_date: z.string().max(20).optional().or(z.literal('')),
  is_current: z.boolean().default(false),
  impact: z.array(z.string().max(500)).max(15).default([]),
}).strict();

export const skillSchema = z.object({
  category: z.string().min(1).max(100),
  name: z.string().min(1).max(100),
  level: z.number().int().min(1).max(5),
}).strict();

export const testimonialSchema = z.object({
  author: z.string().min(1).max(100),
  role: z.string().max(200).default(''),
  company: z.string().max(200).default(''),
  quote: z.string().min(1).max(2000),
  avatar_url: optionalHttpsUrl,
}).strict();

export const faqSchema = z.object({
  question: z.string().min(1).max(500),
  answer: z.string().min(1).max(3000),
}).strict();

export const textSchema = z.object({
  heading: z.string().max(200).optional(),
  body: z.string().min(1).max(5000),
}).strict();

export const ctaSchema = z.object({
  text: z.string().min(1).max(100),
  url: z.string().min(1).max(500),
  variant: z.enum(['primary', 'secondary']).default('primary'),
}).strict();

export const sceneSchema = z.object({
  kind: z.enum(['tech-orb']),
  config: z.record(z.unknown()).optional(),
}).strict();

export const contactMessageSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200),
  email: z.string().email('Invalid email').max(320),
  project_type: z.string().max(100).optional().or(z.literal('')),
  budget: z.string().max(100).optional().or(z.literal('')),
  timeline: z.string().max(100).optional().or(z.literal('')),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000),
  _honeypot: z.literal('').optional(),
}).strict();

export const blockSchemaRegistry: Record<string, z.ZodType> = {
  hero: heroSchema,
  project: projectSchema,
  service: serviceSchema,
  job: jobSchema,
  skill: skillSchema,
  testimonial: testimonialSchema,
  faq: faqSchema,
  text: textSchema,
  cta: ctaSchema,
  scene: sceneSchema,
};

export type BlockSchemas = {
  hero: z.infer<typeof heroSchema>;
  project: z.infer<typeof projectSchema>;
  service: z.infer<typeof serviceSchema>;
  job: z.infer<typeof jobSchema>;
  skill: z.infer<typeof skillSchema>;
  testimonial: z.infer<typeof testimonialSchema>;
  faq: z.infer<typeof faqSchema>;
  text: z.infer<typeof textSchema>;
  cta: z.infer<typeof ctaSchema>;
  scene: z.infer<typeof sceneSchema>;
};
