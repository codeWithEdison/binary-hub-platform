import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { useToast } from "@/hooks/use-toast";

export interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  role: "admin" | "innovator";
  department_id: string | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
}

export const useProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const hasResolvedOnce = useRef(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchProfile();
    } else {
      setProfile(null);
      setLoading(false);
      hasResolvedOnce.current = false;
    }
    // Only re-run when the signed-in user id changes — not on every auth event object.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const fetchProfile = async () => {
    if (!user) return;

    // Keep showing existing shell/forms while refreshing roles on tab focus.
    if (!hasResolvedOnce.current) {
      setLoading(true);
    }

    try {
      const { data: userRoles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .maybeSingle();

      const nextProfile: Profile = {
        id: user.id,
        first_name: user.user_metadata?.first_name || null,
        last_name: user.user_metadata?.last_name || null,
        avatar_url: null,
        role:
          userRoles && typeof userRoles === "object" && "role" in userRoles
            ? (userRoles.role as Profile["role"])
            : user.user_metadata?.role || "innovator",
        department_id: user.user_metadata?.department_id || null,
        bio: user.user_metadata?.bio || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      setProfile(nextProfile);
      hasResolvedOnce.current = true;
    } catch {
      const nextProfile: Profile = {
        id: user.id,
        first_name: user.user_metadata?.first_name || null,
        last_name: user.user_metadata?.last_name || null,
        avatar_url: null,
        role: user.user_metadata?.role || "innovator",
        department_id: user.user_metadata?.department_id || null,
        bio: user.user_metadata?.bio || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setProfile(nextProfile);
      hasResolvedOnce.current = true;
    }
    setLoading(false);
  };

  const updateProfile = async (_updates: Partial<Profile>) => {
    if (!user) return { error: new Error("Not authenticated") };

    toast({
      title: "Info",
      description: "Profile updates not implemented yet",
    });

    return { error: new Error("Profiles table not implemented yet") };
  };

  return {
    profile,
    loading,
    updateProfile,
    refetch: fetchProfile,
  };
};
