import { supabase } from "@/integrations/supabase/client";
import { isManagementCandidate } from "@/lib/resolveManagement";

/**
 * Ensure leadership members are marked as management (featured = true).
 * Requires an authenticated admin session (RLS).
 */
export async function ensureManagementMembers() {
  const { data: rows, error: listError } = await (supabase as any)
    .from("innovators")
    .select("id, name, role, featured");

  if (listError) {
    return { updated: 0, error: listError };
  }

  const toPromote = (
    (rows as Array<{ id: string; name: string; role: string; featured: boolean }>) || []
  ).filter((row) => !row.featured && isManagementCandidate(row));

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
