import type { Innovator } from "@/hooks/useInnovators";

const MANAGEMENT_NAME_MATCHERS = [
  /edison/i,
  /david\s+tuyishime/i,
  /denis\s+uwihirwe/i,
];

const MANAGEMENT_ROLE_MATCHERS = [
  /hub\s+coordinator/i,
  /assistant\s+coordinator/i,
  /assistant\s+administrator/i,
  /team\s+leader/i,
];

export const isManagementCandidate = (person: Pick<Innovator, "name" | "role" | "featured">) => {
  if (person.featured) return true;
  if (MANAGEMENT_NAME_MATCHERS.some((matcher) => matcher.test(person.name || ""))) {
    return true;
  }
  return MANAGEMENT_ROLE_MATCHERS.some((matcher) =>
    matcher.test(person.role || "")
  );
};

/**
 * Prefer explicit featured flags; if none are set in DB yet,
 * fall back to known leadership roles/names so Meet the management is not empty.
 */
export const resolveManagement = (
  innovators: Innovator[],
  featuredInnovators: Innovator[] = []
) => {
  if (featuredInnovators.length > 0) return featuredInnovators;

  const flagged = innovators.filter((person) => person.featured);
  if (flagged.length > 0) return flagged;

  return innovators.filter((person) => isManagementCandidate(person));
};
