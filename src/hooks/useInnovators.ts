import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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
  status: "innovator" | "alumni" | "mentor";
  account_status?: "active" | "inactive";
  featured?: boolean;
  created_at: string;
  updated_at: string;
  skills?: Array<{
    skill: string;
  }>;
  projects?: Array<{
    project: {
      id: string;
      title: string;
    };
  }>;
}

export const useInnovators = ({ includeInactive = false }: { includeInactive?: boolean } = {}) => {
  const [innovators, setInnovators] = useState<Innovator[]>([]);
  const [featuredInnovators, setFeaturedInnovators] = useState<Innovator[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchInnovators();
    fetchFeaturedInnovators();
  }, [includeInactive]);

  const fetchInnovators = async () => {
    setLoading(true);
    let innovatorsQuery = supabase
      .from("innovators")
      .select(`
        *,
        skills:innovator_skills(skill)
      `);

    if (!includeInactive) {
      innovatorsQuery = innovatorsQuery.eq("account_status", "active");
    }

    const { data, error } = await innovatorsQuery.order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch innovators",
        variant: "destructive"
      });
    } else {
      setInnovators((data as any) || []);
    }
    setLoading(false);
  };

  const fetchFeaturedInnovators = async () => {
    let featuredQuery = (supabase as any)
      .from("innovators")
      .select(`
        *,
        skills:innovator_skills(skill)
      `)
      .eq("featured", true);

    if (!includeInactive) {
      featuredQuery = featuredQuery.eq("account_status", "active");
    }

    const { data, error } = await featuredQuery.order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch featured innovators",
        variant: "destructive"
      });
    } else {
      setFeaturedInnovators((data as any) || []);
    }
  };

  const createInnovator = async (innovator: Omit<Innovator, "id" | "created_at" | "updated_at">) => {
    const { data, error } = await (supabase as any)
      .from("innovators")
      .insert([innovator]);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to create innovator",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Innovator created successfully"
      });
      fetchInnovators();
    }

    return { data, error };
  };

  const updateInnovator = async (id: string, updates: Partial<Innovator>) => {
    const { error } = await (supabase as any)
      .from("innovators")
      .update(updates)
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update innovator",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Innovator updated successfully"
      });
      fetchInnovators();
    }

    return { error };
  };

  const deleteInnovator = async (id: string) => {
    const { error } = await supabase
      .from("innovators")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete innovator",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Innovator deleted successfully"
      });
      fetchInnovators();
    }

    return { error };
  };

  return {
    innovators,
    featuredInnovators,
    loading,
    createInnovator,
    updateInnovator,
    deleteInnovator,
    refetch: fetchInnovators
  };
};