import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Department {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string | null;
  created_at: string;
}

export interface ProjectCategory {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
}

export const useReferenceData = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projectCategories, setProjectCategories] = useState<ProjectCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchReferenceData();
  }, []);

  const fetchReferenceData = async () => {
    setLoading(true);
    
    try {
      // Since reference tables don't exist yet, return empty arrays
      setDepartments([]);
      setSkills([]);
      setProjectCategories([]);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch reference data",
        variant: "destructive"
      });
    }
    
    setLoading(false);
  };

  return {
    departments,
    skills,
    projectCategories,
    loading,
    refetch: fetchReferenceData
  };
};