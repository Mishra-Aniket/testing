'use client';

import { useState } from 'react';
import type { ContactMessage } from '@/lib/types';
import { markMessageRead } from '@/app/admin/actions';
import { cn } from '@/lib/utils';
import { Mail, MailOpen, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';

interface MessageListProps {
  messages: ContactMessage[];
}

export function MessageList({ messages: initialMessages }: MessageListProps) {
  const [messages, setMessages] = useState(initialMessages);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  async function handleMarkRead(id: string) {
    try {
      await markMessageRead(id);
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, read: true } : m))
      );
      toast.success('Marked as read');
    } catch {
      toast.error('Failed to update');
    }
  }

  if (messages.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border p-12 text-center">
        <p className="text-text-dim text-sm">No messages yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {messages.map((msg) => {
        const isExpanded = expandedId === msg.id;
        return (
          <div
            key={msg.id}
            className={cn(
              'rounded-lg border bg-bg-card overflow-hidden transition-colors',
              msg.read ? 'border-border' : 'border-primary/30'
            )}
          >
            <button
              onClick={() => setExpandedId(isExpanded ? null : msg.id)}
              className="w-full flex items-center gap-3 p-4 text-left hover:bg-bg-elevated transition-colors"
            >
              {msg.read ? (
                <MailOpen className="w-4 h-4 text-text-dim shrink-0" />
              ) : (
                <Mail className="w-4 h-4 text-primary-light shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={cn('text-sm font-medium truncate', msg.read ? 'text-text-muted' : 'text-text')}>
                    {msg.name}
                  </span>
                  <span className="text-text-dim text-xs">
                    {msg.email}
                  </span>
                </div>
                <p className="text-text-dim text-xs mt-0.5 truncate">
                  {msg.message.slice(0, 100)}
                </p>
              </div>
              <span className="text-text-dim text-xs whitespace-nowrap">
                {new Date(msg.created_at).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
              <ChevronDown
                className={cn(
                  'w-4 h-4 text-text-dim transition-transform shrink-0',
                  isExpanded && 'rotate-180'
                )}
              />
            </button>

            {isExpanded && (
              <div className="px-4 pb-4 space-y-3 border-t border-border">
                <div className="grid grid-cols-2 gap-4 pt-3">
                  <div>
                    <p className="text-text-dim text-xs">Project Type</p>
                    <p className="text-text text-sm">{msg.project_type || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-text-dim text-xs">Budget</p>
                    <p className="text-text text-sm">{msg.budget || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-text-dim text-xs">Timeline</p>
                    <p className="text-text text-sm">{msg.timeline || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-text-dim text-xs">Received</p>
                    <p className="text-text text-sm">
                      {new Date(msg.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-text-dim text-xs mb-1">Message</p>
                  <p className="text-text text-sm leading-relaxed whitespace-pre-wrap">
                    {msg.message}
                  </p>
                </div>
                {!msg.read && (
                  <button
                    onClick={() => handleMarkRead(msg.id)}
                    className="text-sm text-primary-light hover:text-primary transition-colors"
                  >
                    Mark as read
                  </button>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
