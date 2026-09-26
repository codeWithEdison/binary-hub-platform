export const getInnovatorInitials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "IN";

export const getSkillName = (skill: unknown) =>
  typeof skill === "string"
    ? skill
    : (skill as { skill?: string } | null)?.skill || "";

export const getInnovatorSkills = (
  innovator: { skills?: Array<{ skill: string }> | string[] | null },
  limit?: number
) => {
  const raw = innovator.skills || [];
  const skills = raw
    .map((item) => getSkillName(item))
    .filter(Boolean);
  return typeof limit === "number" ? skills.slice(0, limit) : skills;
};

export const statusLabel = (status?: string | null) => {
  if (!status) return "Innovator";
  if (status === "mentor") return "Mentor";
  if (status === "alumni") return "Alumni";
  if (status === "innovator") return "Innovator";
  return status;
};
