
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  User, 
  Building, 
  GraduationCap, 
  Briefcase, 
  Mail, 
  Phone, 
  Globe, 
  Save,
  ArrowLeft,
  Tag,
  Image as ImageIcon
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

// Sample departments for selection
const departments = [
  "Computer Science", 
  "Information Technology", 
  "Electrical Engineering", 
  "Mechanical Engineering",
  "Business Administration"
];

// Sample statuses for selection
const statuses = ["student", "faculty", "alumni"];

const InnovatorForm = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    department: "",
    status: "",
    email: "",
    phone: "",
    website: "",
    bio: "",
    image: "",
    skills: "",
  });

  // If in edit mode, fetch innovator data
  useEffect(() => {
    if (isEditMode) {
      // In a real app, fetch data from API based on ID
      // For now, just use mock data
      const mockData = {
        name: "Dr. Marie Umubyeyi",
        role: "Director",
        department: "Computer Science",
        status: "faculty",
        email: "marie@example.com",
        phone: "+250 78 123 4567",
        website: "https://example.com/marie",
        bio: "Dr. Marie Umubyeyi is an AI researcher with over 10 years of experience in machine learning and natural language processing.",
        image: "/img/deanict.jpg",
        skills: "Machine Learning, NLP, AI Ethics, Research"
      };
      setFormData(mockData);
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
      title: isEditMode ? "Innovator Updated" : "Innovator Created",
      description: `Successfully ${isEditMode ? "updated" : "created"} ${formData.name}`,
    });
    
    navigate("/admin/innovators");
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold mb-1">
              {isEditMode ? "Edit Innovator" : "Add New Innovator"}
            </h1>
            <p className="text-muted-foreground">
              {isEditMode 
                ? "Update the details of this innovator" 
                : "Fill in the details to add a new innovator"}
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/admin/innovators" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Innovators
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
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Full Name
                  </Label>
                  <Input 
                    id="name"
                    name="name"
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role" className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    Role
                  </Label>
                  <Input 
                    id="role"
                    name="role"
                    placeholder="e.g., Student, Professor, Researcher"
                    value={formData.role}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="department" className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    Department
                  </Label>
                  <Select 
                    value={formData.department} 
                    onValueChange={(value) => handleSelectChange("department", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map(department => (
                        <SelectItem key={department} value={department}>
                          {department}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status" className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    Status
                  </Label>
                  <Select 
                    value={formData.status} 
                    onValueChange={(value) => handleSelectChange("status", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map(status => (
                        <SelectItem key={status} value={status}>
                          <span className="capitalize">{status}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </Label>
                  <Input 
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone
                  </Label>
                  <Input 
                    id="phone"
                    name="phone"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Website
                </Label>
                <Input 
                  id="website"
                  name="website"
                  placeholder="Enter website URL (if any)"
                  value={formData.website}
                  onChange={handleChange}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Profile Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="image" className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  Profile Image URL
                </Label>
                <Input 
                  id="image"
                  name="image"
                  placeholder="URL for profile image"
                  value={formData.image}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills" className="flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  Skills (comma separated)
                </Label>
                <Input 
                  id="skills"
                  name="skills"
                  placeholder="e.g., Programming, Design, Research"
                  value={formData.skills}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Biography</Label>
                <Textarea 
                  id="bio"
                  name="bio"
                  placeholder="Provide a detailed bio for this innovator"
                  value={formData.bio}
                  onChange={handleChange}
                  required
                  rows={5}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate("/admin/innovators")}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              {isEditMode ? "Update Innovator" : "Add Innovator"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InnovatorForm;
