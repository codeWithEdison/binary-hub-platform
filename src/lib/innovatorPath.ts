import type { Innovator } from "@/hooks/useInnovators";

/** Public profile path: prefer Binary Hub code when set (e.g. /innovators/003). */
export function getInnovatorPath(
  innovator: Pick<Innovator, "id"> & { binary_hub_code?: string | null }
): string {
  const code = innovator.binary_hub_code?.trim();
  return `/innovators/${code || innovator.id}`;
}

/** Match route param against id or binary_hub_code (case-insensitive). */
export function matchesInnovatorParam(
  innovator: Pick<Innovator, "id"> & { binary_hub_code?: string | null },
  param: string | undefined
): boolean {
  if (!param) return false;
  if (innovator.id === param) return true;
  const code = innovator.binary_hub_code?.trim();
  return Boolean(code && code.toLowerCase() === param.toLowerCase());
}
