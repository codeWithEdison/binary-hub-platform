import React, { useState, useEffect, useRef, ChangeEvent, FormEvent } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  CalendarRange,
  Clock,
  MapPin,
  Users,
  Image as ImageIcon,
  Save,
  ArrowLeft,
  Upload,
  X,
} from "lucide-react";
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
import { useEvents, type EventInput } from "@/hooks/useEvents";
import { uploadPublicImage } from "@/lib/uploadImage";
import { InlineLoadingOrb } from "@/components/LoadingOrb";

const categories = ["Hackathon", "Workshop", "Masterclass", "Networking", "Showcase", "Conference", "Seminar"];

const emptyForm = {
  title: "",
  description: "",
  content: "",
  date: "",
  time: "",
  location: "",
  category: "",
  capacity: "",
  image: "",
  published: true,
};

const EventForm = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { events, loading, createEvent, updateEvent } = useEvents(true);

  const [formData, setFormData] = useState(emptyForm);
  const draftKey = `event:${id || "new"}`;
  const { ready: draftReady, clearDraft, wasRestored } = useAdminFormDraft(
    draftKey,
    formData,
    setFormData
  );

  useEffect(() => {
    if (!draftReady || wasRestored) return;
    if (isEditMode && id) {
      const event = events.find((item) => item.id === id);
      if (!event) return;
      setFormData({
        title: event.title || "",
        description: event.description || "",
        content: event.content || "",
        date: event.date ? event.date.slice(0, 10) : "",
        time: event.time || "",
        location: event.location || "",
        category: event.category || "",
        capacity: event.capacity != null ? String(event.capacity) : "",
        image: event.image || "",
        published: Boolean(event.published),
      });
    }
  }, [isEditMode, id, events, draftReady, wasRestored]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    const result = await uploadPublicImage(file, "events");
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
    if (!formData.image) {
      toast({
        title: "Image required",
        description: "Upload an event image before saving.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    const capacity = formData.capacity.trim() ? Number(formData.capacity) : null;
    const payload: EventInput = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      content: formData.content.trim() || null,
      date: formData.date,
      time: formData.time || null,
      location: formData.location.trim() || null,
      category: formData.category || null,
      capacity,
      max_attendees: capacity,
      image: formData.image,
      published: formData.published,
      registration_deadline: null,
    };

    const result =
      isEditMode && id
        ? await updateEvent(id, payload)
        : await createEvent(payload);

    setIsSubmitting(false);
    if (!result.error) {
      clearDraft();
      navigate("/admin/events");
    }
  };

  if (isEditMode && loading && !formData.title) {
    return <AdminPage>Loading event...</AdminPage>;
  }

  return (
    <AdminPage>
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="bh-admin-page-title">
              {isEditMode ? "Edit Event" : "Create New Event"}
            </h1>
            <p className="text-muted-foreground">
              {isEditMode ? "Update event details" : "Publish a Binary Hub event"}
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/admin/events" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Events
            </Link>
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Event Title</Label>
                <Input
                  id="title"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Short description</Label>
                <Textarea
                  id="description"
                  name="description"
                  required
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Full details <span className="font-normal text-muted-foreground">(optional)</span></Label>
                <Textarea
                  id="content"
                  name="content"
                  rows={6}
                  value={formData.content}
                  onChange={handleChange}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="date" className="flex items-center gap-2">
                    <CalendarRange className="h-4 w-4" />
                    Date
                  </Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time" className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Time
                  </Label>
                  <Input
                    id="time"
                    name="time"
                    type="time"
                    value={formData.time}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Location
                  </Label>
                  <Input
                    id="location"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="capacity" className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Capacity
                  </Label>
                  <Input
                    id="capacity"
                    name="capacity"
                    type="number"
                    min="0"
                    value={formData.capacity}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  Event image
                </Label>
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
                    alt="Event preview"
                    className="max-h-64 w-full rounded-md object-cover"
                  />
                ) : (
                  <div className="flex h-40 items-center justify-center rounded-md border border-dashed text-muted-foreground">
                    <ImageIcon className="mr-2 h-5 w-5" />
                    No image selected
                  </div>
                )}
              </div>

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
                  <span className="font-medium">Publish this event</span>
                  <span className="block text-sm text-muted-foreground">
                    Published events appear on the public events page.
                  </span>
                </span>
              </label>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => navigate("/admin/events")}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || isUploading} className="gap-2">
              <Save className="h-4 w-4" />
              {isSubmitting ? (
                <InlineLoadingOrb state="working" label="Saving" />
              ) : isEditMode ? (
                "Update Event"
              ) : (
                "Create Event"
              )}
            </Button>
          </div>
        </form>
      </div>
    </AdminPage>
  );
};

export default EventForm;
