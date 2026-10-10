'use client';

import { useState, useActionState } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { submitContact } from '@/app/actions';
import { cn } from '@/lib/utils';

const PROJECT_TYPES = [
  'Web Application',
  'Mobile App',
  'API / Backend',
  'AI / ML Integration',
  'Consulting',
  'Other',
];

const BUDGET_RANGES = [
  'Under $5,000',
  '$5,000 - $15,000',
  '$15,000 - $50,000',
  '$50,000+',
  'Not sure yet',
];

const TIMELINE_OPTIONS = [
  'ASAP',
  '1-2 weeks',
  '1 month',
  '2-3 months',
  '3+ months',
  'Flexible',
];

interface FormState {
  success: boolean;
  error: string | null;
  fieldErrors: Record<string, string[] | undefined>;
}

const initialState: FormState = {
  success: false,
  error: null,
  fieldErrors: {},
};

export function ContactSection() {
  const [state, formAction, isPending] = useActionState(submitContact, initialState);
  const [honeypot, setHoneypot] = useState('');

  if (state.success) {
    return (
      <section id="contact" className="section-padding">
        <div className="container-tight max-w-2xl">
          <div className="rounded-xl border border-primary/30 bg-primary/5 p-8 text-center">
            <h3 className="text-xl font-semibold text-text mb-2">Message sent!</h3>
            <p className="text-text-muted">Thanks for reaching out. I'll get back to you within 24-48 hours.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="section-padding">
      <div className="container-tight max-w-2xl">
        <SectionHeading
          title="Get in Touch"
          subtitle="Have a project in mind? Let's talk."
        />
        <form action={formAction} className="space-y-6">
          {/* Honeypot - hidden from real users */}
          <div className="absolute -left-[9999px]" aria-hidden="true">
            <label htmlFor="_honeypot">Leave empty</label>
            <input
              type="text"
              id="_honeypot"
              name="_honeypot"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-text mb-2">
                Name <span className="text-accent">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                maxLength={200}
                className={cn(
                  'w-full rounded-lg border bg-bg-input px-4 py-2.5 text-sm text-text placeholder:text-text-dim focus:border-primary focus:ring-1 focus:ring-primary transition-colors',
                  state.fieldErrors.name ? 'border-red-500' : 'border-border'
                )}
                placeholder="Your name"
              />
              {state.fieldErrors.name && (
                <p className="mt-1 text-red-400 text-xs">{state.fieldErrors.name[0]}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
                Email <span className="text-accent">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                maxLength={320}
                className={cn(
                  'w-full rounded-lg border bg-bg-input px-4 py-2.5 text-sm text-text placeholder:text-text-dim focus:border-primary focus:ring-1 focus:ring-primary transition-colors',
                  state.fieldErrors.email ? 'border-red-500' : 'border-border'
                )}
                placeholder="you@example.com"
              />
              {state.fieldErrors.email && (
                <p className="mt-1 text-red-400 text-xs">{state.fieldErrors.email[0]}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label htmlFor="project_type" className="block text-sm font-medium text-text mb-2">
                Project Type
              </label>
              <select
                id="project_type"
                name="project_type"
                className="w-full rounded-lg border border-border bg-bg-input px-4 py-2.5 text-sm text-text focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              >
                <option value="">Select...</option>
                {PROJECT_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-text mb-2">
                Budget Range
              </label>
              <select
                id="budget"
                name="budget"
                className="w-full rounded-lg border border-border bg-bg-input px-4 py-2.5 text-sm text-text focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              >
                <option value="">Select...</option>
                {BUDGET_RANGES.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="timeline" className="block text-sm font-medium text-text mb-2">
                Timeline
              </label>
              <select
                id="timeline"
                name="timeline"
                className="w-full rounded-lg border border-border bg-bg-input px-4 py-2.5 text-sm text-text focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              >
                <option value="">Select...</option>
                {TIMELINE_OPTIONS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-text mb-2">
              Message <span className="text-accent">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              maxLength={5000}
              className={cn(
                'w-full rounded-lg border bg-bg-input px-4 py-2.5 text-sm text-text placeholder:text-text-dim focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none',
                state.fieldErrors.message ? 'border-red-500' : 'border-border'
              )}
              placeholder="Tell me about your project..."
            />
            {state.fieldErrors.message && (
              <p className="mt-1 text-red-400 text-xs">{state.fieldErrors.message[0]}</p>
            )}
          </div>

          {state.error && (
            <p className="text-red-400 text-sm">{state.error}</p>
          )}

          <Button type="submit" variant="accent" size="lg" disabled={isPending}>
            {isPending ? 'Sending...' : 'Send Message'}
          </Button>
        </form>
      </div>
    </section>
  );
}
