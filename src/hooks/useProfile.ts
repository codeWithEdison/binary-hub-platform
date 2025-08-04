import { useState, useEffect } from "react";
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
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchProfile();
    } else {
      setProfile(null);
      setLoading(false);
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    setLoading(true);
    try {
      // Fetch user roles
      const { data: userRoles, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .single();

      console.log("User roles from database:", userRoles); // Debug log

      // Create profile with role from database, fallback to user metadata, or default to innovator
      const profile: Profile = {
        id: user.id,
        first_name: user.user_metadata?.first_name || null,
        last_name: user.user_metadata?.last_name || null,
        avatar_url: null,
        role: (userRoles && typeof userRoles === 'object' && 'role' in userRoles) ? userRoles.role : (user.user_metadata?.role || "innovator"),
        department_id: user.user_metadata?.department_id || null,
        bio: user.user_metadata?.bio || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      console.log("Created profile:", profile); // Debug log
      setProfile(profile);
    } catch (error) {
      console.log("Error fetching user roles:", error); // Debug log
      // If no role found in database, check user metadata, or default to innovator
      const profile: Profile = {
        id: user.id,
        first_name: user.user_metadata?.first_name || null,
        last_name: user.user_metadata?.last_name || null,
        avatar_url: null,
        role: user.user_metadata?.role || "innovator",
        department_id: user.user_metadata?.department_id || null,
        bio: user.user_metadata?.bio || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      setProfile(profile);
    }
    setLoading(false);
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return { error: new Error("Not authenticated") };

    // Placeholder until profiles table is created
    toast({
      title: "Info",
      description: "Profile updates not implemented yet"
    });

    return { error: new Error("Profiles table not implemented yet") };
  };

  return {
    profile,
    loading,
    updateProfile,
    refetch: fetchProfile
  };
};