import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Innovator {
  id: string;
  name: string;
  bio: string | null;
  image: string | null;
  department: string;
  role: string;
  status: "student" | "faculty" | "alumni";
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

export const useInnovators = () => {
  const [innovators, setInnovators] = useState<Innovator[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchInnovators();
  }, []);

  const fetchInnovators = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("innovators")
      .select(`
        *,
        skills:innovator_skills(skill)
      `)
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch innovators",
        variant: "destructive"
      });
    } else {
      setInnovators(data || []);
    }
    setLoading(false);
  };

  const createInnovator = async (innovator: Omit<Innovator, "id" | "created_at" | "updated_at">) => {
    const { data, error } = await supabase
      .from("innovators")
      .insert([innovator])
      .select()
      .single();

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
    const { error } = await supabase
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
    loading,
    createInnovator,
    updateInnovator,
    deleteInnovator,
    refetch: fetchInnovators
  };
};