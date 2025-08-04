import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Announcement {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  category: string | null;
  importance: string;
  image: string | null;
  published: boolean;
  publish_date: string | null;
  author_id: string | null;
  created_at: string;
  updated_at: string;
}

export const useAnnouncements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("announcements")
      .select("*")
      .eq("published", true)
      .order("publish_date", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch announcements",
        variant: "destructive"
      });
    } else {
      setAnnouncements((data as any) || []);
    }
    setLoading(false);
  };

  const createAnnouncement = async (announcement: Omit<Announcement, "id" | "created_at" | "updated_at">) => {
    try {
      const { data, error } = await (supabase as any)
        .from("announcements")
        .insert([announcement])
        .select()
        .single();

      if (error) {
        toast({
          title: "Error",
          description: "Failed to create announcement",
          variant: "destructive"
        });
        return { data: null, error };
      }

      toast({
        title: "Success",
        description: "Announcement created successfully"
      });
      fetchAnnouncements();

      return { data, error: null };
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create announcement",
        variant: "destructive"
      });
      return { data: null, error };
    }
  };

  const updateAnnouncement = async (id: string, updates: Partial<Announcement>) => {
    try {
      const { error } = await (supabase as any)
        .from("announcements")
        .update(updates)
        .eq("id", id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update announcement",
          variant: "destructive"
        });
        return { error };
      }

      toast({
        title: "Success",
        description: "Announcement updated successfully"
      });
      fetchAnnouncements();

      return { error: null };
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update announcement",
        variant: "destructive"
      });
      return { error };
    }
  };

  const deleteAnnouncement = async (id: string) => {
    const { error } = await supabase
      .from("announcements")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete announcement",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Announcement deleted successfully"
      });
      fetchAnnouncements();
    }

    return { error };
  };

  return {
    announcements,
    loading,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
    refetch: fetchAnnouncements
  };
};