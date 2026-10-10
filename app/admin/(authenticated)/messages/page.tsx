import { requireOwner } from '@/lib/auth';
import type { ContactMessage } from '@/lib/types';
import { MessageList } from '@/components/admin/MessageList';

export default async function MessagesPage() {
  const { supabase } = await requireOwner();

  const { data } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });

  const messages = (data ?? []) as ContactMessage[];

  return (
    <div>
      <h1 className="text-2xl font-bold text-text mb-8">Contact Messages</h1>
      <MessageList messages={messages} />
    </div>
  );
}
