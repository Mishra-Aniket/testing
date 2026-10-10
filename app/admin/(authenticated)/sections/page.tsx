import { requireOwner } from '@/lib/auth';
import type { SiteBlock, SectionName } from '@/lib/types';
import { SectionManager } from '@/components/admin/SectionManager';

const SECTIONS: SectionName[] = [
  'hero',
  'projects',
  'services',
  'experience',
  'stack',
  'testimonials',
  'faq',
  'contact',
  'footer',
];

export default async function SectionsPage() {
  const { supabase } = await requireOwner();

  const { data } = await supabase
    .from('site_blocks')
    .select('*')
    .is('deleted_at', null)
    .order('sort_order', { ascending: true });

  const blocks = (data ?? []) as SiteBlock[];

  // Group blocks by section
  const grouped: Record<string, SiteBlock[]> = {};
  for (const section of SECTIONS) {
    grouped[section] = blocks.filter((b) => b.section === section);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-text mb-8">Sections</h1>
      <SectionManager sections={SECTIONS} groupedBlocks={grouped} />
    </div>
  );
}
