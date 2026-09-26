import React, { useState, useEffect, useMemo, useRef } from "react";
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
    Upload,
    X,
    Camera
} from "lucide-react";
import { InlineLoadingOrb } from "@/components/LoadingOrb";
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
import { useAdminFormDraft } from "@/hooks/useAdminFormDraft";
import { uploadPublicImage } from "@/lib/uploadImage";

const statuses = ["innovator", "alumni", "mentor"] as const;

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
    const { createInnovator, updateInnovator, deleteInnovator } = useInnovators({ includeInactive: !localOnly });
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        name: "",
        role: "",
        department: "",
        status: "innovator" as "innovator" | "alumni" | "mentor",
        featured: false,
        binaryHubCode: "",
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
    const [recordLoading, setRecordLoading] = useState(isEditMode && !localOnly);
    const [accountStatus, setAccountStatus] = useState<"active" | "inactive">("inactive");
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

    const [skillDraft, setSkillDraft] = useState("");
    const [isUploadingImage, setIsUploadingImage] = useState(false);

    const draftKey = `innovator:${innovatorId || (localOnly ? "local" : "new")}`;
    const draftPayload = {
        formData,
        imagePreview,
        uploadedImageUrl,
        skillDraft,
        accountStatus,
    };
    const applyDraft = (draft: typeof draftPayload) => {
        if (draft.formData) setFormData(draft.formData);
        if (draft.imagePreview !== undefined) setImagePreview(draft.imagePreview);
        if (typeof draft.uploadedImageUrl === "string") setUploadedImageUrl(draft.uploadedImageUrl);
        if (typeof draft.skillDraft === "string") setSkillDraft(draft.skillDraft);
        if (draft.accountStatus === "active" || draft.accountStatus === "inactive") {
            setAccountStatus(draft.accountStatus);
        }
    };
    const { ready: draftReady, clearDraft, wasRestored } = useAdminFormDraft(
        draftKey,
        draftPayload,
        applyDraft,
        !localOnly
    );

    const selectedSkills = useMemo(
        () => formData.skills.split(",").map((item) => item.trim()).filter(Boolean),
        [formData.skills]
    );

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

    // Load innovator by id for admin edit (does not depend on the cached list)
    useEffect(() => {
        if (!isEditMode || !innovatorId || localOnly) return;
        if (!draftReady || wasRestored) {
            if (wasRestored) setRecordLoading(false);
            return;
        }

        let cancelled = false;

        const loadInnovator = async () => {
            setRecordLoading(true);
            const { data: innovator, error } = await (supabase as any)
                .from("innovators")
                .select("*, skills:innovator_skills(skill)")
                .eq("id", innovatorId)
                .maybeSingle();

            if (cancelled) return;

            if (error || !innovator) {
                toast({
                    title: "Innovator not found",
                    description: error?.message || "This member could not be loaded for editing.",
                    variant: "destructive",
                });
                setRecordLoading(false);
                return;
            }

            setAccountStatus(innovator.account_status === "active" ? "active" : "inactive");
            setFormData({
                name: innovator.name || "",
                role: innovator.role || "",
                department: innovator.department || "",
                status: innovator.status || "innovator",
                featured: Boolean(innovator.featured),
                binaryHubCode: innovator.binary_hub_code || "",
                email: "",
                phone: "",
                city: "",
                gender: innovator.gender || "",
                linkedin: innovator.linkedin || "",
                facebook: innovator.facebook || "",
                twitter: innovator.twitter || "",
                github: innovator.github || "",
                website: innovator.website || "",
                bio: innovator.bio || "",
                image: innovator.image || "",
                skills: innovator.skills?.map((s: { skill: string }) => s.skill).join(", ") || "",
            });
            if (innovator.image) {
                setImagePreview(innovator.image);
                setUploadedImageUrl(innovator.image);
            }

            const applicationQuery = (supabase as any).from("applications").select("*").limit(1);
            const loadApplication = innovator.application_id
                ? applicationQuery.eq("id", innovator.application_id).maybeSingle()
                : innovator.user_id
                    ? applicationQuery.eq("user_id", innovator.user_id).order("created_at", { ascending: false }).maybeSingle()
                    : Promise.resolve({ data: null, error: null });

            const { data } = await loadApplication;
            if (cancelled) return;

            if (!data) {
                if (innovator.application_answers) {
                    setApplication({
                        status: "linked",
                        applicant_email: innovator.application_answers.email || null,
                        university_year: innovator.application_answers.universityYear || "",
                        skills: innovator.application_answers.skills || [],
                        motivation: innovator.application_answers.motivation || "",
                        interests: innovator.application_answers.interests || "",
                        collaboration: innovator.application_answers.collaboration || "",
                    });
                    setFormData((current) => ({
                        ...current,
                        email: innovator.application_answers.email || current.email,
                    }));
                }
            } else {
                    setApplication(data);
                    setFormData((current) => ({
                        ...current,
                        // Prefer innovator profile fields; fill blanks from linked application
                        name: current.name || data.applicant_name || "",
                        email: data.applicant_email || current.email,
                        phone: data.phone || current.phone,
                        city: data.city || current.city,
                        gender: current.gender || data.gender || "",
                        role: current.role || data.role || "",
                        department: current.department || data.department || "",
                        bio: current.bio || data.bio || "",
                        image: current.image || data.image || "",
                        linkedin: current.linkedin || data.linkedin || "",
                        facebook: current.facebook || data.facebook || "",
                        twitter: current.twitter || data.twitter || "",
                        github: current.github || data.github || "",
                        website: current.website || data.website || "",
                        skills: current.skills || (data.skills?.length ? data.skills.join(", ") : ""),
                    }));
                    if (data.image && !imagePreview) {
                        setImagePreview(data.image);
                        setUploadedImageUrl(data.image);
                    }
            }

            setRecordLoading(false);
        };

        loadInnovator();
        return () => {
            cancelled = true;
        };
    }, [isEditMode, innovatorId, localOnly, toast, draftReady, wasRestored]);

    const toggleAccountStatus = async () => {
        if (!innovatorId) return;
        const nextStatus = accountStatus === "active" ? "inactive" : "active";
        const { error } = await updateInnovator(innovatorId, { account_status: nextStatus });
        if (!error) setAccountStatus(nextStatus);
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

    const addSkill = () => {
        const incoming = skillDraft
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean);
        if (!incoming.length) return;

        setFormData((current) => {
            const existing = current.skills.split(",").map((item) => item.trim()).filter(Boolean);
            const existingLower = new Set(existing.map((item) => item.toLowerCase()));
            const next = [...existing];

            for (const skill of incoming) {
                const key = skill.toLowerCase();
                if (existingLower.has(key)) continue;
                existingLower.add(key);
                next.push(skill);
            }

            return { ...current, skills: next.join(", ") };
        });
        setSkillDraft("");
    };

    const removeSkill = (skill: string) => {
        setFormData((current) => {
            const nextSkills = current.skills
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean)
                .filter((item) => item !== skill);
            return { ...current, skills: nextSkills.join(", ") };
        });
    };

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setIsUploadingImage(true);
        const result = await uploadPublicImage(file, "innovators");
        setIsUploadingImage(false);

        if (result.error) {
            toast({
                title: "Upload failed",
                description: result.error,
                variant: "destructive",
            });
        } else if (result.url) {
            setImagePreview(result.url);
            setUploadedImageUrl(result.url);
            setFormData((current) => ({ ...current, image: result.url }));
        }
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const removeImage = () => {
        setImagePreview(null);
        setUploadedImageUrl("");
        setFormData((current) => ({ ...current, image: "" }));
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
                name: formData.name.trim(),
                role: formData.role.trim(),
                department: formData.department.trim(),
                gender: formData.gender || null,
                binary_hub_code: formData.binaryHubCode.trim() || null,
                linkedin: formData.linkedin.trim() || null,
                facebook: formData.facebook.trim() || null,
                twitter: formData.twitter.trim() || null,
                github: formData.github.trim() || null,
                website: formData.website.trim() || null,
                status: formData.status,
                featured: Boolean(formData.featured),
                ...(userId ? { user_id: userId } : {}),
                ...(!applicationMode && !isEditMode ? { account_status: "active" as const } : {}),
                bio: formData.bio.trim() || null,
                image: uploadedImageUrl || formData.image || null,
            };

            if (localOnly && !applicationMode) {
                localStorage.setItem("binaryhub.innovator.profile", JSON.stringify({
                    ...formData,
                    image: innovatorData.image,
                }));
            } else if (isEditMode && innovatorId) {
                const { error } = await updateInnovator(innovatorId, innovatorData as any);
                if (error) throw new Error(error.message || "Failed to update innovator");

                if (application?.id) {
                    const { error: applicationError } = await (supabase as any)
                        .from("applications")
                        .update({
                            applicant_name: formData.name.trim(),
                            applicant_email: formData.email || null,
                            phone: formData.phone || null,
                            city: formData.city || null,
                            gender: formData.gender || null,
                            role: formData.role.trim(),
                            department: formData.department.trim(),
                            bio: formData.bio.trim() || null,
                            image: innovatorData.image,
                            linkedin: innovatorData.linkedin,
                            facebook: innovatorData.facebook,
                            twitter: innovatorData.twitter,
                            github: innovatorData.github,
                            website: innovatorData.website,
                            skills: skillsArray.map(({ skill }) => skill),
                        })
                        .eq("id", application.id);
                    if (applicationError) {
                        console.warn("Application sync failed", applicationError);
                        toast({
                            title: "Profile saved",
                            description: "Innovator updated, but linked application details could not be synced.",
                        });
                    }
                }

                const { error: skillsDeleteError } = await (supabase as any)
                    .from("innovator_skills")
                    .delete()
                    .eq("innovator_id", innovatorId);
                if (skillsDeleteError) throw new Error(skillsDeleteError.message || "Failed to clear skills");

                if (skillsArray.length) {
                    const { error: skillsInsertError } = await (supabase as any).from("innovator_skills").insert(
                        skillsArray.map(({ skill }) => ({ innovator_id: innovatorId, skill }))
                    );
                    if (skillsInsertError) throw new Error(skillsInsertError.message || "Failed to save skills");
                }

                toast({
                    title: "Innovator updated",
                    description: `Successfully updated ${formData.name}`,
                });
            } else {
                const { data, error } = await createInnovator(innovatorData as any);
                if (error) throw new Error(error.message || "Failed to create innovator");
                const createdId = (data as { id?: string } | null)?.id;
                if (createdId && skillsArray.length) {
                    const { error: skillsInsertError } = await (supabase as any).from("innovator_skills").insert(
                        skillsArray.map(({ skill }) => ({ innovator_id: createdId, skill }))
                    );
                    if (skillsInsertError) throw new Error(skillsInsertError.message || "Failed to save skills");
                }
            }

            clearDraft();
            onSuccess?.();
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : typeof error === "object" && error && "message" in error
                      ? String((error as { message: unknown }).message)
                      : `Failed to ${isEditMode ? "update" : "create"} innovator`;
            toast({
                title: "Error",
                description: message,
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (recordLoading && isEditMode) {
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
                            {applicationMode ? "Final application details" : localOnly ? "Complete your profile" : isEditMode ? "Edit innovator" : "Add New Innovator"}
                        </h1>
                        <p className="text-muted-foreground">
                            {applicationMode
                                ? "These details are required to finish your application."
                                : localOnly
                                ? "Complete your profile details."
                                : isEditMode
                                ? "Update this member’s profile, skills, and visibility."
                                : "Fill in the details to add a new innovator"}
                        </p>
                    </div>
                    <Button variant="outline" asChild>
                        <Link to={applicationMode || localOnly ? "/applications/form" : "/admin/members"} className="flex items-center gap-2">
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
                                    <Input
                                        id="role"
                                        name="role"
                                        placeholder="e.g. Software Engineer"
                                        value={formData.role}
                                        onChange={handleChange}
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="department" className="flex items-center gap-2">
                                        <Building className="h-4 w-4" /> Department or field
                                    </Label>
                                    <Input
                                        id="department"
                                        name="department"
                                        placeholder="e.g. Computer Science"
                                        value={formData.department}
                                        onChange={handleChange}
                                        disabled={isSubmitting}
                                    />
                                </div>

                                {!applicationMode && (
                                    <div className="space-y-2">
                                        <Label htmlFor="status" className="flex items-center gap-2"><GraduationCap className="h-4 w-4" /> Status *</Label>
                                        <Select value={formData.status || undefined} onValueChange={(value) => handleSelectChange("status", value)} disabled={isSubmitting}>
                                            <SelectTrigger><SelectValue placeholder="Select a status" /></SelectTrigger>
                                            <SelectContent>{statuses.map((status) => <SelectItem key={status} value={status}><span className="capitalize">{status}</span></SelectItem>)}</SelectContent>
                                        </Select>
                                    </div>
                                )}
                            </div>

                            {!applicationMode && !localOnly && (
                                <div className="space-y-2">
                                    <Label htmlFor="featured">Is management?</Label>
                                    <Select
                                        value={formData.featured ? "yes" : "no"}
                                        onValueChange={(value) =>
                                            setFormData((prev) => ({ ...prev, featured: value === "yes" }))
                                        }
                                        disabled={isSubmitting}
                                    >
                                        <SelectTrigger id="featured">
                                            <SelectValue placeholder="Select yes or no" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="yes">Yes — show in management</SelectItem>
                                            <SelectItem value="no">No</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <p className="text-xs text-muted-foreground">
                                        Yes shows this person in Meet the management on the landing page and innovators directory.
                                    </p>
                                </div>
                            )}

                            {!applicationMode && (
                                <div className="space-y-2">
                                    <Label htmlFor="binaryHubCode">Binary Hub code</Label>
                                    <Input
                                        id="binaryHubCode"
                                        name="binaryHubCode"
                                        placeholder="e.g. 003"
                                        value={formData.binaryHubCode}
                                        onChange={(event) => {
                                            const value = event.target.value
                                                .replace(/[^A-Za-z0-9_-]/g, "")
                                                .slice(0, 32);
                                            setFormData((prev) => ({ ...prev, binaryHubCode: value }));
                                        }}
                                        disabled={isSubmitting}
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Public profile URL:{" "}
                                        <span className="font-medium text-foreground">
                                          /innovators/{formData.binaryHubCode.trim() || "…"}
                                        </span>
                                        . Letters, numbers, hyphen, or underscore.
                                    </p>
                                </div>
                            )}

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
                                    <Select
                                        value={
                                            formData.gender === "Female" || formData.gender === "Male"
                                                ? formData.gender
                                                : undefined
                                        }
                                        onValueChange={(value) => handleSelectChange("gender", value)}
                                        disabled={isSubmitting}
                                    >
                                        <SelectTrigger id="gender">
                                            <SelectValue placeholder="Select gender" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Female">Female</SelectItem>
                                            <SelectItem value="Male">Male</SelectItem>
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
                                            disabled={isSubmitting || isUploadingImage}
                                        >
                                            <Upload className="h-4 w-4 mr-2" />
                                            {isUploadingImage ? "Uploading..." : "Choose Image"}
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
                                <div className="flex gap-2">
                                    <Input
                                        id="skills"
                                        value={skillDraft}
                                        onChange={(event) => setSkillDraft(event.target.value)}
                                        onKeyDown={(event) => {
                                            if (event.key === "Enter") {
                                                event.preventDefault();
                                                addSkill();
                                            }
                                        }}
                                        placeholder="e.g. React, TypeScript, Tailwind"
                                        disabled={isSubmitting}
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={addSkill}
                                        disabled={isSubmitting || !skillDraft.trim()}
                                    >
                                        Add
                                    </Button>
                                </div>
                                {selectedSkills.length > 0 ? (
                                    <div className="flex flex-wrap gap-2 pt-1">
                                        {selectedSkills.map((skill) => (
                                            <span
                                                key={skill}
                                                className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-sm text-slate-700"
                                            >
                                                {skill}
                                                <button
                                                    type="button"
                                                    onClick={() => removeSkill(skill)}
                                                    disabled={isSubmitting}
                                                    className="rounded p-0.5 text-slate-500 hover:bg-slate-200 hover:text-slate-900"
                                                    aria-label={`Remove ${skill}`}
                                                >
                                                    <X className="h-3.5 w-3.5" />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-xs text-muted-foreground">
                                        Type one skill or several separated by commas, then press Add.
                                    </p>
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
                                <InlineLoadingOrb state="working" label="Saving" />
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
                                    {accountStatus === "active"
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