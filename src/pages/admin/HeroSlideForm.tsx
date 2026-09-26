import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { ArrowLeft, Image as ImageIcon, Save, Upload } from "lucide-react";
import { InlineLoadingOrb } from "@/components/LoadingOrb";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useHeroSlides } from "@/hooks/useHeroSlides";
import { HERO_SLIDE_LIMITS, HeroSlideInput } from "@/lib/heroSlides";
import { supabase } from "@/integrations/supabase/client";
import { AdminPage, AdminPageHeader, AdminPanel, AdminToolbar } from "@/components/admin/AdminPage";

const emptyForm: HeroSlideInput = {
  title: "",
  description: "",
  image_url: "",
  button_label: "Explore the Hub",
  button_url: "/innovations",
  sort_order: 0,
  published: false,
  created_by: null,
};

const HeroSlideForm = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const { slides, loading, createSlide, updateSlide } = useHeroSlides(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<HeroSlideInput>(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (isEditMode && id) {
      const slide = slides.find((item) => item.id === id);
      if (slide) setFormData({ ...slide });
    } else if (!isEditMode && user?.id) {
      setFormData((current) => ({ ...current, created_by: user.id }));
    }
  }, [id, isEditMode, slides, user?.id]);

  const updateField = <K extends keyof HeroSlideInput>(field: K, value: HeroSlideInput[K]) => {
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
    const path = `hero-slides/${crypto.randomUUID()}.${extension}`;
    const { error } = await supabase.storage.from("images").upload(path, file, { upsert: false, contentType: file.type });
    if (error) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
    } else {
      const { data } = supabase.storage.from("images").getPublicUrl(path);
      updateField("image_url", data.publicUrl);
    }
    setIsUploading(false);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!formData.image_url) {
      toast({ title: "Image required", description: "Upload an image before saving this slide.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    const payload = { ...formData, created_by: formData.created_by || user?.id || null };
    const result = isEditMode && id ? await updateSlide(id, payload) : await createSlide(payload);
    setIsSubmitting(false);
    if (!result.error) navigate("/admin/hero-slides");
    else toast({ title: "Could not save slide", description: result.error.message, variant: "destructive" });
  };

  if (isEditMode && loading) return <AdminPage>Loading hero slide...</AdminPage>;

  return (
    <AdminPage narrow><div className="mx-auto w-full">
      <div className="mb-6 flex items-center justify-between gap-4"><div><h1 className="bh-admin-page-title">{isEditMode ? "Edit Hero Slide" : "New Hero Slide"}</h1><p className="text-muted-foreground">Upload a homepage image and keep its text concise.</p></div><Button variant="outline" asChild><Link to="/admin/hero-slides" className="flex items-center gap-2"><ArrowLeft className="h-4 w-4" /> Back to Hero Slides</Link></Button></div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card><CardHeader><CardTitle>Slide Content</CardTitle></CardHeader><CardContent className="space-y-5">
          <div className="space-y-2"><Label htmlFor="title">Title</Label><Input id="title" required maxLength={HERO_SLIDE_LIMITS.title} value={formData.title} onChange={(event) => updateField("title", event.target.value)} /><p className="text-xs text-muted-foreground">{formData.title.length}/{HERO_SLIDE_LIMITS.title} characters</p></div>
          <div className="space-y-2"><Label htmlFor="description">Description</Label><Textarea id="description" rows={4} required minLength={HERO_SLIDE_LIMITS.descriptionMin} maxLength={HERO_SLIDE_LIMITS.description} value={formData.description} onChange={(event) => updateField("description", event.target.value)} /><p className="text-xs text-muted-foreground">{formData.description.length}/{HERO_SLIDE_LIMITS.description} characters. Minimum {HERO_SLIDE_LIMITS.descriptionMin} characters.</p></div>
          <div className="grid gap-5 md:grid-cols-3"><div className="space-y-2"><Label htmlFor="button_label">Button label</Label><Input id="button_label" required maxLength={HERO_SLIDE_LIMITS.buttonLabel} value={formData.button_label} onChange={(event) => updateField("button_label", event.target.value)} /></div><div className="space-y-2"><Label htmlFor="button_url">Button link</Label><Input id="button_url" required maxLength={HERO_SLIDE_LIMITS.buttonUrl} value={formData.button_url} onChange={(event) => updateField("button_url", event.target.value)} /></div><div className="space-y-2"><Label htmlFor="sort_order">Display order</Label><Input id="sort_order" type="number" min="0" max="999" value={formData.sort_order} onChange={(event) => updateField("sort_order", Number(event.target.value))} /></div></div>
        </CardContent></Card>
        <Card><CardHeader><CardTitle>Slide Image</CardTitle></CardHeader><CardContent className="space-y-4"><input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" /><Button type="button" variant="outline" disabled={isUploading} onClick={() => fileInputRef.current?.click()}><Upload className="mr-2 h-4 w-4" />{isUploading ? "Uploading..." : "Upload slide image"}</Button><p className="text-xs text-muted-foreground">JPG, PNG, or WebP. Maximum 5MB. Stored in the hero-slides folder.</p>{formData.image_url ? <img src={formData.image_url} alt="Hero slide preview" className="max-h-80 w-full rounded-md object-cover" /> : <div className="flex h-48 items-center justify-center border border-dashed text-muted-foreground"><ImageIcon className="mr-2 h-5 w-5" />No image selected</div>}</CardContent></Card>
        <Card><CardHeader><CardTitle>Publishing</CardTitle></CardHeader><CardContent><label className="flex cursor-pointer items-start gap-3 rounded-lg border p-4"><input type="checkbox" className="mt-1 h-4 w-4" checked={formData.published} onChange={(event) => updateField("published", event.target.checked)} /><span><span className="font-medium">Publish this slide</span><span className="block text-sm text-muted-foreground">Published slides appear in the homepage carousel.</span></span></label></CardContent></Card>
        <div className="flex justify-end gap-3"><Button type="button" variant="outline" onClick={() => navigate("/admin/hero-slides")}>Cancel</Button><Button type="submit" disabled={isSubmitting || isUploading}><Save className="mr-2 h-4 w-4" />{isSubmitting ? <InlineLoadingOrb state="working" label="Saving" /> : isEditMode ? "Update slide" : "Create slide"}</Button></div>
      </form>
    </div>
    </AdminPage>
  );
};

export default HeroSlideForm;
