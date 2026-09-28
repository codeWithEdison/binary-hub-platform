import type { Innovator } from "@/hooks/useInnovators";

/**
 * Effective list rank: positive orders (1, 2, 3…) come first.
 * 0 / missing / negative are treated as "unsorted" and go last.
 */
export function effectiveSortOrder(value?: number | null): number {
  if (value == null || value <= 0) return Number.MAX_SAFE_INTEGER;
  return value;
}

/** Lower positive sort_order first; 0/missing last; then older created_at first. */
export function compareBySortOrder(
  a: Pick<Innovator, "sort_order" | "created_at">,
  b: Pick<Innovator, "sort_order" | "created_at">
): number {
  const orderA = effectiveSortOrder(a.sort_order);
  const orderB = effectiveSortOrder(b.sort_order);
  if (orderA !== orderB) return orderA - orderB;

  const timeA = a.created_at ? new Date(a.created_at).getTime() : 0;
  const timeB = b.created_at ? new Date(b.created_at).getTime() : 0;
  if (timeA !== timeB) return timeA - timeB;

  return 0;
}

export function sortBySortOrder<T extends Pick<Innovator, "sort_order" | "created_at">>(
  items: T[]
): T[] {
  return [...items].sort(compareBySortOrder);
}
