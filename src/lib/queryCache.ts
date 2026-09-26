type CacheEntry<T> = {
  data?: T;
  fetchedAt: number;
  promise?: Promise<T>;
};

const store = new Map<string, CacheEntry<unknown>>();
const DEFAULT_TTL_MS = 60_000;

export async function cachedQuery<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlMs = DEFAULT_TTL_MS
): Promise<T> {
  const now = Date.now();
  const hit = store.get(key) as CacheEntry<T> | undefined;

  if (hit?.data !== undefined && now - hit.fetchedAt < ttlMs) {
    return hit.data;
  }

  if (hit?.promise) {
    return hit.promise;
  }

  const promise = fetcher()
    .then((data) => {
      store.set(key, { data, fetchedAt: Date.now() });
      return data;
    })
    .catch((error) => {
      const current = store.get(key);
      if (current?.promise === promise) {
        store.delete(key);
      }
      throw error;
    });

  store.set(key, {
    data: hit?.data,
    fetchedAt: hit?.fetchedAt ?? 0,
    promise,
  });

  return promise;
}

export function invalidateCache(prefix?: string) {
  if (!prefix) {
    store.clear();
    return;
  }

  for (const key of store.keys()) {
    if (key === prefix || key.startsWith(`${prefix}:`)) {
      store.delete(key);
    }
  }
}
