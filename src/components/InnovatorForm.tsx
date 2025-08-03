import React, { useState, useEffect, useRef } from "react";
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
    Image as ImageIcon,
    Loader2,
    Upload,
    X,
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
import { useInnovators } from "@/hooks/useInnovators";
import { Skeleton } from "@/components/ui/skeleton";

// Sample departments for selection
const departments = [
    "Computer Science",
    "Information Technology",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Business Administration",
    "Civil Engineering",
    "Chemical Engineering",
    "Biomedical Engineering",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "Economics",
    "Management",
    "Marketing",
    "Finance",
    "Accounting",
    "Law",
    "Medicine",
    "Nursing",
    "Pharmacy",
    "Agriculture",
    "Environmental Science",
    "Architecture",
    "Urban Planning"
];

// Sample statuses for selection
const statuses = ["student", "faculty", "alumni"];

interface InnovatorFormProps {
    innovatorId?: string;
    onSuccess?: () => void;
    onCancel?: () => void;
}

const InnovatorForm: React.FC<InnovatorFormProps> = ({
    innovatorId,
    onSuccess,
    onCancel
}) => {
    const isEditMode = Boolean(innovatorId);
    const { toast } = useToast();
    const { innovators, createInnovator, updateInnovator, loading } = useInnovators();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        name: "",
        role: "",
        department: "",
        status: "student" as "student" | "faculty" | "alumni",
        email: "",
        phone: "",
        website: "",
        bio: "",
        image: "",
        skills: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");

    // If in edit mode, fetch innovator data
    useEffect(() => {
        if (isEditMode && innovatorId) {
            const innovator = innovators.find(i => i.id === innovatorId);
            if (innovator) {
                setFormData({
                    name: innovator.name || "",
                    role: innovator.role || "",
                    department: innovator.department || "",
                    status: innovator.status || "student",
                    email: "", // Not in current schema
                    phone: "", // Not in current schema
                    website: "", // Not in current schema
                    bio: innovator.bio || "",
                    image: innovator.image || "",
                    skills: innovator.skills?.map(s => s.skill).join(", ") || "",
                });
                if (innovator.image) {
                    setImagePreview(innovator.image);
                    setUploadedImageUrl(innovator.image);
                }
            }
        }
    }, [isEditMode, innovatorId, innovators]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Prepare skills array
            const skillsArray = formData.skills
                .split(",")
                .map(skill => skill.trim())
                .filter(skill => skill.length > 0)
                .map(skill => ({ skill }));

            const innovatorData = {
                name: formData.name,
                role: formData.role,
                department: formData.department,
                status: formData.status,
                bio: formData.bio,
                image: uploadedImageUrl || formData.image, // Use uploaded image if available
            };

            if (isEditMode && innovatorId) {
                await updateInnovator(innovatorId, innovatorData);
                toast({
                    title: "Innovator Updated",
                    description: `Successfully updated ${formData.name}`,
                });
            } else {
                await createInnovator(innovatorData);
                toast({
                    title: "Innovator Created",
                    description: `Successfully created ${formData.name}`,
                });
            }

            onSuccess?.();
        } catch (error) {
            toast({
                title: "Error",
                description: `Failed to ${isEditMode ? "update" : "create"} innovator`,
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
                                        Full Name *
                                    </Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        placeholder="Enter full name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="role" className="flex items-center gap-2">
                                        <Briefcase className="h-4 w-4" />
                                        Role *
                                    </Label>
                                    <Input
                                        id="role"
                                        name="role"
                                        placeholder="e.g., Student, Professor, Researcher"
                                        value={formData.role}
                                        onChange={handleChange}
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="department" className="flex items-center gap-2">
                                        <Building className="h-4 w-4" />
                                        Department *
                                    </Label>
                                    <Select
                                        value={formData.department}
                                        onValueChange={(value) => handleSelectChange("department", value)}
                                        disabled={isSubmitting}
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
                                        Status *
                                    </Label>
                                    <Select
                                        value={formData.status}
                                        onValueChange={(value) => handleSelectChange("status", value)}
                                        disabled={isSubmitting}
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
                            <CardTitle>Profile Image</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        {imagePreview ? (
                                            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-border">
                                                <img
                                                    src={imagePreview}
                                                    alt="Profile preview"
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
                                            <div className="w-24 h-24 rounded-full border-2 border-dashed border-muted-foreground/25 flex items-center justify-center bg-muted/50">
                                                <Camera className="h-8 w-8 text-muted-foreground" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-1">
                                        <Label htmlFor="image-upload" className="flex items-center gap-2">
                                            <Upload className="h-4 w-4" />
                                            Upload Profile Image
                                        </Label>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            Upload a profile image (JPG, PNG, GIF - max 5MB)
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
                            <CardTitle>Profile Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
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
                                    disabled={isSubmitting}
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
                                    disabled={isSubmitting}
                                    rows={5}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onCancel}
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
                                : (isEditMode ? "Update Innovator" : "Add Innovator")
                            }
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default InnovatorForm; 