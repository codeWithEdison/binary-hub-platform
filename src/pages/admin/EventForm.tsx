import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import { AdminPage } from "@/components/admin/AdminPage";
import { useAdminFormDraft } from "@/hooks/useAdminFormDraft";
import { uploadPublicImage } from "@/lib/uploadImage";
import { InlineLoadingOrb } from "@/components/LoadingOrb";

const categories = ["Hackathon", "Workshop", "Masterclass", "Networking", "Showcase"];

const EventForm = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "",
    capacity: "",
    image: "",
  });
  const draftKey = `event:${id || "new"}`;
  const { ready: draftReady, clearDraft, wasRestored } = useAdminFormDraft(
    draftKey,
    formData,
    setFormData
  );

  useEffect(() => {
    if (!draftReady || wasRestored) return;
    if (isEditMode) {
      const mockData = {
        title: "AI in Healthcare Workshop",
        description:
          "Learn how artificial intelligence is transforming healthcare delivery in Africa.",
        date: "2023-11-22",
        time: "14:00",
        location: "Virtual Event (Zoom)",
        category: "Workshop",
        capacity: "50",
        image:
          "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      };
      setFormData(mockData);
    }
  }, [isEditMode, id, draftReady, wasRestored]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
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

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, image: "" }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.image) {
      toast({
        title: "Image required",
        description: "Upload an event image before saving.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: isEditMode ? "Event Updated" : "Event Created",
      description: `Successfully ${isEditMode ? "updated" : "created"} ${formData.title}`,
    });

    clearDraft();
    navigate("/admin/events");
  };

  return (
    <AdminPage>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="bh-admin-page-title">
              {isEditMode ? "Edit Event" : "Create New Event"}
            </h1>
            <p className="text-muted-foreground">
              {isEditMode
                ? "Update the details of this event"
                : "Fill in the details to create a new event"}
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/admin/events" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Events
            </Link>
          </Button>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Event Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Enter event title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Provide a detailed description of the event"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={5}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date" className="flex items-center gap-2">
                    <CalendarRange className="h-4 w-4" />
                    Date
                  </Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
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
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Location
                  </Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="Physical or virtual location"
                    value={formData.location}
                    onChange={handleChange}
                    required
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
                    placeholder="Maximum number of attendees"
                    value={formData.capacity}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleSelectChange("category", value)}
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
                    {isUploading
                      ? "Uploading..."
                      : formData.image
                        ? "Replace image"
                        : "Upload image"}
                  </Button>
                  {formData.image ? (
                    <Button type="button" variant="ghost" onClick={removeImage}>
                      <X className="mr-2 h-4 w-4" />
                      Remove
                    </Button>
                  ) : null}
                </div>
                <p className="text-xs text-muted-foreground">
                  JPG, PNG, or WebP. Maximum 5MB.
                </p>
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
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/admin/events")}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex items-center gap-2" disabled={isUploading}>
              <Save className="h-4 w-4" />
              {isUploading ? (
                <InlineLoadingOrb state="working" label="Uploading" />
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
