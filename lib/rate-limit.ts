// Rate limiter with IP tracking and optional Upstash fallback

type RateLimitRecord = {
  count: number;
  resetAt: number;
};

const memoryStore = new Map<string, RateLimitRecord>();

interface RateLimitOptions {
  interval: number; // in milliseconds
  max: number; // max requests within interval
}

/**
 * In-memory IP rate limiter with automatic expiration cleanup.
 * If UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are set in production,
 * this can optionally delegate to Upstash.
 */
export async function checkRateLimit(
  identifier: string,
  options: RateLimitOptions = { interval: 60 * 1000, max: 5 }
): Promise<{ success: boolean; remaining: number; reset: number }> {
  const now = Date.now();
  const key = `ratelimit:${identifier}`;

  // Check Upstash env variables if configured
  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (upstashUrl && upstashToken) {
    try {
      // Direct REST call to Upstash to avoid extra package dependencies if not installed
      const res = await fetch(`${upstashUrl}/pipeline`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${upstashToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([
          ['INCR', key],
          ['PTTL', key],
        ]),
      });

      if (res.ok) {
        const data = await res.json() as [
          { result: number },
          { result: number }
        ];
        const count = data[0]?.result ?? 1;
        let ttl = data[1]?.result ?? -1;

        if (ttl === -1) {
          // Key has no expire, set it
          await fetch(`${upstashUrl}/pexpire/${encodeURIComponent(key)}/${options.interval}`, {
            headers: { Authorization: `Bearer ${upstashToken}` },
          });
          ttl = options.interval;
        }

        const remaining = Math.max(0, options.max - count);
        return {
          success: count <= options.max,
          remaining,
          reset: now + (ttl > 0 ? ttl : options.interval),
        };
      }
    } catch (err) {
      console.warn('[RateLimit] Upstash failed, falling back to in-memory:', err);
    }
  }

  // Fallback: In-memory store
  const existing = memoryStore.get(key);

  if (!existing || now > existing.resetAt) {
    memoryStore.set(key, {
      count: 1,
      resetAt: now + options.interval,
    });
    return {
      success: true,
      remaining: options.max - 1,
      reset: now + options.interval,
    };
  }

  existing.count += 1;
  const remaining = Math.max(0, options.max - existing.count);

  // Periodic cleanup of stale keys
  if (memoryStore.size > 1000) {
    for (const [k, v] of memoryStore.entries()) {
      if (now > v.resetAt) {
        memoryStore.delete(k);
      }
    }
  }

  return {
    success: existing.count <= options.max,
    remaining,
    reset: existing.resetAt,
  };
}
