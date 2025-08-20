import { useState, useEffect } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        // Handle Google OAuth signup - assign innovator role for new users
        if (event === 'SIGNED_IN' && session?.user) {
          const user = session.user;

          // Check if this is a new user (Google OAuth)
          if (user.app_metadata?.provider === 'google') {
            // Check if user role already exists in database
            const { data: existingRole } = await supabase
              .from("user_roles")
              .select("role")
              .eq("user_id", user.id)
              .single();

            if (!existingRole) {
              // Insert innovator role for new Google users
              const { error: roleError } = await supabase
                .from("user_roles")
                .insert({
                  user_id: user.id,
                  role: "innovator"
                });

              if (roleError) {
                console.error("Error inserting user role for Google user:", roleError);
                toast({
                  title: "Warning",
                  description: "Account created but role assignment failed. Please contact support.",
                  variant: "destructive"
                });
              } else {
                // Update user metadata with role
                const { error: updateError } = await supabase.auth.updateUser({
                  data: {
                    role: "innovator",
                    first_name: user.user_metadata?.full_name?.split(' ')[0] || '',
                    last_name: user.user_metadata?.full_name?.split(' ').slice(1).join(' ') || ''
                  }
                });

                if (updateError) {
                  console.error("Error updating user metadata:", updateError);
                }
              }
            }
          }
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [toast]);

  const signUp = async (email: string, password: string, metadata?: any) => {
    const redirectUrl = `${window.location.origin}/`;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: metadata
      }
    });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } else {
      // If signup successful and we have a user, insert role into user_roles table
      if (data.user && metadata?.role) {
        const { error: roleError } = await supabase
          .from("user_roles")
          .insert({
            user_id: data.user.id,
            role: metadata.role
          });

        if (roleError) {
          console.error("Error inserting user role:", roleError);
          toast({
            title: "Warning",
            description: "Account created but role assignment failed. Please contact support.",
            variant: "destructive"
          });
        }
      }

      toast({
        title: "Success",
        description: "Check your email for verification link"
      });
    }

    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } else {
      // If signin successful and user has role in metadata but not in database, insert it
      if (data.user && data.user.user_metadata?.role) {
        // Check if role already exists in database
        const { data: existingRole } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", data.user.id)
          .single();

        if (!existingRole) {
          // Insert role into database
          const { error: roleError } = await supabase
            .from("user_roles")
            .insert({
              user_id: data.user.id,
              role: data.user.user_metadata.role
            });

          if (roleError) {
            console.error("Error inserting user role:", roleError);
          }
        }
      }
    }

    return { error };
  };

  const signInWithGoogle = async () => {
    // Always use the current origin for redirect
    // This ensures it works in both development and production
    const redirectUrl = `${window.location.origin}/`;

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUrl,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      }
    });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }

    return { error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }

    return { error };
  };

  return {
    user,
    session,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut
  };
};