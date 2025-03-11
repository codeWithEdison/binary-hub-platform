
import React, { useState, useEffect } from "react";
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
  Trash2
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
import { Badge } from "@/components/ui/badge";
import { innovators } from "@/lib/data";

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
  "IoT"
];

// Sample statuses for selection
const statuses = ["Planning", "In Progress", "Completed", "On Hold"];

const ProjectForm = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    fullDescription: "",
    problemStatement: "",
    solution: "",
    technologies: "",
    results: "",
    impact: "",
    futurePlans: "",
    date: "",
    status: "",
    image: "",
    categories: [],
    team: [],
    gallery: [],
    links: {
      github: "",
      demo: "",
      documentation: ""
    }
  });

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTeamMember, setSelectedTeamMember] = useState("");
  const [galleryUrl, setGalleryUrl] = useState("");

  // If in edit mode, fetch project data
  useEffect(() => {
    if (isEditMode) {
      // In a real app, fetch data from API based on ID
      // For now, just use mock data
      const mockData = {
        title: "Smart Irrigation System",
        description: "An IoT-based system for optimizing water usage in agriculture.",
        fullDescription: "This project aims to develop an intelligent irrigation system that uses IoT sensors to monitor soil moisture, weather conditions, and water usage to optimize irrigation scheduling.",
        problemStatement: "Traditional irrigation methods often waste water and are not responsive to actual plant needs or environmental conditions.",
        solution: "Our solution uses a network of soil moisture sensors connected to a central control system that can automatically adjust irrigation schedules based on real-time data.",
        technologies: "Arduino, IoT sensors, React, Node.js, Machine Learning algorithms",
        results: "Initial tests show a 30% reduction in water usage while maintaining or improving crop yields.",
        impact: "This technology could significantly reduce water usage in agriculture, which accounts for 70% of global freshwater consumption.",
        futurePlans: "We plan to add climate prediction models and expand the system to support a wider range of crops and environments.",
        date: "2023-06-15",
        status: "In Progress",
        image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
        categories: ["Agriculture", "IoT", "Sustainability"],
        team: [
          {
            id: "1",
            name: "Jean Paul Habineza",
            role: "Project Lead",
            image: "/img/cordinator.jpg"
          },
          {
            id: "2",
            name: "Dr. Marie Umubyeyi",
            role: "Advisor",
            image: "/img/deanict.jpg"
          }
        ],
        gallery: [
          "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
          "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
        ],
        links: {
          github: "https://github.com/example/smart-irrigation",
          demo: "https://smart-irrigation-demo.example.com",
          documentation: "https://docs.smart-irrigation.example.com"
        }
      };
      setFormData(mockData);
    }
  }, [isEditMode, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLinkChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      links: {
        ...prev.links,
        [name]: value
      }
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addCategory = () => {
    if (selectedCategory && !formData.categories.includes(selectedCategory)) {
      setFormData(prev => ({ 
        ...prev, 
        categories: [...prev.categories, selectedCategory]
      }));
      setSelectedCategory("");
    }
  };

  const removeCategory = (category) => {
    setFormData(prev => ({ 
      ...prev, 
      categories: prev.categories.filter(c => c !== category)
    }));
  };

  const addTeamMember = () => {
    if (selectedTeamMember) {
      const innovator = innovators.find(i => i.id === selectedTeamMember);
      if (innovator && !formData.team.some(t => t.id === innovator.id)) {
        const newTeamMember = {
          id: innovator.id,
          name: innovator.name,
          role: "Team Member", // Default role
          image: innovator.image
        };
        setFormData(prev => ({ 
          ...prev, 
          team: [...prev.team, newTeamMember]
        }));
      }
      setSelectedTeamMember("");
    }
  };

  const removeTeamMember = (id) => {
    setFormData(prev => ({ 
      ...prev, 
      team: prev.team.filter(t => t.id !== id)
    }));
  };

  const addGalleryImage = () => {
    if (galleryUrl && !formData.gallery.includes(galleryUrl)) {
      setFormData(prev => ({ 
        ...prev, 
        gallery: [...prev.gallery, galleryUrl]
      }));
      setGalleryUrl("");
    }
  };

  const removeGalleryImage = (url) => {
    setFormData(prev => ({ 
      ...prev, 
      gallery: prev.gallery.filter(u => u !== url)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, save to API
    console.log("Form submitted:", formData);
    
    toast({
      title: isEditMode ? "Project Updated" : "Project Created",
      description: `Successfully ${isEditMode ? "updated" : "created"} ${formData.title}`,
    });
    
    navigate("/admin/projects");
  };

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
              <div className="space-y-2">
                <Label htmlFor="title" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Project Title
                </Label>
                <Input 
                  id="title"
                  name="title"
                  placeholder="Enter project title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Short Description</Label>
                <Textarea 
                  id="description"
                  name="description"
                  placeholder="Brief summary of the project (1-2 sentences)"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullDescription">Full Description</Label>
                <Textarea 
                  id="fullDescription"
                  name="fullDescription"
                  placeholder="Detailed description of the project"
                  value={formData.fullDescription}
                  onChange={handleChange}
                  required
                  rows={5}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Start Date
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
                  <Label htmlFor="status" className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Status
                  </Label>
                  <Select 
                    value={formData.status} 
                    onValueChange={(value) => handleSelectChange("status", value)}
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
              </div>

              <div className="space-y-2">
                <Label htmlFor="image" className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  Main Image URL
                </Label>
                <Input 
                  id="image"
                  name="image"
                  placeholder="URL for main project image"
                  value={formData.image}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  Categories
                </Label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.categories.map(category => (
                    <Badge 
                      key={category} 
                      className="flex items-center gap-1"
                      variant="outline"
                    >
                      {category}
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 ml-1 rounded-full"
                        onClick={() => removeCategory(category)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                  {formData.categories.length === 0 && (
                    <span className="text-sm text-muted-foreground">No categories selected</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Select 
                    value={selectedCategory} 
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button 
                    type="button" 
                    size="icon" 
                    onClick={addCategory}
                    disabled={!selectedCategory}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="problemStatement">Problem Statement</Label>
                <Textarea 
                  id="problemStatement"
                  name="problemStatement"
                  placeholder="What problem does this project solve?"
                  value={formData.problemStatement}
                  onChange={handleChange}
                  rows={3}
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
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="technologies">Technologies Used</Label>
                <Input 
                  id="technologies"
                  name="technologies"
                  placeholder="e.g., React, Node.js, Arduino, etc."
                  value={formData.technologies}
                  onChange={handleChange}
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
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="impact">Impact</Label>
                <Textarea 
                  id="impact"
                  name="impact"
                  placeholder="What impact does this project have?"
                  value={formData.impact}
                  onChange={handleChange}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="futurePlans">Future Plans</Label>
                <Textarea 
                  id="futurePlans"
                  name="futurePlans"
                  placeholder="What are the future plans for this project?"
                  value={formData.futurePlans}
                  onChange={handleChange}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="grid gap-4">
                  {formData.team.map(member => (
                    <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <img 
                            src={member.image} 
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-sm text-muted-foreground">{member.role}</div>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                        onClick={() => removeTeamMember(member.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  {formData.team.length === 0 && (
                    <div className="text-center p-4 border rounded-lg">
                      <span className="text-sm text-muted-foreground">No team members added</span>
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2 mt-4">
                  <Select 
                    value={selectedTeamMember} 
                    onValueChange={setSelectedTeamMember}
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select an innovator" />
                    </SelectTrigger>
                    <SelectContent>
                      {innovators.map(innovator => (
                        <SelectItem key={innovator.id} value={innovator.id}>
                          {innovator.name} ({innovator.role})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button 
                    type="button" 
                    size="icon" 
                    onClick={addTeamMember}
                    disabled={!selectedTeamMember}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Gallery</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {formData.gallery.map((url, index) => (
                  <div key={index} className="relative group">
                    <div className="w-full h-32 rounded-lg overflow-hidden">
                      <img 
                        src={url} 
                        alt={`Gallery item ${index+1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeGalleryImage(url)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
                {formData.gallery.length === 0 && (
                  <div className="col-span-full text-center p-4 border rounded-lg">
                    <span className="text-sm text-muted-foreground">No gallery images added</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2 mt-4">
                <Input 
                  placeholder="Enter image URL"
                  value={galleryUrl}
                  onChange={(e) => setGalleryUrl(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  type="button" 
                  onClick={addGalleryImage}
                  disabled={!galleryUrl}
                >
                  Add Image
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>External Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="github" className="flex items-center gap-2">
                  <LinkIcon className="h-4 w-4" />
                  GitHub Repository
                </Label>
                <Input 
                  id="github"
                  name="github"
                  placeholder="GitHub repository URL"
                  value={formData.links.github}
                  onChange={handleLinkChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="demo" className="flex items-center gap-2">
                  <LinkIcon className="h-4 w-4" />
                  Demo Link
                </Label>
                <Input 
                  id="demo"
                  name="demo"
                  placeholder="Live demo URL"
                  value={formData.links.demo}
                  onChange={handleLinkChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="documentation" className="flex items-center gap-2">
                  <LinkIcon className="h-4 w-4" />
                  Documentation
                </Label>
                <Input 
                  id="documentation"
                  name="documentation"
                  placeholder="Documentation URL"
                  value={formData.links.documentation}
                  onChange={handleLinkChange}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate("/admin/projects")}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              {isEditMode ? "Update Project" : "Create Project"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
