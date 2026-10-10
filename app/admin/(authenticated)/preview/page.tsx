'use client';

import { useState } from 'react';
import { createPreviewToken } from '@/app/admin/actions';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';
import { Copy, ExternalLink } from 'lucide-react';

export default function PreviewPage() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    setLoading(true);
    try {
      const result = await createPreviewToken();
      setPreviewUrl(result.url);
      toast.success('Preview link generated (expires in 1 hour)');
    } catch {
      toast.error('Failed to create preview link');
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy() {
    if (!previewUrl) return;
    await navigator.clipboard.writeText(previewUrl);
    toast.success('Copied to clipboard');
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-text mb-4">Preview</h1>
      <p className="text-text-muted text-sm mb-6">
        Generate a temporary preview link that shows the public site including
        hidden (unpublished) blocks. Links expire after 1 hour.
      </p>

      <Button onClick={handleGenerate} variant="primary" disabled={loading}>
        {loading ? 'Generating...' : 'Generate Preview Link'}
      </Button>

      {previewUrl && (
        <div className="mt-6 rounded-lg border border-border bg-bg-elevated p-4">
          <p className="text-text-dim text-xs mb-2">Preview URL (expires in 1 hour):</p>
          <div className="flex items-center gap-2">
            <code className="flex-1 text-sm text-text bg-bg-input rounded px-3 py-2 overflow-x-auto">
              {previewUrl}
            </code>
            <button
              onClick={handleCopy}
              className="p-2 text-text-muted hover:text-text transition-colors"
              aria-label="Copy URL"
            >
              <Copy className="w-4 h-4" />
            </button>
            <a
              href={previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-text-muted hover:text-text transition-colors"
              aria-label="Open preview"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
