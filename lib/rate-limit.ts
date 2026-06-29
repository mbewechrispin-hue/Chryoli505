type RateEntry = { count: number; expiresAt: number };

const store = new Map<string, RateEntry>();

export function checkRateLimit(key: string, max: number, windowMs: number) {
  const now = Date.now();
  const existing = store.get(key);

  if (!existing || existing.expiresAt <= now) {
    store.set(key, { count: 1, expiresAt: now + windowMs });
    return { allowed: true, remaining: max - 1 };
  }

  if (existing.count >= max) {
    return { allowed: false, remaining: 0 };
  }

  existing.count += 1;
  store.set(key, existing);

  return { allowed: true, remaining: max - existing.count };
}
