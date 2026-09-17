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
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { useApplicationSetup } from "@/hooks/useApplicationSetup";

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
const statuses = ["innovator", "alumni", "mentor"];

interface InnovatorFormProps {
    innovatorId?: string;
    onSuccess?: () => void;
    onCancel?: () => void;
    localOnly?: boolean;
    applicationMode?: boolean;
    userId?: string;
}

const InnovatorForm: React.FC<InnovatorFormProps> = ({
    innovatorId,
    onSuccess,
    onCancel,
    localOnly = false,
    applicationMode = false,
    userId
}) => {
    const isEditMode = Boolean(innovatorId);
    const { toast } = useToast();
    const { innovators, createInnovator, updateInnovator, deleteInnovator, loading } = useInnovators({ includeInactive: !localOnly });
    const { options: applicationSetupOptions } = useApplicationSetup();
    const roleOptions = applicationSetupOptions.filter((option) => option.category === "role");
    const departmentOptions = applicationSetupOptions.filter((option) => option.category === "department");
    const skillOptions = applicationSetupOptions.filter((option) => option.category === "skill").map((option) => option.name);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        name: "",
        role: "",
        department: "",
        status: "innovator" as "innovator" | "alumni" | "mentor",
        email: "",
        phone: "",
        city: "",
        gender: "",
        linkedin: "",
        facebook: "",
        twitter: "",
        github: "",
        website: "",
        bio: "",
        image: "",
        skills: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");
    const [application, setApplication] = useState<{
        id?: string;
        status: string;
        applicant_email: string | null;
        university_year: string;
        skills: string[];
        motivation: string;
        interests: string;
        collaboration: string;
        city?: string | null;
        phone?: string | null;
        gender?: string | null;
        role?: string | null;
        department?: string | null;
        bio?: string | null;
        image?: string | null;
        linkedin?: string | null;
        facebook?: string | null;
        twitter?: string | null;
        github?: string | null;
        website?: string | null;
    } | null>(null);

    useEffect(() => {
        if (!localOnly) return;
        const savedProfile = localStorage.getItem("binaryhub.innovator.profile");
        if (savedProfile) {
            try {
                setFormData((current) => ({ ...current, ...JSON.parse(savedProfile) }));
            } catch {
                localStorage.removeItem("binaryhub.innovator.profile");
            }
        }
    }, [localOnly]);

    // If in edit mode, fetch innovator data
    useEffect(() => {
        if (isEditMode && innovatorId) {
            const innovator = innovators.find(i => i.id === innovatorId);
            if (innovator) {
                setFormData({
                    name: innovator.name || "",
                    role: innovator.role || "",
                    department: innovator.department || "",
                    status: innovator.status || "innovator",
                    email: "", // Not in current schema
                    phone: "", // Not in current schema
                    city: "",
                    gender: "",
                    linkedin: "",
                    facebook: "",
                    twitter: "",
                    github: "",
                    website: "", // Not in current schema
                    bio: innovator.bio || "",
                    image: innovator.image || "",
                    skills: innovator.skills?.map(s => s.skill).join(", ") || "",
                });
                if (innovator.image) {
                    setImagePreview(innovator.image);
                    setUploadedImageUrl(innovator.image);
                }

                const applicationQuery = supabase
                    .from("applications")
                    .select("*")
                    .limit(1);
                const loadApplication = innovator.application_id
                    ? applicationQuery.eq("id", innovator.application_id).maybeSingle()
                    : innovator.user_id
                        ? applicationQuery.eq("user_id", innovator.user_id).order("created_at", { ascending: false }).maybeSingle()
                        : Promise.resolve({ data: null, error: null });

                loadApplication.then(({ data }) => {
                    if (!data) {
                        if (innovator.application_answers) {
                            setApplication({
                                status: "submitted",
                                applicant_email: innovator.application_answers.email || null,
                                university_year: innovator.application_answers.universityYear || "",
                                skills: innovator.application_answers.skills || [],
                                motivation: innovator.application_answers.motivation || "",
                                interests: innovator.application_answers.interests || "",
                                collaboration: innovator.application_answers.collaboration || "",
                            });
                        }
                        return;
                    }

                    setApplication(data);
                    setFormData((current) => ({
                        ...current,
                        name: data.applicant_name || current.name,
                        email: data.applicant_email || current.email,
                        phone: data.phone || current.phone,
                        city: data.city || current.city,
                        gender: data.gender || current.gender,
                        role: data.role || current.role,
                        department: data.department || current.department,
                        bio: data.bio || current.bio,
                        image: data.image || current.image,
                        linkedin: data.linkedin || current.linkedin,
                        facebook: data.facebook || current.facebook,
                        twitter: data.twitter || current.twitter,
                        github: data.github || current.github,
                        website: data.website || current.website,
                        skills: data.skills?.length ? data.skills.join(", ") : current.skills,
                    }));
                    if (data.image && !imagePreview) {
                        setImagePreview(data.image);
                        setUploadedImageUrl(data.image);
                    }
                });
            }
        }
    }, [isEditMode, innovatorId, innovators, imagePreview]);

    const toggleAccountStatus = async () => {
        if (!innovatorId) return;
        const nextStatus = innovators.find((innovator) => innovator.id === innovatorId)?.account_status === "active"
            ? "inactive"
            : "active";
        await updateInnovator(innovatorId, { account_status: nextStatus });
    };

    const handleDelete = async () => {
        if (!innovatorId || !window.confirm("Delete this innovator account?")) return;
        const { error } = await deleteInnovator(innovatorId);
        if (!error) onCancel?.();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const toggleSkill = (skill: string) => {
        setFormData((current) => {
            const selectedSkills = current.skills.split(",").map((item) => item.trim()).filter(Boolean);
            const nextSkills = selectedSkills.includes(skill)
                ? selectedSkills.filter((item) => item !== skill)
                : [...selectedSkills, skill];
            return { ...current, skills: nextSkills.join(", ") };
        });
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
                linkedin: formData.linkedin,
                facebook: formData.facebook,
                twitter: formData.twitter,
                github: formData.github,
                website: formData.website,
                status: formData.status,
                ...(userId ? { user_id: userId } : {}),
                ...(!applicationMode && !isEditMode ? { account_status: "active" } : {}),
                bio: formData.bio,
                image: uploadedImageUrl || formData.image, // Use uploaded image if available
            };

            if (localOnly && !applicationMode) {
                localStorage.setItem("binaryhub.innovator.profile", JSON.stringify({
                    ...formData,
                    image: uploadedImageUrl || formData.image,
                }));
            } else if (isEditMode && innovatorId) {
                await updateInnovator(innovatorId, innovatorData);
                if (application?.id) {
                    const { error: applicationError } = await (supabase as any)
                        .from("applications")
                        .update({
                            applicant_name: formData.name,
                            applicant_email: formData.email || null,
                            phone: formData.phone || null,
                            city: formData.city || null,
                            gender: formData.gender || null,
                            role: formData.role,
                            department: formData.department,
                            bio: formData.bio,
                            image: uploadedImageUrl || formData.image || null,
                            linkedin: formData.linkedin || null,
                            facebook: formData.facebook || null,
                            twitter: formData.twitter || null,
                            github: formData.github || null,
                            website: formData.website || null,
                        })
                        .eq("id", application.id);
                    if (applicationError) throw applicationError;
                }
                await (supabase as any).from("innovator_skills").delete().eq("innovator_id", innovatorId);
                if (skillsArray.length) {
                    await (supabase as any).from("innovator_skills").insert(
                        skillsArray.map(({ skill }) => ({ innovator_id: innovatorId, skill }))
                    );
                }
                toast({
                    title: "Innovator Updated",
                    description: `Successfully updated ${formData.name}`,
                });
            } else {
                const { error } = await createInnovator(innovatorData);
                if (error) throw error;
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
                            {applicationMode ? "Final application details" : localOnly ? "Complete your profile" : isEditMode ? "Review innovator" : "Add New Innovator"}
                        </h1>
                        <p className="text-muted-foreground">
                            {applicationMode
                                ? "These details are required to finish your application."
                                : localOnly
                                ? "Complete your profile details."
                                : isEditMode
                                ? "Update the details of this innovator"
                                : "Fill in the details to add a new innovator"}
                        </p>
                    </div>
                    <Button variant="outline" asChild>
                        <Link to={applicationMode || localOnly ? "/applications/form" : "/admin/innovators"} className="flex items-center gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            Back to innovators
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
                                    <Select value={formData.role} onValueChange={(value) => handleSelectChange("role", value)} disabled={isSubmitting}>
                                        <SelectTrigger><SelectValue placeholder="Select your role" /></SelectTrigger>
                                        <SelectContent>
                                            {roleOptions.map((option) => <SelectItem key={option.id} value={option.name}>{option.name}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="department" className="flex items-center gap-2">
                                        <Building className="h-4 w-4" /> Department or field
                                    </Label>
                                    <Select value={formData.department} onValueChange={(value) => handleSelectChange("department", value)} disabled={isSubmitting}>
                                        <SelectTrigger><SelectValue placeholder="Select your department or field" /></SelectTrigger>
                                        <SelectContent>
                                            {departmentOptions.map((option) => <SelectItem key={option.id} value={option.name}>{option.name}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {!applicationMode && (
                                    <div className="space-y-2">
                                        <Label htmlFor="status" className="flex items-center gap-2"><GraduationCap className="h-4 w-4" /> Status *</Label>
                                        <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)} disabled={isSubmitting}>
                                            <SelectTrigger><SelectValue placeholder="Select a status" /></SelectTrigger>
                                            <SelectContent>{statuses.map((status) => <SelectItem key={status} value={status}><span className="capitalize">{status}</span></SelectItem>)}</SelectContent>
                                        </Select>
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="email"><Mail className="mr-2 inline h-4 w-4" />Email</Label>
                                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} disabled={isSubmitting} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone"><Phone className="mr-2 inline h-4 w-4" />Phone</Label>
                                    <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} disabled={isSubmitting} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="city">City</Label>
                                    <Input id="city" name="city" value={formData.city} onChange={handleChange} disabled={isSubmitting} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="gender">Gender</Label>
                                    <Input id="gender" name="gender" value={formData.gender} onChange={handleChange} disabled={isSubmitting} />
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
                                    Skills
                                </Label>
                                {skillOptions.length > 0 ? (
                                    <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
                                        {skillOptions.map((skill) => {
                                            const selected = formData.skills.split(",").map((item) => item.trim()).includes(skill);
                                            return (
                                                <label key={skill} className="flex cursor-pointer items-center gap-2 rounded-md border border-border px-3 py-2 text-sm">
                                                    <input type="checkbox" checked={selected} onChange={() => toggleSkill(skill)} disabled={isSubmitting} className="accent-[#00628b]" />
                                                    <span>{skill}</span>
                                                </label>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <Input
                                        id="skills"
                                        name="skills"
                                        placeholder="e.g., Programming, Design, Research"
                                        value={formData.skills}
                                        onChange={handleChange}
                                        disabled={isSubmitting}
                                    />
                                )}
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                {[
                                    ["linkedin", "LinkedIn"],
                                    ["facebook", "Facebook"],
                                    ["twitter", "X / Twitter"],
                                    ["github", "GitHub"],
                                    ["website", "Website"],
                                ].map(([name, label]) => (
                                    <div key={name} className="space-y-2">
                                        <Label htmlFor={name}><Globe className="mr-2 inline h-4 w-4" />{label}</Label>
                                        <Input id={name} name={name} type="url" value={formData[name as keyof typeof formData] as string} onChange={handleChange} disabled={isSubmitting} />
                                    </div>
                                ))}
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
                                ? (isEditMode ? "Updating..." : "Saving...")
                                : (applicationMode ? "Submit application" : localOnly ? "Save profile" : isEditMode ? "Update Innovator" : "Add Innovator")
                            }
                        </Button>
                        {isEditMode && (
                            <>
                                <Button type="button" variant="outline" onClick={toggleAccountStatus}>
                                    {innovators.find((innovator) => innovator.id === innovatorId)?.account_status === "active"
                                        ? "Deactivate account"
                                        : "Activate account"}
                                </Button>
                                <Button type="button" variant="destructive" onClick={handleDelete}>
                                    Delete
                                </Button>
                            </>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default InnovatorForm; 