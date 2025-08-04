import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Event {
  id: string;
  title: string;
  description: string;
  content: string | null;
  date: string;
  time: string | null;
  location: string | null;
  category: string | null;
  capacity: number | null;
  image: string | null;
  published: boolean;
  max_attendees: number | null;
  registration_deadline: string | null;
  created_at: string;
  updated_at: string;
}

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("published", true)
      .order("date", { ascending: true });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch events",
        variant: "destructive"
      });
    } else {
      setEvents((data as any) || []);
    }
    setLoading(false);
  };

  const createEvent = async (event: Omit<Event, "id" | "created_at" | "updated_at">) => {
    try {
      const { data, error } = await (supabase as any)
        .from("events")
        .insert([event])
        .select()
        .single();

      if (error) {
        toast({
          title: "Error",
          description: "Failed to create event",
          variant: "destructive"
        });
        return { data: null, error };
      }

      toast({
        title: "Success",
        description: "Event created successfully"
      });
      fetchEvents();

      return { data, error: null };
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create event",
        variant: "destructive"
      });
      return { data: null, error };
    }
  };

  const updateEvent = async (id: string, updates: Partial<Event>) => {
    try {
      const { error } = await (supabase as any)
        .from("events")
        .update(updates)
        .eq("id", id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update event",
          variant: "destructive"
        });
        return { error };
      }

      toast({
        title: "Success",
        description: "Event updated successfully"
      });
      fetchEvents();

      return { error: null };
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update event",
        variant: "destructive"
      });
      return { error };
    }
  };

  const deleteEvent = async (id: string) => {
    const { error } = await supabase
      .from("events")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete event",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Event deleted successfully"
      });
      fetchEvents();
    }

    return { error };
  };

  return {
    events,
    loading,
    createEvent,
    updateEvent,
    deleteEvent,
    refetch: fetchEvents
  };
};