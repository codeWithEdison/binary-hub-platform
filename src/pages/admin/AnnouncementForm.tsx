import React, { useState, useEffect, useRef, ChangeEvent, FormEvent } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Image as ImageIcon, Save, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { AdminPage } from "@/components/admin/AdminPage";
import { useAdminFormDraft } from "@/hooks/useAdminFormDraft";
import { useAnnouncements, type AnnouncementInput } from "@/hooks/useAnnouncements";
import { uploadPublicImage } from "@/lib/uploadImage";
import { InlineLoadingOrb } from "@/components/LoadingOrb";

const announcementCategories = [
  "Membership",
  "Partnership",
  "Donation",
  "Operations",
  "Event",
  "Resources",
  "General",
];

const importanceLevels = ["low", "medium", "high"];

const emptyForm = {
  title: "",
  content: "",
  excerpt: "",
  category: "",
  importance: "medium",
  image: "",
  published: true,
  publish_date: new Date().toISOString().slice(0, 16),
};

const AnnouncementForm = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { announcements, loading, createAnnouncement, updateAnnouncement } =
    useAnnouncements(true);

  const [formData, setFormData] = useState(emptyForm);
  const draftKey = `announcement:${id || "new"}`;
  const { ready: draftReady, clearDraft, wasRestored } = useAdminFormDraft(
    draftKey,
    formData,
    setFormData
  );

  useEffect(() => {
    if (!draftReady || wasRestored) return;
    if (isEditMode && id) {
      const announcement = announcements.find((item) => item.id === id);
      if (!announcement) return;
      setFormData({
        title: announcement.title || "",
        content: announcement.content || "",
        excerpt: announcement.excerpt || "",
        category: announcement.category || "",
        importance: announcement.importance || "medium",
        image: announcement.image || "",
        published: Boolean(announcement.published),
        publish_date: announcement.publish_date
          ? announcement.publish_date.slice(0, 16)
          : new Date().toISOString().slice(0, 16),
      });
    }
  }, [isEditMode, id, announcements, draftReady, wasRestored]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    const result = await uploadPublicImage(file, "announcements");
    setIsUploading(false);
    if (result.error) {
      toast({ title: "Upload failed", description: result.error, variant: "destructive" });
    } else if (result.url) {
      setFormData((prev) => ({ ...prev, image: result.url }));
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload: AnnouncementInput = {
      title: formData.title.trim(),
      content: formData.content.trim(),
      excerpt: formData.excerpt.trim() || null,
      category: formData.category || null,
      importance: formData.importance,
      image: formData.image || null,
      published: formData.published,
      publish_date: formData.publish_date
        ? new Date(formData.publish_date).toISOString()
        : new Date().toISOString(),
      author_id: null,
    };

    const result =
      isEditMode && id
        ? await updateAnnouncement(id, payload)
        : await createAnnouncement(payload);

    setIsSubmitting(false);
    if (!result.error) {
      clearDraft();
      navigate("/admin/announcements");
    }
  };

  if (isEditMode && loading && !formData.title) {
    return <AdminPage>Loading announcement...</AdminPage>;
  }

  return (
    <AdminPage>
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="bh-admin-page-title">
              {isEditMode ? "Edit Announcement" : "Create Announcement"}
            </h1>
            <p className="text-muted-foreground">
              Share Hub news with the public site.
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/admin/announcements" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Announcement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" required value={formData.title} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="excerpt">Short summary</Label>
                <Textarea
                  id="excerpt"
                  name="excerpt"
                  rows={2}
                  value={formData.excerpt}
                  onChange={handleChange}
                  placeholder="Shown on listing cards"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  name="content"
                  required
                  rows={8}
                  value={formData.content}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {announcementCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Importance</Label>
                  <Select
                    value={formData.importance}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, importance: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {importanceLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="publish_date">Publish date</Label>
                  <Input
                    id="publish_date"
                    name="publish_date"
                    type="datetime-local"
                    value={formData.publish_date}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="outline"
                  disabled={isUploading}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  {isUploading ? "Uploading..." : formData.image ? "Replace image" : "Upload image"}
                </Button>
                {formData.image ? (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setFormData((prev) => ({ ...prev, image: "" }))}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Remove
                  </Button>
                ) : null}
              </div>
              {formData.image ? (
                <img
                  src={formData.image}
                  alt="Announcement preview"
                  className="max-h-56 w-full rounded-md object-cover"
                />
              ) : (
                <div className="flex h-36 items-center justify-center rounded-md border border-dashed text-muted-foreground">
                  <ImageIcon className="mr-2 h-5 w-5" />
                  Optional cover image
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Publishing</CardTitle>
            </CardHeader>
            <CardContent>
              <label className="flex cursor-pointer items-start gap-3 rounded-lg border p-4">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4"
                  checked={formData.published}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, published: e.target.checked }))
                  }
                />
                <span>
                  <span className="font-medium">Publish this announcement</span>
                  <span className="block text-sm text-muted-foreground">
                    Published items appear on the public announcements page.
                  </span>
                </span>
              </label>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => navigate("/admin/announcements")}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || isUploading} className="gap-2">
              <Save className="h-4 w-4" />
              {isSubmitting ? (
                <InlineLoadingOrb state="working" label="Saving" />
              ) : isEditMode ? (
                "Update"
              ) : (
                "Create"
              )}
            </Button>
          </div>
        </form>
      </div>
    </AdminPage>
  );
};

export default AnnouncementForm;
