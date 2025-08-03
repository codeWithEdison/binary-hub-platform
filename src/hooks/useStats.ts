import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Stat {
  id: string;
  label: string;
  value: string;
  created_at: string;
  updated_at: string;
}

export const useStats = () => {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("stats")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch stats",
        variant: "destructive"
      });
    } else {
      setStats(data || []);
    }
    setLoading(false);
  };

  const createStat = async (stat: Omit<Stat, "id" | "created_at" | "updated_at">) => {
    const { data, error } = await supabase
      .from("stats")
      .insert([stat])
      .select()
      .single();

    if (error) {
      toast({
        title: "Error",
        description: "Failed to create stat",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Stat created successfully"
      });
      fetchStats();
    }

    return { data, error };
  };

  const updateStat = async (id: string, updates: Partial<Stat>) => {
    const { error } = await supabase
      .from("stats")
      .update(updates)
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update stat",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Stat updated successfully"
      });
      fetchStats();
    }

    return { error };
  };

  const deleteStat = async (id: string) => {
    const { error } = await supabase
      .from("stats")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete stat",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Stat deleted successfully"
      });
      fetchStats();
    }

    return { error };
  };

  return {
    stats,
    loading,
    createStat,
    updateStat,
    deleteStat,
    refetch: fetchStats
  };
};