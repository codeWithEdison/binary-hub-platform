import type { Innovator } from "@/hooks/useInnovators";

/** Lower sort_order first; missing values last; then older created_at first. */
export function compareBySortOrder(
  a: Pick<Innovator, "sort_order" | "created_at">,
  b: Pick<Innovator, "sort_order" | "created_at">
): number {
  const orderA = a.sort_order ?? Number.MAX_SAFE_INTEGER;
  const orderB = b.sort_order ?? Number.MAX_SAFE_INTEGER;
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
