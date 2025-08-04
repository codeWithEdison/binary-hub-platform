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
  featured?: boolean;
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
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchProjects();
    fetchFeaturedProjects();
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
      setProjects((data as any) || []);
    }
    setLoading(false);
  };

  const fetchFeaturedProjects = async () => {
    const { data, error } = await (supabase as any)
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
      .eq("featured", true)
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch featured projects",
        variant: "destructive"
      });
    } else {
      setFeaturedProjects((data as any) || []);
    }
  };

  const createProject = async (project: Omit<Project, "id" | "created_at" | "updated_at">) => {
    try {
      // Extract related data
      const { categories, team, technologies, links, gallery, innovators, ...projectData } = project;

      // Insert main project
      const { data: projectResult, error: projectError } = await (supabase as any)
        .from("projects")
        .insert([projectData])
        .select()
        .single();

      if (projectError) {
        toast({
          title: "Error",
          description: "Failed to create project",
          variant: "destructive"
        });
        return { data: null, error: projectError };
      }

      const projectId = projectResult.id;

      // Insert related data if provided
      if (categories && categories.length > 0) {
        await (supabase as any)
          .from("project_categories")
          .insert(categories.map(cat => ({ project_id: projectId, category: cat.category })));
      }

      if (technologies && technologies.length > 0) {
        await (supabase as any)
          .from("project_technologies")
          .insert(technologies.map(tech => ({ project_id: projectId, technology: tech.technology })));
      }

      if (team && team.length > 0) {
        await (supabase as any)
          .from("project_team")
          .insert(team.map(member => ({
            project_id: projectId,
            name: member.name,
            role: member.role,
            image: member.image
          })));
      }

      if (links && links.length > 0) {
        await (supabase as any)
          .from("project_links")
          .insert(links.map(link => ({
            project_id: projectId,
            url: link.url,
            link_type: link.link_type
          })));
      }

      if (gallery && gallery.length > 0) {
        await (supabase as any)
          .from("project_gallery")
          .insert(gallery.map(img => ({
            project_id: projectId,
            image_url: img.image_url
          })));
      }

      if (innovators && innovators.length > 0) {
        await (supabase as any)
          .from("project_innovators")
          .insert(innovators.map(innovator => ({
            project_id: projectId,
            innovator_id: innovator.innovator_id
          })));
      }

      toast({
        title: "Success",
        description: "Project created successfully"
      });
      fetchProjects();
      fetchFeaturedProjects();

      return { data: projectResult, error: null };
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create project",
        variant: "destructive"
      });
      return { data: null, error };
    }
  };

  const updateProject = async (id: string, updates: Partial<Project>) => {
    try {
      // Extract related data
      const { categories, team, technologies, links, gallery, innovators, ...projectData } = updates;

      // Update main project
      const { error: projectError } = await (supabase as any)
        .from("projects")
        .update(projectData)
        .eq("id", id);

      if (projectError) {
        toast({
          title: "Error",
          description: "Failed to update project",
          variant: "destructive"
        });
        return { error: projectError };
      }

      // Handle related data updates
      if (categories !== undefined) {
        // Delete existing categories and insert new ones
        await (supabase as any).from("project_categories").delete().eq("project_id", id);
        if (categories.length > 0) {
          await (supabase as any)
            .from("project_categories")
            .insert(categories.map(cat => ({ project_id: id, category: cat.category })));
        }
      }

      if (technologies !== undefined) {
        // Delete existing technologies and insert new ones
        await (supabase as any).from("project_technologies").delete().eq("project_id", id);
        if (technologies.length > 0) {
          await (supabase as any)
            .from("project_technologies")
            .insert(technologies.map(tech => ({ project_id: id, technology: tech.technology })));
        }
      }

      if (team !== undefined) {
        // Delete existing team and insert new ones
        await (supabase as any).from("project_team").delete().eq("project_id", id);
        if (team.length > 0) {
          await (supabase as any)
            .from("project_team")
            .insert(team.map(member => ({
              project_id: id,
              name: member.name,
              role: member.role,
              image: member.image
            })));
        }
      }

      if (links !== undefined) {
        // Delete existing links and insert new ones
        await (supabase as any).from("project_links").delete().eq("project_id", id);
        if (links.length > 0) {
          await (supabase as any)
            .from("project_links")
            .insert(links.map(link => ({
              project_id: id,
              url: link.url,
              link_type: link.link_type
            })));
        }
      }

      if (gallery !== undefined) {
        // Delete existing gallery and insert new ones
        await (supabase as any).from("project_gallery").delete().eq("project_id", id);
        if (gallery.length > 0) {
          await (supabase as any)
            .from("project_gallery")
            .insert(gallery.map(img => ({
              project_id: id,
              image_url: img.image_url
            })));
        }
      }

      if (innovators !== undefined) {
        // Delete existing innovators and insert new ones
        await (supabase as any).from("project_innovators").delete().eq("project_id", id);
        if (innovators.length > 0) {
          await (supabase as any)
            .from("project_innovators")
            .insert(innovators.map(innovator => ({
              project_id: id,
              innovator_id: innovator.innovator_id
            })));
        }
      }

      toast({
        title: "Success",
        description: "Project updated successfully"
      });
      fetchProjects();
      fetchFeaturedProjects();

      return { error: null };
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update project",
        variant: "destructive"
      });
      return { error };
    }
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
      fetchFeaturedProjects();
    }

    return { error };
  };

  return {
    projects,
    featuredProjects,
    loading,
    createProject,
    updateProject,
    deleteProject,
    refetch: fetchProjects
  };
};