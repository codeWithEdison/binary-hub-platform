/**
 * Prefer live Supabase data. If the API is down (quota, pause, network),
 * use the last exported public snapshot. Never throw to the UI for reads.
 */
export async function liveOrOffline<T>(
  live: () => Promise<T>,
  offline: () => Promise<T> | T,
  empty: T
): Promise<T> {
  try {
    return await live();
  } catch {
    try {
      return await offline();
    } catch {
      return empty;
    }
  }
}
