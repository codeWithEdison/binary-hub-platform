import { supabase } from "@/integrations/supabase/client";

/** Name matchers for people who should appear in Meet the management */
const MANAGEMENT_NAME_MATCHERS = [/edison/i, /david\s+tuyishime/i, /denis\s+uwihirwe/i];

/**
 * Ensure Edison, David, and Denis are marked as management (featured = true).
 * Requires an authenticated admin session (RLS).
 */
export async function ensureManagementMembers() {
  const { data: rows, error: listError } = await (supabase as any)
    .from("innovators")
    .select("id, name, featured");

  if (listError) {
    return { updated: 0, error: listError };
  }

  const toPromote = (
    (rows as Array<{ id: string; name: string; featured: boolean }>) || []
  ).filter(
    (row) =>
      !row.featured &&
      MANAGEMENT_NAME_MATCHERS.some((matcher) => matcher.test(row.name))
  );

  if (toPromote.length === 0) {
    return { updated: 0, error: null };
  }

  const { error: updateError } = await (supabase as any)
    .from("innovators")
    .update({ featured: true })
    .in(
      "id",
      toPromote.map((row) => row.id)
    );

  return { updated: updateError ? 0 : toPromote.length, error: updateError };
}
