import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { HERO_SLIDE_LIMITS, HeroSlide, HeroSlideInput } from "@/lib/heroSlides";
import { cachedQuery, invalidateCache } from "@/lib/queryCache";

const validateSlide = (slide: HeroSlideInput) => {
  if (slide.title.length > HERO_SLIDE_LIMITS.title) return `Title must be ${HERO_SLIDE_LIMITS.title} characters or fewer.`;
  if (slide.description.trim().length < HERO_SLIDE_LIMITS.descriptionMin) return `Description must be at least ${HERO_SLIDE_LIMITS.descriptionMin} characters.`;
  if (slide.description.length > HERO_SLIDE_LIMITS.description) return `Description must be ${HERO_SLIDE_LIMITS.description} characters or fewer.`;
  if (slide.button_label.length > HERO_SLIDE_LIMITS.buttonLabel) return `Button label must be ${HERO_SLIDE_LIMITS.buttonLabel} characters or fewer.`;
  if (slide.button_url.length > HERO_SLIDE_LIMITS.buttonUrl) return `Button link must be ${HERO_SLIDE_LIMITS.buttonUrl} characters or fewer.`;
  return null;
};

export const useHeroSlides = (admin = false) => {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchSlides = async () => {
    setLoading(true);
    try {
      const cacheKey = admin ? "hero_slides:admin" : "hero_slides:published";
      const data = await cachedQuery(cacheKey, async () => {
        let query = (supabase as any)
          .from("hero_slides")
          .select("*")
          .order("sort_order", { ascending: true })
          .order("created_at", { ascending: true });
        if (!admin) query = query.eq("published", true);
        const { data, error } = await query;
        if (error) throw error;
        return (data as HeroSlide[]) || [];
      });
      setSlides(data);
    } catch {
      toast({ title: "Error", description: "Failed to fetch hero slides", variant: "destructive" });
    }
    setLoading(false);
  };

  const refreshSlides = () => {
    invalidateCache("hero_slides");
    return fetchSlides();
  };

  useEffect(() => {
    fetchSlides();
  }, [admin]);

  const createSlide = async (slide: HeroSlideInput) => {
    const validationError = validateSlide(slide);
    if (validationError) return { data: null, error: new Error(validationError) };
    const { data, error } = await (supabase as any).from("hero_slides").insert([slide]).select().single();
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else {
      toast({ title: "Success", description: "Hero slide created successfully" });
      await refreshSlides();
    }
    return { data: data as HeroSlide | null, error };
  };

  const updateSlide = async (id: string, updates: Partial<HeroSlideInput>) => {
    const validationError = validateSlide({
      title: updates.title || "",
      description: updates.description || "",
      button_label: updates.button_label || "",
      button_url: updates.button_url || "",
      image_url: updates.image_url || "",
      sort_order: updates.sort_order || 0,
      published: updates.published || false,
      created_by: updates.created_by || null,
    });
    if (validationError) return { data: null, error: new Error(validationError) };
    const { data, error } = await (supabase as any).from("hero_slides").update(updates).eq("id", id).select().single();
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else {
      toast({ title: "Success", description: "Hero slide updated successfully" });
      await refreshSlides();
    }
    return { data: data as HeroSlide | null, error };
  };

  const deleteSlide = async (id: string) => {
    const { error } = await (supabase as any).from("hero_slides").delete().eq("id", id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else {
      toast({ title: "Success", description: "Hero slide deleted successfully" });
      await refreshSlides();
    }
    return { error };
  };

  return { slides, loading, createSlide, updateSlide, deleteSlide, refetch: refreshSlides };
};
