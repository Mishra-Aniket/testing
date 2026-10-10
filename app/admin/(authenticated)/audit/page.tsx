import { requireOwner } from '@/lib/auth';
import type { SiteBlockLog } from '@/lib/types';

export default async function AuditLogPage() {
  const { supabase } = await requireOwner();

  const { data } = await supabase
    .from('site_blocks_log')
    .select('*')
    .order('changed_at', { ascending: false })
    .limit(100);

  const logs = (data ?? []) as SiteBlockLog[];

  return (
    <div>
      <h1 className="text-2xl font-bold text-text mb-8">Audit Log</h1>

      {logs.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-12 text-center">
          <p className="text-text-dim text-sm">No activity recorded yet.</p>
        </div>
      ) : (
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-bg-elevated">
                <th className="text-left px-4 py-3 text-text-muted font-medium">Action</th>
                <th className="text-left px-4 py-3 text-text-muted font-medium">Block ID</th>
                <th className="text-left px-4 py-3 text-text-muted font-medium">Changed By</th>
                <th className="text-left px-4 py-3 text-text-muted font-medium">When</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="border-t border-border hover:bg-bg-card/50">
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${
                      log.action === 'INSERT'
                        ? 'bg-green-500/10 text-green-400'
                        : log.action === 'UPDATE'
                          ? 'bg-blue-500/10 text-blue-400'
                          : 'bg-red-500/10 text-red-400'
                    }`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-text-muted font-mono text-xs">
                    {log.block_id?.slice(0, 8) ?? '—'}
                  </td>
                  <td className="px-4 py-3 text-text-muted">
                    {log.changed_by ?? 'system'}
                  </td>
                  <td className="px-4 py-3 text-text-dim">
                    {new Date(log.changed_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
