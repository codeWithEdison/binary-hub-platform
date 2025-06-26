
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Bell,
  Tag,
  Calendar,
  User,
  Save,
  ArrowLeft,
  AlertCircle
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

// Sample data
const announcementCategories = [
  "Membership",
  "Partnership",
  "Donation",
  "Operations",
  "Event",
  "Resources"
];

const importanceLevels = ["low", "medium", "high"];

const AnnouncementForm = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    date: "",
    category: "",
    importance: "",
    author: {
      name: "Jean Paul Habineza", // Default author, would be current user in real app
      role: "Program Coordinator",
      image: "/img/cordinator.jpg"
    }
  });

  // If in edit mode, fetch announcement data
  useEffect(() => {
    if (isEditMode) {
      // In a real app, fetch data from API based on ID
      // For now, just use mock data
      const mockData = {
        title: "Applications Open for Innovation Hub Membership",
        content: "We are excited to announce that applications for the tekinova Hub membership are now open. Join our vibrant community of innovators and access resources, mentorship, and networking opportunities.",
        date: "2023-11-10",
        category: "Membership",
        importance: "high",
        author: {
          name: "Jean Paul Habineza",
          role: "Program Coordinator",
          image: "/img/cordinator.jpg"
        }
      };
      setFormData(mockData);
    } else {
      // Set today's date by default for new announcements
      const today = new Date().toISOString().split('T')[0];
      setFormData(prev => ({
        ...prev,
        date: today
      }));
    }
  }, [isEditMode, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, save to API
    console.log("Form submitted:", formData);

    toast({
      title: isEditMode ? "Announcement Updated" : "Announcement Created",
      description: `Successfully ${isEditMode ? "updated" : "created"} ${formData.title}`,
    });

    navigate("/admin/announcements");
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold mb-1">
              {isEditMode ? "Edit Announcement" : "Create New Announcement"}
            </h1>
            <p className="text-muted-foreground">
              {isEditMode
                ? "Update the details of this announcement"
                : "Fill in the details to create a new announcement"}
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/admin/announcements" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Announcements
            </Link>
          </Button>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Announcement Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Announcement Title
                </Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter announcement title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  name="content"
                  placeholder="Write the full content of the announcement"
                  value={formData.content}
                  onChange={handleChange}
                  required
                  rows={6}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
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
                  <Label htmlFor="category" className="flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    Category
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleSelectChange("category", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {announcementCategories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="importance" className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    Importance
                  </Label>
                  <Select
                    value={formData.importance}
                    onValueChange={(value) => handleSelectChange("importance", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select importance level" />
                    </SelectTrigger>
                    <SelectContent>
                      {importanceLevels.map(level => (
                        <SelectItem key={level} value={level}>
                          <span className="capitalize">{level}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2 border-t pt-4 mt-4">
                <Label className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Author
                </Label>
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img
                      src={formData.author.image}
                      alt={formData.author.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium">{formData.author.name}</div>
                    <div className="text-sm text-muted-foreground">{formData.author.role}</div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Announcements are published under your name as the current administrator
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/admin/announcements")}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              {isEditMode ? "Update Announcement" : "Publish Announcement"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AnnouncementForm;
