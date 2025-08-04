
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FileText,
  Tag,
  Calendar,
  Link as LinkIcon,
  Image as ImageIcon,
  Save,
  ArrowLeft,
  User,
  Clock,
  CheckCircle,
  Plus,
  Trash2,
  X,
  Loader2,
  Upload,
  Camera
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
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useProjects } from "@/hooks/useProjects";
import { useInnovators } from "@/hooks/useInnovators";
import { Skeleton } from "@/components/ui/skeleton";

// Sample categories for selection
const categories = [
  "Agriculture",
  "Healthcare",
  "Education",
  "Fintech",
  "Energy",
  "Sustainability",
  "AI/ML",
  "Mobile Apps",
  "IoT",
  "Asset Management",
  "Fleet Management",
  "Request Management",
  "Customer Support"
];

// Sample statuses for selection
const statuses = ["Planning", "In Progress", "Completed", "On Hold"];

const stageOptions = [
  { value: "concept", label: "Concept" },
  { value: "prototype", label: "Prototype" },
  { value: "development", label: "Development" },
  { value: "launched", label: "Launched" }
];

const linkTypeOptions = [
  { value: "demo", label: "Demo" },
  { value: "github", label: "GitHub" },
  { value: "website", label: "Website" },
  { value: "documentation", label: "Documentation" }
];

const ProjectForm = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { createProject, updateProject, projects, loading } = useProjects();
  const { innovators } = useInnovators();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryFileInputRef = useRef<HTMLInputElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    full_description: "",
    problem_statement: "",
    solution: "",
    impact: "",
    results: "",
    future_plans: "",
    category: "",
    stage: "concept" as "concept" | "prototype" | "development" | "launched",
    status: "",
    date: "",
    image: "",
    featured: false
  });

  const [categories, setCategories] = useState<string[]>([""]);
  const [technologies, setTechnologies] = useState<string[]>([""]);
  const [links, setLinks] = useState<Array<{ link_type: string; url: string }>>([{ link_type: "", url: "" }]);
  const [team, setTeam] = useState<Array<{ id: string; name: string; role: string; image: string | null }>>([]);
  const [selectedInnovator, setSelectedInnovator] = useState("");
  const [gallery, setGallery] = useState<string[]>([""]);

  // Image upload states
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");
  const [galleryImages, setGalleryImages] = useState<Array<{ url: string; preview: string }>>([]);

  // If in edit mode, fetch project data
  useEffect(() => {
    if (isEditMode && id) {
      const project = projects.find(p => p.id === id);
      if (project) {
        setFormData({
          title: project.title,
          description: project.description,
          full_description: project.full_description || "",
          problem_statement: project.problem_statement || "",
          solution: project.solution || "",
          impact: project.impact || "",
          results: project.results || "",
          future_plans: project.future_plans || "",
          category: project.category,
          stage: project.stage,
          status: project.status || "",
          date: project.date || "",
          image: project.image || "",
          featured: project.featured || false
        });

        // Set main image preview
        if (project.image) {
          setImagePreview(project.image);
          setUploadedImageUrl(project.image);
        }

        // Set categories
        if (project.categories && project.categories.length > 0) {
          setCategories(project.categories.map(cat => cat.category));
        } else {
          setCategories([""]);
        }

        // Set technologies
        if (project.technologies && project.technologies.length > 0) {
          setTechnologies(project.technologies.map(tech => tech.technology));
        } else {
          setTechnologies([""]);
        }

        // Set links
        if (project.links && project.links.length > 0) {
          setLinks(project.links.map(link => ({ link_type: link.link_type, url: link.url })));
        } else {
          setLinks([{ link_type: "", url: "" }]);
        }

        // Set team
        if (project.team && project.team.length > 0) {
          setTeam(project.team.map(member => ({
            id: member.name, // Using name as ID for existing data
            name: member.name,
            role: member.role,
            image: member.image
          })));
        } else {
          setTeam([]);
        }

        // Set gallery
        if (project.gallery && project.gallery.length > 0) {
          setGallery(project.gallery.map(item => item.image_url));
          setGalleryImages(project.gallery.map(item => ({ url: item.image_url, preview: item.image_url })));
        } else {
          setGallery([""]);
        }
      }
    }
  }, [isEditMode, id, projects]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Image upload handlers
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file",
          variant: "destructive"
        });
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image smaller than 5MB",
          variant: "destructive"
        });
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        setUploadedImageUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setUploadedImageUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleGalleryUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        // Validate file type
        if (!file.type.startsWith('image/')) {
          toast({
            title: "Invalid file type",
            description: "Please select image files only",
            variant: "destructive"
          });
          return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          toast({
            title: "File too large",
            description: "Please select images smaller than 5MB",
            variant: "destructive"
          });
          return;
        }

        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setGalleryImages(prev => [...prev, { url: result, preview: result }]);
          setGallery(prev => [...prev, result]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeGalleryImage = (index: number) => {
    setGalleryImages(prev => prev.filter((_, i) => i !== index));
    setGallery(prev => prev.filter((_, i) => i !== index));
  };

  // Category management
  const addCategory = () => {
    setCategories([...categories, ""]);
  };

  const removeCategory = (index: number) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  const updateCategory = (index: number, value: string) => {
    const newCategories = [...categories];
    newCategories[index] = value;
    setCategories(newCategories);
  };

  // Technology management
  const addTechnology = () => {
    setTechnologies([...technologies, ""]);
  };

  const removeTechnology = (index: number) => {
    setTechnologies(technologies.filter((_, i) => i !== index));
  };

  const updateTechnology = (index: number, value: string) => {
    const newTechnologies = [...technologies];
    newTechnologies[index] = value;
    setTechnologies(newTechnologies);
  };

  // Link management
  const addLink = () => {
    setLinks([...links, { link_type: "", url: "" }]);
  };

  const removeLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const updateLink = (index: number, field: "link_type" | "url", value: string) => {
    const newLinks = [...links];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setLinks(newLinks);
  };

  // Team management
  const addTeamMember = () => {
    if (selectedInnovator) {
      const innovator = innovators.find(i => i.id === selectedInnovator);
      if (innovator && !team.some(t => t.id === innovator.id)) {
        setTeam([...team, {
          id: innovator.id,
          name: innovator.name,
          role: innovator.role || "Team Member",
          image: innovator.image
        }]);
        setSelectedInnovator("");
      }
    }
  };

  const removeTeamMember = (id: string) => {
    setTeam(team.filter(member => member.id !== id));
  };

  // Note: Related data is now handled automatically by the useProjects hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare project data with related data
      const projectData = {
        ...formData,
        date: formData.date || null,
        image: uploadedImageUrl || formData.image || null,
        // Include related data that our hook will handle
        categories: categories.filter(cat => cat.trim()).map(cat => ({ category: cat.trim() })),
        technologies: technologies.filter(tech => tech.trim()).map(tech => ({ technology: tech.trim() })),
        links: links.filter(link => link.url.trim() && link.link_type.trim()).map(link => ({
          url: link.url.trim(),
          link_type: link.link_type.trim()
        })),
        team: team.filter(member => member.name.trim() && member.role.trim()).map(member => ({
          name: member.name.trim(),
          role: member.role.trim(),
          image: member.image?.trim() || null
        })),
        gallery: gallery.filter(url => url.trim()).map(url => ({ image_url: url.trim() })),
        innovators: team.filter(member => member.id && member.id !== member.name).map(member => ({
          innovator_id: member.id
        }))
      };

      console.log("Submitting project data:", projectData);

      if (isEditMode && id) {
        console.log("Updating project with ID:", id);
        const { error } = await updateProject(id, projectData);
        console.log("Update result:", { error });
        if (!error) {
          toast({
            title: "Success",
            description: "Project updated successfully"
          });
          navigate("/admin/projects");
        } else {
          toast({
            title: "Error",
            description: `Failed to update project: ${error?.message || 'Unknown error'}`,
            variant: "destructive"
          });
        }
      } else {
        console.log("Creating new project");
        const { data, error } = await createProject(projectData);
        console.log("Create result:", { data, error });
        if (!error && data) {
          toast({
            title: "Success",
            description: "Project created successfully"
          });
          navigate("/admin/projects");
        } else {
          toast({
            title: "Error",
            description: `Failed to create project: ${error?.message || 'Unknown error'}`,
            variant: "destructive"
          });
        }
      }
    } catch (error) {
      console.error("Error saving project:", error);
      toast({
        title: "Error",
        description: "Failed to save project",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading && isEditMode) {
    return (
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-4 w-64" />
            </div>
            <Skeleton className="h-10 w-32" />
          </div>
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Array.from({ length: 4 }).map((_, j) => (
                      <div key={j} className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold mb-1">
              {isEditMode ? "Edit Project" : "Create New Project"}
            </h1>
            <p className="text-muted-foreground">
              {isEditMode
                ? "Update the details of this project"
                : "Fill in the details to create a new innovation project"}
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/admin/projects" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Projects
            </Link>
          </Button>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Project Title *
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Enter project title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category" className="flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    Category *
                  </Label>
                  <Input
                    id="category"
                    name="category"
                    placeholder="e.g., Agriculture, Healthcare"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Short Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Brief summary of the project (1-2 sentences)"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={2}
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="full_description">Full Description *</Label>
                <Textarea
                  id="full_description"
                  name="full_description"
                  placeholder="Detailed description of the project"
                  value={formData.full_description}
                  onChange={handleChange}
                  required
                  rows={5}
                  disabled={isSubmitting}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="stage" className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Stage *
                  </Label>
                  <Select
                    value={formData.stage}
                    onValueChange={(value) => handleSelectChange("stage", value)}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select project stage" />
                    </SelectTrigger>
                    <SelectContent>
                      {stageOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Start Date *
                  </Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status" className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Status *
                  </Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => handleSelectChange("status", value)}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select project status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map(status => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="featured" className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Featured Project
                  </Label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={formData.featured}
                      onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                      disabled={isSubmitting}
                      className="rounded border-gray-300 text-[#00628b] focus:ring-[#00628b]"
                    />
                    <span className="text-sm text-gray-600">Mark as featured project</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Project Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    {imagePreview ? (
                      <div className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-border">
                        <img
                          src={imagePreview}
                          alt="Project preview"
                          className="w-full h-full object-cover"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                          onClick={removeImage}
                          disabled={isSubmitting}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ) : (
                      <div className="w-32 h-32 rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center bg-muted/50">
                        <Camera className="h-12 w-12 text-muted-foreground" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <Label htmlFor="image-upload" className="flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      Upload Project Image
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Upload a main project image (JPG, PNG, GIF - max 5MB)
                    </p>
                    <input
                      ref={fileInputRef}
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={isSubmitting}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isSubmitting}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Choose Image
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="problem_statement">Problem Statement</Label>
                  <Textarea
                    id="problem_statement"
                    name="problem_statement"
                    placeholder="What problem does this project solve?"
                    value={formData.problem_statement}
                    onChange={handleChange}
                    rows={3}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="solution">Solution</Label>
                  <Textarea
                    id="solution"
                    name="solution"
                    placeholder="How does this project solve the problem?"
                    value={formData.solution}
                    onChange={handleChange}
                    rows={3}
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="impact">Impact</Label>
                  <Textarea
                    id="impact"
                    name="impact"
                    placeholder="What impact does this project have?"
                    value={formData.impact}
                    onChange={handleChange}
                    rows={3}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="results">Results</Label>
                  <Textarea
                    id="results"
                    name="results"
                    placeholder="What results have been achieved so far?"
                    value={formData.results}
                    onChange={handleChange}
                    rows={3}
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="future_plans">Future Plans</Label>
                <Textarea
                  id="future_plans"
                  name="future_plans"
                  placeholder="What are the future plans for this project?"
                  value={formData.future_plans}
                  onChange={handleChange}
                  rows={3}
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label>Technologies Used</Label>
                <div className="space-y-2">
                  {technologies.map((technology, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={technology}
                        onChange={(e) => updateTechnology(index, e.target.value)}
                        placeholder="Enter technology"
                        disabled={isSubmitting}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeTechnology(index)}
                        disabled={isSubmitting}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addTechnology}
                    disabled={isSubmitting}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Technology
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {/* Team Members Display */}
                {team.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {team.map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg bg-card">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-border">
                            <img
                              src={member.image || "/img/placeholder.svg"}
                              alt={member.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = "/img/placeholder.svg";
                              }}
                            />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-sm">{member.name}</div>
                            <div className="text-xs text-muted-foreground">{member.role}</div>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => removeTeamMember(member.id)}
                          disabled={isSubmitting}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-6 border rounded-lg bg-muted/50">
                    <User className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">No team members added yet</p>
                  </div>
                )}

                {/* Add Team Member */}
                <div className="flex gap-2">
                  <Select
                    value={selectedInnovator}
                    onValueChange={setSelectedInnovator}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select an innovator to add to team" />
                    </SelectTrigger>
                    <SelectContent>
                      {innovators
                        .filter(innovator => !team.some(member => member.id === innovator.id))
                        .map(innovator => (
                          <SelectItem key={innovator.id} value={innovator.id}>
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full overflow-hidden">
                                <img
                                  src={innovator.image || "/img/placeholder.svg"}
                                  alt={innovator.name}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.currentTarget.src = "/img/placeholder.svg";
                                  }}
                                />
                              </div>
                              <span>{innovator.name} ({innovator.role})</span>
                            </div>
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addTeamMember}
                    disabled={!selectedInnovator || isSubmitting}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Gallery Images</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Label htmlFor="gallery-upload" className="flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      Upload Gallery Images
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Upload multiple project images (JPG, PNG, GIF - max 5MB each)
                    </p>
                    <input
                      ref={galleryFileInputRef}
                      id="gallery-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleGalleryUpload}
                      className="hidden"
                      disabled={isSubmitting}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => galleryFileInputRef.current?.click()}
                      disabled={isSubmitting}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Choose Images
                    </Button>
                  </div>
                </div>

                {galleryImages.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {galleryImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <div className="w-full h-32 rounded-lg overflow-hidden border-2 border-border">
                          <img
                            src={image.preview}
                            alt={`Gallery item ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeGalleryImage(index)}
                          disabled={isSubmitting}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>External Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {links.map((link, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Select value={link.link_type} onValueChange={(value) => updateLink(index, "link_type", value)} disabled={isSubmitting}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {linkTypeOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      value={link.url}
                      onChange={(e) => updateLink(index, "url", e.target.value)}
                      placeholder="Enter URL"
                      className="flex-1"
                      disabled={isSubmitting}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeLink(index)}
                      disabled={isSubmitting}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addLink}
                  disabled={isSubmitting}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Link
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/admin/projects")}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="flex items-center gap-2">
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              {isSubmitting
                ? (isEditMode ? "Updating..." : "Creating...")
                : (isEditMode ? "Update Project" : "Create Project")
              }
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
