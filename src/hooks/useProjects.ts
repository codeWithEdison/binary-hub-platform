import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Project {
  id: string;
  title: string;
  description: string;
  full_description: string | null;
  problem_statement: string | null;
  solution: string | null;
  impact: string | null;
  results: string | null;
  future_plans: string | null;
  image: string | null;
  category: string;
  stage: "concept" | "prototype" | "development" | "launched";
  status: string | null;
  date: string | null;
  created_at: string;
  updated_at: string;
  categories?: Array<{
    category: string;
  }>;
  team?: Array<{
    name: string;
    role: string;
    image: string | null;
  }>;
  technologies?: Array<{
    technology: string;
  }>;
  links?: Array<{
    url: string;
    link_type: string;
  }>;
  gallery?: Array<{
    image_url: string;
  }>;
  innovators?: Array<{
    innovator_id: string;
  }>;
}

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("projects")
      .select(`
        *,
        categories:project_categories(category),
        team:project_team(name, role, image),
        technologies:project_technologies(technology),
        links:project_links(url, link_type),
        gallery:project_gallery(image_url),
        innovators:project_innovators(innovator_id)
      `)
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch projects",
        variant: "destructive"
      });
    } else {
      setProjects(data || []);
    }
    setLoading(false);
  };

  const createProject = async (project: Omit<Project, "id" | "created_at" | "updated_at">) => {
    const { data, error } = await supabase
      .from("projects")
      .insert([project])
      .select()
      .single();

    if (error) {
      toast({
        title: "Error",
        description: "Failed to create project",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Project created successfully"
      });
      fetchProjects();
    }

    return { data, error };
  };

  const updateProject = async (id: string, updates: Partial<Project>) => {
    const { error } = await supabase
      .from("projects")
      .update(updates)
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update project",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Project updated successfully"
      });
      fetchProjects();
    }

    return { error };
  };

  const deleteProject = async (id: string) => {
    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Project deleted successfully"
      });
      fetchProjects();
    }

    return { error };
  };

  return {
    projects,
    loading,
    createProject,
    updateProject,
    deleteProject,
    refetch: fetchProjects
  };
};