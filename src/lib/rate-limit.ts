type Bucket = { hits: number[] };

const buckets = new Map<string, Bucket>();
const MAX_BUCKETS = 5_000;

/**
 * Oddiy in-memory rate limit. Serverless muhitda har bir instance o'z
 * hisobini yuritadi — bu spam va tasodifiy ortiqcha sarfni to'xtatish uchun
 * yetarli, ammo global kafolat emas. Kattaroq yuklamada Upstash/Redis
 * asosidagi limit tavsiya etiladi.
 */
export function rateLimit(
  key: string,
  limit = 20,
  windowMs = 5 * 60_000,
): { ok: true } | { ok: false; retryAfter: number } {
  const now = Date.now();
  const bucket = buckets.get(key) ?? { hits: [] };
  bucket.hits = bucket.hits.filter((hit) => now - hit < windowMs);

  if (bucket.hits.length >= limit) {
    buckets.set(key, bucket);
    const oldest = bucket.hits[0] ?? now;
    return {
      ok: false,
      retryAfter: Math.max(1, Math.ceil((windowMs - (now - oldest)) / 1000)),
    };
  }

  bucket.hits.push(now);
  buckets.set(key, bucket);

  if (buckets.size > MAX_BUCKETS) {
    for (const [entryKey, entry] of buckets) {
      if (entry.hits.every((hit) => now - hit >= windowMs)) {
        buckets.delete(entryKey);
      }
    }
  }

  return { ok: true };
}
