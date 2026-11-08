import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { liveOrOffline } from "@/lib/liveOrOffline";
import { offlineSetupOptions } from "@/lib/offlineData";

export type SetupCategory = "role" | "department" | "skill";
export interface SetupOption { id: string; category: SetupCategory; name: string; active: boolean; created_at: string; }

export const useApplicationSetup = (includeInactive = false) => {
  const [options, setOptions] = useState<SetupOption[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const refetch = useCallback(async () => {
    setLoading(true);
    try {
      const data = await liveOrOffline(async () => {
        let query = (supabase as any).from("application_setup_options").select("*").order("category").order("name");
        if (!includeInactive) query = query.eq("active", true);
        const { data, error } = await query;
        if (error) throw error;
        return data || [];
      }, () => offlineSetupOptions(includeInactive), []);
      setOptions(data as SetupOption[]);
    } catch {
      setOptions([]);
    }
    setLoading(false);
  }, [includeInactive, toast]);

  useEffect(() => { refetch(); }, [refetch]);

  const addOption = async (category: SetupCategory, name: string) => {
    const { error } = await (supabase as any).from("application_setup_options").insert({ category, name: name.trim() });
    if (error) toast({ title: "Unable to add option", description: error.message, variant: "destructive" });
    else await refetch();
    return { error };
  };

  const removeOption = async (id: string) => {
    const { error } = await (supabase as any).from("application_setup_options").delete().eq("id", id);
    if (error) toast({ title: "Unable to remove option", description: error.message, variant: "destructive" });
    else await refetch();
    return { error };
  };

  return { options, loading, addOption, removeOption, refetch };
};
