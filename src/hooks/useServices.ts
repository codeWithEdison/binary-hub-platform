import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  created_at: string;
  updated_at: string;
}

export const useServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch services",
        variant: "destructive"
      });
    } else {
      setServices(data || []);
    }
    setLoading(false);
  };

  const createService = async (service: Omit<Service, "id" | "created_at" | "updated_at">) => {
    const { data, error } = await supabase
      .from("services")
      .insert([service])
      .select()
      .single();

    if (error) {
      toast({
        title: "Error",
        description: "Failed to create service",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Service created successfully"
      });
      fetchServices();
    }

    return { data, error };
  };

  const updateService = async (id: string, updates: Partial<Service>) => {
    const { error } = await supabase
      .from("services")
      .update(updates)
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update service",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Service updated successfully"
      });
      fetchServices();
    }

    return { error };
  };

  const deleteService = async (id: string) => {
    const { error } = await supabase
      .from("services")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete service",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Service deleted successfully"
      });
      fetchServices();
    }

    return { error };
  };

  return {
    services,
    loading,
    createService,
    updateService,
    deleteService,
    refetch: fetchServices
  };
};