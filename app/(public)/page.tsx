import { getBlocksBySection, validatePreviewToken } from '@/lib/data';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { StackSection } from '@/components/sections/StackSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { FaqSection } from '@/components/sections/FaqSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { FooterSection } from '@/components/sections/FooterSection';
import type { Metadata } from 'next';
import Link from 'next/link';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Aniket Mishra – Full-Stack & AI Engineer',
  description:
    'Freelance full-stack and AI engineer. I build web applications, APIs, and AI-powered products. Open for freelance work.',
  alternates: {
    canonical: '/',
  },
};

interface HomePageProps {
  searchParams?: Promise<{ preview?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const resolvedParams = searchParams ? await searchParams : {};
  const previewToken = resolvedParams.preview;

  let isPreviewMode = false;
  if (previewToken) {
    isPreviewMode = await validatePreviewToken(previewToken);
  }

  const sections = await getBlocksBySection({
    includeUnpublished: isPreviewMode,
  });

  return (
    <>
      {isPreviewMode && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-accent text-white py-2 px-4 text-center text-sm font-medium flex items-center justify-center gap-3">
          <span>Preview Mode – Displaying all blocks including unpublished</span>
          <Link
            href="/"
            className="underline text-xs bg-black/20 hover:bg-black/30 px-2 py-0.5 rounded transition-colors"
          >
            Exit Preview
          </Link>
        </div>
      )}

      <div className={isPreviewMode ? 'pt-8' : ''}>
        <Navbar />
        <main className="pt-16">
          <HeroSection blocks={sections['hero'] ?? []} />
          <ProjectsSection blocks={sections['projects'] ?? []} />
          <ServicesSection blocks={sections['services'] ?? []} />
          <ExperienceSection blocks={sections['experience'] ?? []} />
          <StackSection blocks={sections['stack'] ?? []} />
          <TestimonialsSection blocks={sections['testimonials'] ?? []} />
          <FaqSection blocks={sections['faq'] ?? []} />
          <ContactSection />
        </main>
        <FooterSection />
      </div>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Aniket Mishra',
            jobTitle: 'Full-Stack & AI Engineer',
            url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aniket.one',
            sameAs: [
              'https://github.com',
              'https://linkedin.com',
              'https://x.com',
            ],
          }),
        }}
      />
    </>
  );
}
