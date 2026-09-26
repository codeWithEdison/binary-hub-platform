import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { cachedQuery, invalidateCache } from "@/lib/queryCache";

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

export type AnnouncementInput = Omit<Announcement, "id" | "created_at" | "updated_at">;

export const useAnnouncements = (includeUnpublished = false) => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchAnnouncements();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [includeUnpublished]);

  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      const cacheKey = includeUnpublished ? "announcements:all" : "announcements:published";
      const data = await cachedQuery(cacheKey, async () => {
        let query = (supabase as any)
          .from("announcements")
          .select("*")
          .order("publish_date", { ascending: false });
        if (!includeUnpublished) {
          query = query.eq("published", true);
        }
        const { data, error } = await query;
        if (error) throw error;
        return (data as Announcement[]) || [];
      });
      setAnnouncements(data);
    } catch {
      toast({
        title: "Error",
        description: "Failed to fetch announcements",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  const refresh = () => {
    invalidateCache("announcements");
    return fetchAnnouncements();
  };

  const createAnnouncement = async (announcement: AnnouncementInput) => {
    try {
      const { data, error } = await (supabase as any)
        .from("announcements")
        .insert([announcement])
        .select()
        .single();

      if (error) {
        toast({
          title: "Error",
          description: error.message || "Failed to create announcement",
          variant: "destructive",
        });
        return { data: null, error };
      }

      toast({ title: "Success", description: "Announcement created successfully" });
      await refresh();
      return { data, error: null };
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create announcement",
        variant: "destructive",
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
          description: error.message || "Failed to update announcement",
          variant: "destructive",
        });
        return { error };
      }

      toast({ title: "Success", description: "Announcement updated successfully" });
      await refresh();
      return { error: null };
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update announcement",
        variant: "destructive",
      });
      return { error };
    }
  };

  const deleteAnnouncement = async (id: string) => {
    const { error } = await (supabase as any).from("announcements").delete().eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete announcement",
        variant: "destructive",
      });
    } else {
      toast({ title: "Success", description: "Announcement deleted successfully" });
      await refresh();
    }

    return { error };
  };

  return {
    announcements,
    loading,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
    refetch: refresh,
  };
};
