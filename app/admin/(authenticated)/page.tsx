import { requireOwner } from '@/lib/auth';
import type { SiteBlock, SiteBlockLog, ContactMessage } from '@/lib/types';

export default async function AdminDashboard() {
  const { supabase } = await requireOwner();

  // Get block counts per section
  const { data: blocks } = await supabase
    .from('site_blocks')
    .select('section, is_published')
    .is('deleted_at', null);

  // Get unread message count
  const { count: unreadCount } = await supabase
    .from('contact_messages')
    .select('*', { count: 'exact', head: true })
    .eq('read', false);

  // Get last 10 audit log entries
  const { data: recentLogs } = await supabase
    .from('site_blocks_log')
    .select('*')
    .order('changed_at', { ascending: false })
    .limit(10);

  // Calculate section stats
  const sectionStats: Record<string, { total: number; published: number }> = {};
  for (const block of (blocks ?? []) as Pick<SiteBlock, 'section' | 'is_published'>[]) {
    if (!sectionStats[block.section]) {
      sectionStats[block.section] = { total: 0, published: 0 };
    }
    sectionStats[block.section]!.total++;
    if (block.is_published) {
      sectionStats[block.section]!.published++;
    }
  }

  const logs = (recentLogs ?? []) as SiteBlockLog[];

  return (
    <div>
      <h1 className="text-2xl font-bold text-text mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="rounded-xl border border-border bg-bg-card p-5">
          <p className="text-text-dim text-sm">Total Blocks</p>
          <p className="text-2xl font-bold text-text mt-1">
            {(blocks ?? []).length}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-bg-card p-5">
          <p className="text-text-dim text-sm">Sections Active</p>
          <p className="text-2xl font-bold text-text mt-1">
            {Object.keys(sectionStats).length}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-bg-card p-5">
          <p className="text-text-dim text-sm">Unread Messages</p>
          <p className="text-2xl font-bold text-accent mt-1">
            {unreadCount ?? 0}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-bg-card p-5">
          <p className="text-text-dim text-sm">Recent Changes</p>
          <p className="text-2xl font-bold text-text mt-1">
            {logs.length}
          </p>
        </div>
      </div>

      {/* Section Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-border bg-bg-card p-6">
          <h2 className="text-lg font-semibold text-text mb-4">Sections</h2>
          {Object.keys(sectionStats).length === 0 ? (
            <p className="text-text-dim text-sm">No blocks created yet. Add content in the Sections tab.</p>
          ) : (
            <div className="space-y-3">
              {Object.entries(sectionStats).map(([section, stats]) => (
                <div
                  key={section}
                  className="flex items-center justify-between py-2 border-b border-border last:border-0"
                >
                  <span className="text-text text-sm capitalize">{section}</span>
                  <span className="text-text-muted text-sm">
                    {stats.published}/{stats.total} published
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="rounded-xl border border-border bg-bg-card p-6">
          <h2 className="text-lg font-semibold text-text mb-4">Recent Activity</h2>
          {logs.length === 0 ? (
            <p className="text-text-dim text-sm">No activity yet.</p>
          ) : (
            <div className="space-y-3">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-start justify-between py-2 border-b border-border last:border-0"
                >
                  <div>
                    <span className="text-sm font-medium text-text">
                      {log.action}
                    </span>
                    <p className="text-text-dim text-xs mt-0.5">
                      by {log.changed_by ?? 'unknown'}
                    </p>
                  </div>
                  <span className="text-text-dim text-xs whitespace-nowrap">
                    {new Date(log.changed_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
