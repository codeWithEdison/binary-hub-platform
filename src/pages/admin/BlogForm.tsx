import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { ArrowLeft, Image as ImageIcon, Loader2, Save, Star, Upload } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useBlogPosts, BlogPostInput } from "@/hooks/useBlogPosts";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const slugify = (value: string) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const blogCategories = [
  "AI & Africa",
  "Product Spotlight",
  "Resources",
  "Community",
  "Partnerships",
  "Perspective",
  "Events",
  "Announcements",
  "General",
  "Other",
];

const emptyForm: BlogPostInput = {
  title: "", slug: "", excerpt: "", content: "", category: "General", image: null,
  story_date: "", read_time_minutes: 3, published: false, is_main: false,
  publish_date: new Date().toISOString(), author_id: null,
};

const BlogForm = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const { posts, loading, createPost, updatePost } = useBlogPosts(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<BlogPostInput>(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const usesCustomCategory = formData.category === "Other" || !blogCategories.includes(formData.category);

  useEffect(() => {
    if (isEditMode && id) {
      const post = posts.find((item) => item.id === id);
      if (post) setFormData({ ...post });
    } else if (!isEditMode && user?.id) {
      setFormData((current) => ({ ...current, author_id: user.id }));
    }
  }, [id, isEditMode, posts, user?.id]);

  const updateField = (field: keyof BlogPostInput, value: string | boolean | number | null) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast({ title: "Invalid file", description: "Please choose an image file.", variant: "destructive" });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "File too large", description: "Please choose an image smaller than 5MB.", variant: "destructive" });
      return;
    }

    setIsUploading(true);
    const extension = file.name.split(".").pop() || "jpg";
    const path = `blog/${crypto.randomUUID()}.${extension}`;
    const { error } = await supabase.storage.from("images").upload(path, file, { upsert: false, contentType: file.type });
    if (error) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
    } else {
      const { data } = supabase.storage.from("images").getPublicUrl(path);
      updateField("image", data.publicUrl);
    }
    setIsUploading(false);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    const payload = { ...formData, author_id: formData.author_id || user?.id || null };
    const result = isEditMode && id ? await updatePost(id, payload) : await createPost(payload);
    setIsSubmitting(false);
    if (!result.error) navigate("/admin/blog");
  };

  if (isEditMode && loading) return <div className="p-6">Loading blog post...</div>;

  return (
    <div className="p-6"><div className="mx-auto max-w-4xl">
      <div className="mb-6 flex items-center justify-between gap-4"><div><h1 className="mb-1 text-2xl font-semibold">{isEditMode ? "Edit Blog Post" : "New Blog Post"}</h1><p className="text-muted-foreground">Manage the public journal story and its main-blog placement.</p></div><Button variant="outline" asChild><Link to="/admin/blog" className="flex items-center gap-2"><ArrowLeft className="h-4 w-4" /> Back to Blog</Link></Button></div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card><CardHeader><CardTitle>Story Details</CardTitle></CardHeader><CardContent className="space-y-5">
          <div className="space-y-2"><Label htmlFor="title">Title</Label><Input id="title" required value={formData.title} onChange={(event) => { updateField("title", event.target.value); if (!isEditMode) updateField("slug", slugify(event.target.value)); }} /></div>
          <div className="space-y-2"><Label htmlFor="slug">Slug</Label><Input id="slug" required value={formData.slug} onChange={(event) => updateField("slug", slugify(event.target.value))} /><p className="text-xs text-muted-foreground">This is the simple name used in the blog link. Use lowercase words with hyphens, for example: binary-hub-ai-summit.</p></div>
          <div className="grid gap-5 md:grid-cols-3"><div className="space-y-2"><Label htmlFor="category">Category</Label><Select value={usesCustomCategory ? "Other" : formData.category} onValueChange={(value) => updateField("category", value)}><SelectTrigger id="category"><SelectValue placeholder="Select a category" /></SelectTrigger><SelectContent>{blogCategories.map((category) => <SelectItem key={category} value={category}>{category}</SelectItem>)}</SelectContent></Select>{usesCustomCategory && <Input id="custom_category" required placeholder="Enter your category" value={formData.category === "Other" || blogCategories.includes(formData.category) ? "" : formData.category} onChange={(event) => updateField("category", event.target.value)} />}<p className="text-xs text-muted-foreground">Choose a topic, or select Other and enter your own.</p></div><div className="space-y-2"><Label htmlFor="story_date">Experience date</Label><Input id="story_date" placeholder="3-4 April 2025" value={formData.story_date || ""} onChange={(event) => updateField("story_date", event.target.value)} /><p className="text-xs text-muted-foreground">Shown exactly on the blog card.</p></div><div className="space-y-2"><Label htmlFor="read_time_minutes">Read time (minutes)</Label><Input id="read_time_minutes" type="number" min="1" max="120" required value={formData.read_time_minutes} onChange={(event) => updateField("read_time_minutes", Number(event.target.value))} /><p className="text-xs text-muted-foreground">Example: 3 min read.</p></div></div>
          <div className="space-y-2"><Label htmlFor="publish_date">Publish date</Label><Input id="publish_date" type="datetime-local" value={formData.publish_date ? formData.publish_date.slice(0, 16) : ""} onChange={(event) => updateField("publish_date", event.target.value ? new Date(event.target.value).toISOString() : null)} /><p className="text-xs text-muted-foreground">Controls when the post is published. This can differ from the experience date.</p></div>
          <div className="space-y-2"><Label htmlFor="excerpt">Short summary (Excerpt)</Label><Textarea id="excerpt" required rows={3} placeholder="Write a short summary that will appear on the blog card." value={formData.excerpt} onChange={(event) => updateField("excerpt", event.target.value)} /><p className="text-xs text-muted-foreground">Write 1-2 sentences that tell readers what the story is about.</p></div>
          <div className="space-y-2"><Label htmlFor="content">Full content</Label><Textarea id="content" required rows={10} value={formData.content} onChange={(event) => updateField("content", event.target.value)} /></div>
        </CardContent></Card>
        <Card><CardHeader><CardTitle>Cover Image</CardTitle></CardHeader><CardContent className="space-y-4"><input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" /><Button type="button" variant="outline" disabled={isUploading} onClick={() => fileInputRef.current?.click()}><Upload className="mr-2 h-4 w-4" />{isUploading ? "Uploading..." : "Upload image"}</Button>{formData.image ? <img src={formData.image} alt="Blog cover preview" className="max-h-72 w-full object-cover" /> : <div className="flex h-40 items-center justify-center border border-dashed text-muted-foreground"><ImageIcon className="mr-2 h-5 w-5" />No cover image selected</div>}</CardContent></Card>
        <Card><CardHeader><CardTitle>Publishing</CardTitle></CardHeader><CardContent className="space-y-4"><label className="flex cursor-pointer items-start gap-3 rounded-lg border p-4"><input type="checkbox" className="mt-1 h-4 w-4" checked={formData.published} onChange={(event) => updateField("published", event.target.checked)} /><span><span className="font-medium">Publish this post</span><span className="block text-sm text-muted-foreground">Published posts appear on the public blog.</span></span></label><label className="flex cursor-pointer items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4"><input type="checkbox" className="mt-1 h-4 w-4" checked={formData.is_main} onChange={(event) => updateField("is_main", event.target.checked)} /><span><span className="flex items-center gap-2 font-medium"><Star className="h-4 w-4 text-amber-500" /> Main blog post</span><span className="block text-sm text-muted-foreground">This is the primary story highlighted on the public blog. Saving it replaces the current main post.</span></span></label></CardContent></Card>
        <div className="flex justify-end gap-3"><Button type="button" variant="outline" onClick={() => navigate("/admin/blog")}>Cancel</Button><Button type="submit" disabled={isSubmitting || isUploading}><Save className="mr-2 h-4 w-4" />{isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : isEditMode ? "Update post" : "Create post"}</Button></div>
      </form>
    </div></div>
  );
};

export default BlogForm;
