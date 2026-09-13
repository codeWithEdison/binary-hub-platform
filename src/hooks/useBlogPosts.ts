import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  story_date: string | null;
  read_time_minutes: number;
  image: string | null;
  published: boolean;
  is_main: boolean;
  publish_date: string | null;
  author_id: string | null;
  created_at: string;
  updated_at: string;
}

export type BlogPostInput = Omit<BlogPost, "id" | "created_at" | "updated_at">;

export const useBlogPosts = (admin = false, silent = false) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchPosts = async () => {
    setLoading(true);
    const query = (supabase as any)
      .from("blog_posts")
      .select("*")
      .order("is_main", { ascending: false })
      .order("publish_date", { ascending: false, nullsFirst: false });

    const { data, error } = admin ? await query : await query.eq("published", true);

    if (error) {
      if (silent) {
        setPosts([]);
        setLoading(false);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to fetch blog posts",
        variant: "destructive",
      });
    } else {
      setPosts((data as BlogPost[]) || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, [admin]);

  const clearCurrentMainPost = async (exceptId?: string) => {
    let query = (supabase as any).from("blog_posts").update({ is_main: false }).eq("is_main", true);
    if (exceptId) query = query.neq("id", exceptId);
    return query;
  };

  const createPost = async (post: BlogPostInput) => {
    if (post.is_main) {
      const { error: clearError } = await clearCurrentMainPost();
      if (clearError) {
        toast({ title: "Error", description: "Could not update the main blog post", variant: "destructive" });
        return { data: null, error: clearError };
      }
    }
    const { data, error } = await (supabase as any)
      .from("blog_posts")
      .insert([{ ...post, author_id: post.author_id || undefined }])
      .select()
      .single();

    if (error) {
      toast({ title: "Error", description: error.message || "Failed to create blog post", variant: "destructive" });
      return { data: null, error };
    }

    toast({ title: "Success", description: "Blog post created successfully" });
    await fetchPosts();
    return { data: data as BlogPost, error: null };
  };

  const updatePost = async (id: string, updates: Partial<BlogPostInput>) => {
    if (updates.is_main) {
      const { error: clearError } = await clearCurrentMainPost(id);
      if (clearError) {
        toast({ title: "Error", description: "Could not update the main blog post", variant: "destructive" });
        return { data: null, error: clearError };
      }
    }
    const { data, error } = await (supabase as any)
      .from("blog_posts")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      toast({ title: "Error", description: error.message || "Failed to update blog post", variant: "destructive" });
      return { data: null, error };
    }

    toast({ title: "Success", description: "Blog post updated successfully" });
    await fetchPosts();
    return { data: data as BlogPost, error: null };
  };

  const deletePost = async (id: string) => {
    const { error } = await (supabase as any).from("blog_posts").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message || "Failed to delete blog post", variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Blog post deleted successfully" });
      await fetchPosts();
    }
    return { error };
  };

  return { posts, loading, createPost, updatePost, deletePost, refetch: fetchPosts };
};
