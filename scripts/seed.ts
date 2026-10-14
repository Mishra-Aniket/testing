import { createClient } from '@supabase/supabase-js';
import { DEFAULT_BLOCKS } from '../lib/data';

// Load environment variables (supports local run with tsx)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error(
    '❌ Error: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set to run the seed script.'
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

interface SeedBlock {
  section: string;
  type: string;
  data: Record<string, unknown>;
  sort_order: number;
  is_published: boolean;
}

const SEED_BLOCKS: SeedBlock[] = DEFAULT_BLOCKS.map((b) => ({
  section: b.section,
  type: b.type,
  data: b.data,
  sort_order: b.sort_order,
  is_published: b.is_published,
}));

async function seed() {
  console.log('🌱 Starting database seed with portfolio blocks...');

  // Check if blocks already exist
  const { data: existing, error: checkError } = await supabase
    .from('site_blocks')
    .select('id')
    .limit(1);

  if (checkError) {
    console.error('❌ Failed to check existing blocks:', checkError.message);
    process.exit(1);
  }

  if (existing && existing.length > 0) {
    console.log('ℹ️ Site blocks already exist in the database. Skipping seed to prevent overwriting existing data.');
    console.log('   (To re-seed, truncate the site_blocks table first).');
    process.exit(0);
  }

  const { data, error } = await supabase
    .from('site_blocks')
    .insert(SEED_BLOCKS)
    .select('id, section, type');

  if (error) {
    console.error('❌ Error seeding site_blocks:', error.message);
    process.exit(1);
  }

  console.log(`✅ Successfully seeded ${data.length} site blocks with portfolio data.`);
}

seed().catch((err) => {
  console.error('❌ Unexpected seed error:', err);
  process.exit(1);
});
