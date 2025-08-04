import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Stakeholder {
  id: string;
  name: string;
  logo: string | null;
  category: string;
  contribution: string | null;
  website: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  created_at: string;
  updated_at: string;
}

export const useStakeholders = () => {
  const [stakeholders, setStakeholders] = useState<Stakeholder[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchStakeholders();
  }, []);

  const fetchStakeholders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("stakeholders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch stakeholders",
        variant: "destructive"
      });
    } else {
      setStakeholders(data || []);
    }
    setLoading(false);
  };

  const createStakeholder = async (stakeholder: Omit<Stakeholder, "id" | "created_at" | "updated_at">) => {
    const { data, error } = await supabase
      .from("stakeholders")
      .insert([stakeholder])
      .select()
      .single();

    if (error) {
      toast({
        title: "Error",
        description: "Failed to create stakeholder",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Stakeholder created successfully"
      });
      fetchStakeholders();
    }

    return { data, error };
  };

  const updateStakeholder = async (id: string, updates: Partial<Stakeholder>) => {
    const { error } = await supabase
      .from("stakeholders")
      .update(updates)
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update stakeholder",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Stakeholder updated successfully"
      });
      fetchStakeholders();
    }

    return { error };
  };

  const deleteStakeholder = async (id: string) => {
    const { error } = await supabase
      .from("stakeholders")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete stakeholder",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Stakeholder deleted successfully"
      });
      fetchStakeholders();
    }

    return { error };
  };

  return {
    stakeholders,
    loading,
    createStakeholder,
    updateStakeholder,
    deleteStakeholder,
    refetch: fetchStakeholders
  };
};