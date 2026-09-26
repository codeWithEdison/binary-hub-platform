import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { innovators as fallbackInnovators } from "@/lib/data";
import { cachedQuery, invalidateCache } from "@/lib/queryCache";

export interface Innovator {
  id: string;
  application_id?: string | null;
  user_id?: string | null;
  application_answers?: {
    email?: string;
    universityYear?: string;
    skills?: string[];
    motivation?: string;
    interests?: string;
    collaboration?: string;
  } | null;
  name: string;
  bio: string | null;
  image: string | null;
  department: string;
  role: string;
  gender?: string | null;
  linkedin?: string | null;
  facebook?: string | null;
  twitter?: string | null;
  github?: string | null;
  website?: string | null;
  status: "innovator" | "alumni" | "mentor";
  account_status?: "active" | "inactive";
  featured?: boolean;
  created_at: string;
  updated_at: string;
  skills?: Array<{
    skill: string;
  }>;
  projects?: Array<{
    project_id?: string;
    project?: {
      id: string;
      title: string;
    };
  }>;
}

const INNOVATOR_SELECT = `
  *,
  skills:innovator_skills(skill),
  projects:project_innovators(project_id)
`;

export const useInnovators = ({ includeInactive = false }: { includeInactive?: boolean } = {}) => {
  const [innovators, setInnovators] = useState<Innovator[]>([]);
  const [featuredInnovators, setFeaturedInnovators] = useState<Innovator[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const listKey = includeInactive ? "innovators:all" : "innovators:active";
  const featuredKey = includeInactive ? "innovators:featured:all" : "innovators:featured:active";

  useEffect(() => {
    fetchInnovators();
    fetchFeaturedInnovators();
  }, [includeInactive]);

  const fetchInnovators = async () => {
    setLoading(true);
    try {
      const data = await cachedQuery(listKey, async () => {
        let innovatorsQuery = supabase.from("innovators").select(INNOVATOR_SELECT);

        if (!includeInactive) {
          innovatorsQuery = innovatorsQuery.eq("account_status", "active");
        }

        const { data, error } = await innovatorsQuery.order("created_at", { ascending: false });
        if (error) throw error;
        return (data as any)?.length ? (data as any) : fallbackInnovators;
      });
      setInnovators(data);
    } catch {
      toast({
        title: "Error",
        description: "Failed to fetch innovators",
        variant: "destructive",
      });
      setInnovators(fallbackInnovators);
    }
    setLoading(false);
  };

  const fetchFeaturedInnovators = async () => {
    try {
      const data = await cachedQuery(featuredKey, async () => {
        let featuredQuery = (supabase as any)
          .from("innovators")
          .select(INNOVATOR_SELECT)
          .eq("featured", true);

        if (!includeInactive) {
          featuredQuery = featuredQuery.eq("account_status", "active");
        }

        const { data, error } = await featuredQuery.order("created_at", { ascending: false });
        if (error) throw error;
        return (data as any)?.length ? (data as any) : [];
      });
      setFeaturedInnovators(data);
    } catch {
      toast({
        title: "Error",
        description: "Failed to fetch management innovators",
        variant: "destructive",
      });
      setFeaturedInnovators(
        fallbackInnovators
          .filter((person: any) => person.featured)
          .map((person) => person as any)
      );
    }
  };

  const refreshInnovators = async () => {
    invalidateCache("innovators");
    await Promise.all([fetchInnovators(), fetchFeaturedInnovators()]);
  };

  const createInnovator = async (innovator: Omit<Innovator, "id" | "created_at" | "updated_at">) => {
    const { skills: _skills, projects: _projects, ...row } = innovator as Innovator;
    const { data, error } = await (supabase as any)
      .from("innovators")
      .insert([row])
      .select("id")
      .single();

    if (error) {
      toast({
        title: "Error",
        description: "Failed to create innovator",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Innovator created successfully",
      });
      await refreshInnovators();
    }

    return { data, error };
  };

  const updateInnovator = async (id: string, updates: Partial<Innovator>) => {
    const allowed = [
      "name",
      "role",
      "department",
      "gender",
      "bio",
      "image",
      "status",
      "featured",
      "account_status",
      "linkedin",
      "facebook",
      "twitter",
      "github",
      "website",
      "user_id",
    ] as const;

    const row: Record<string, unknown> = {};
    for (const key of allowed) {
      if (key in updates) {
        row[key] = (updates as Record<string, unknown>)[key];
      }
    }

    const { error } = await (supabase as any).from("innovators").update(row).eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to update innovator",
        variant: "destructive",
      });
    } else {
      await refreshInnovators();
    }

    return { error };
  };

  const deleteInnovator = async (id: string) => {
    const { error } = await supabase.from("innovators").delete().eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete innovator",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Innovator deleted successfully",
      });
      await refreshInnovators();
    }

    return { error };
  };

  return {
    innovators,
    featuredInnovators,
    managementInnovators: featuredInnovators,
    loading,
    createInnovator,
    updateInnovator,
    deleteInnovator,
    refetch: refreshInnovators,
  };
};
