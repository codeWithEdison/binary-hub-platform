import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  ClipboardList,
  Eye,
  EyeOff,
  Search,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { AdminPage } from "@/components/admin/AdminPage";
import { useApplicationSetup } from "@/hooks/useApplicationSetup";

type Application = {
  id: string;
  user_id: string | null;
  applicant_name: string | null;
  applicant_email: string | null;
  university_year: string;
  skills: string[];
  motivation: string;
  interests: string;
  collaboration: string;
  status: "draft" | "submitted" | "accepted" | "rejected";
  created_at: string;
  updated_at: string;
  submitted_at: string | null;
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
  highest_education?: string | null;
  discovery_source?: string | null;
};

type ReviewForm = {
  applicant_name: string;
  applicant_email: string;
  phone: string;
  city: string;
  gender: string;
  role: string;
  department: string;
  university_year: string;
  highest_education: string;
  discovery_source: string;
  skillsText: string;
  linkedin: string;
  facebook: string;
  twitter: string;
  github: string;
  website: string;
  bio: string;
  motivation: string;
  interests: string;
  collaboration: string;
  image: string;
};

const emptyReviewForm = (): ReviewForm => ({
  applicant_name: "",
  applicant_email: "",
  phone: "",
  city: "",
  gender: "",
  role: "",
  department: "",
  university_year: "",
  highest_education: "",
  discovery_source: "",
  skillsText: "",
  linkedin: "",
  facebook: "",
  twitter: "",
  github: "",
  website: "",
  bio: "",
  motivation: "",
  interests: "",
  collaboration: "",
  image: "",
});

const applicationToForm = (application: Application): ReviewForm => ({
  applicant_name: application.applicant_name || "",
  applicant_email: application.applicant_email || "",
  phone: application.phone || "",
  city: application.city || "",
  gender: application.gender || "",
  role: application.role || "",
  department: application.department || "",
  university_year: application.university_year || "",
  highest_education: application.highest_education || "",
  discovery_source: application.discovery_source || "",
  skillsText: (application.skills || []).join(", "),
  linkedin: application.linkedin || "",
  facebook: application.facebook || "",
  twitter: application.twitter || "",
  github: application.github || "",
  website: application.website || "",
  bio: application.bio || "",
  motivation: application.motivation || "",
  interests: application.interests || "",
  collaboration: application.collaboration || "",
  image: application.image || "",
});

const parseSkills = (skillsText: string) =>
  skillsText
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean);

const ApplicantManagement = () => {
  const { toast } = useToast();
  const { options: setupOptions } = useApplicationSetup();
  const [applications, setApplications] = useState<Application[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [reviewForm, setReviewForm] = useState<ReviewForm>(emptyReviewForm());
  const [isSaving, setIsSaving] = useState(false);
  const [profileStatuses, setProfileStatuses] = useState<
    Record<string, "active" | "inactive" | "missing">
  >({});

  const roleOptions = setupOptions.filter((option) => option.category === "role");
  const departmentOptions = setupOptions.filter((option) => option.category === "department");

  useEffect(() => {
    const loadApplications = async () => {
      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .order("updated_at", { ascending: false });

      if (error) {
        toast({
          title: "Unable to load applicants",
          description: error.message,
          variant: "destructive",
        });
      } else {
        setApplications((data as Application[]) || []);
        const userIds = ((data as Application[]) || [])
          .map((application) => application.user_id)
          .filter(Boolean);
        if (userIds.length) {
          const { data: profiles } = await (supabase as any)
            .from("innovators")
            .select("user_id, account_status")
            .in("user_id", userIds);
          setProfileStatuses(
            Object.fromEntries(
              userIds.map((userId) => {
                const profile = (profiles || []).find(
                  (item: { user_id: string; account_status: "active" | "inactive" }) =>
                    item.user_id === userId,
                );
                return [userId, profile?.account_status || "missing"];
              }),
            ),
          );
        }
        const applicationIds = ((data as Application[]) || []).map(
          (application) => application.id,
        );
        if (applicationIds.length) {
          const { data: profiles } = await (supabase as any)
            .from("innovators")
            .select("application_id, account_status")
            .in("application_id", applicationIds);
          setProfileStatuses((current) => ({
            ...current,
            ...Object.fromEntries(
              applicationIds.map((applicationId) => {
                const profile = (profiles || []).find(
                  (item: {
                    application_id: string;
                    account_status: "active" | "inactive";
                  }) => item.application_id === applicationId,
                );
                return [
                  applicationId,
                  profile?.account_status || current[applicationId] || "missing",
                ];
              }),
            ),
          }));
        }
      }
      setLoading(false);
    };

    loadApplications();
  }, [toast]);

  const filteredApplications = useMemo(
    () =>
      applications.filter((application) => {
        const search = searchQuery.toLowerCase();
        const matchesSearch = [
          application.id,
          application.user_id,
          application.applicant_name || "",
          application.applicant_email || "",
          application.university_year,
          application.motivation,
          application.interests,
          application.collaboration,
          ...application.skills,
        ].some((value) => value?.toLowerCase().includes(search));
        const matchesStatus = statusFilter === "all" || application.status === statusFilter;
        return matchesSearch && matchesStatus;
      }),
    [applications, searchQuery, statusFilter],
  );

  const submittedCount = applications.filter((a) => a.status === "submitted").length;
  const acceptedCount = applications.filter((a) => a.status === "accepted").length;
  const rejectedCount = applications.filter((a) => a.status === "rejected").length;
  const draftCount = applications.filter((a) => a.status === "draft").length;

  const openReview = (application: Application) => {
    setSelectedApplication(application);
    setReviewForm(applicationToForm(application));
  };

  const closeReview = () => {
    setSelectedApplication(null);
    setReviewForm(emptyReviewForm());
  };

  const updateField = <K extends keyof ReviewForm>(key: K, value: ReviewForm[K]) => {
    setReviewForm((current) => ({ ...current, [key]: value }));
  };

  const buildPayloadFromForm = () => {
    const skills = parseSkills(reviewForm.skillsText);
    return {
      applicant_name: reviewForm.applicant_name.trim() || null,
      applicant_email: reviewForm.applicant_email.trim() || null,
      phone: reviewForm.phone.trim() || null,
      city: reviewForm.city.trim() || null,
      gender: reviewForm.gender || null,
      role: reviewForm.role || null,
      department: reviewForm.department || null,
      university_year: reviewForm.university_year.trim(),
      highest_education: reviewForm.highest_education.trim() || null,
      discovery_source: reviewForm.discovery_source.trim() || null,
      skills,
      linkedin: reviewForm.linkedin.trim() || null,
      facebook: reviewForm.facebook.trim() || null,
      twitter: reviewForm.twitter.trim() || null,
      github: reviewForm.github.trim() || null,
      website: reviewForm.website.trim() || null,
      bio: reviewForm.bio.trim(),
      motivation: reviewForm.motivation.trim(),
      interests: reviewForm.interests.trim(),
      collaboration: reviewForm.collaboration.trim(),
      image: reviewForm.image.trim() || null,
    };
  };

  const mergeApplication = (
    application: Application,
    payload: ReturnType<typeof buildPayloadFromForm>,
    status?: Application["status"],
  ): Application => ({
    ...application,
    ...payload,
    skills: payload.skills,
    status: status || application.status,
    updated_at: new Date().toISOString(),
  });

  const saveApplicationEdits = async (application: Application) => {
    const payload = buildPayloadFromForm();
    const { error } = await (supabase as any)
      .from("applications")
      .update(payload)
      .eq("id", application.id);

    if (error) {
      toast({
        title: "Unable to save changes",
        description: error.message,
        variant: "destructive",
      });
      return null;
    }

    const updated = mergeApplication(application, payload);
    setApplications((current) =>
      current.map((item) => (item.id === application.id ? updated : item)),
    );
    setSelectedApplication(updated);
    return updated;
  };

  const upsertInnovatorFromApplication = async (application: Application) => {
    const { data: applicationProfile } = await (supabase as any)
      .from("innovators")
      .select("id, account_status")
      .eq("application_id", application.id)
      .maybeSingle();
    const { data: userProfile } =
      !applicationProfile && application.user_id
        ? await (supabase as any)
            .from("innovators")
            .select("id, account_status")
            .eq("user_id", application.user_id)
            .maybeSingle()
        : { data: null };
    const existing = applicationProfile || userProfile;
    const profileData = {
      application_id: application.id,
      user_id: application.user_id,
      name: application.applicant_name || "Applicant",
      role: application.role || "Innovator",
      department: application.department || "Not specified",
      gender: application.gender || null,
      bio: application.bio || "",
      image: application.image || null,
      linkedin: application.linkedin || null,
      facebook: application.facebook || null,
      twitter: application.twitter || null,
      github: application.github || null,
      website: application.website || null,
      status: "innovator",
      account_status: existing?.account_status || "inactive",
    };
    const { data: profile, error } = existing
      ? await (supabase as any)
          .from("innovators")
          .update(profileData)
          .eq("id", existing.id)
          .select("id, account_status")
          .single()
      : await (supabase as any)
          .from("innovators")
          .insert(profileData)
          .select("id, account_status")
          .single();

    if (error) {
      toast({
        title: "Approved, but profile generation failed",
        description: error.message,
        variant: "destructive",
      });
      return null;
    }

    await (supabase as any).from("innovator_skills").delete().eq("innovator_id", profile.id);
    if (application.skills?.length) {
      await (supabase as any)
        .from("innovator_skills")
        .insert(application.skills.map((skill) => ({ innovator_id: profile.id, skill })));
    }
    setProfileStatuses((current) => ({
      ...current,
      [application.id]: profile.account_status,
    }));
    return profile;
  };

  const approveApplication = async () => {
    if (!selectedApplication) return;
    if (
      selectedApplication.status !== "submitted" &&
      selectedApplication.status !== "accepted"
    ) {
      return;
    }

    setIsSaving(true);
    const saved = await saveApplicationEdits(selectedApplication);
    if (!saved) {
      setIsSaving(false);
      return;
    }

    let reviewed = saved;
    if (saved.status === "submitted") {
      const { error: statusError } = await supabase
        .from("applications")
        .update({ status: "accepted" })
        .eq("id", saved.id)
        .eq("status", "submitted");

      if (statusError) {
        toast({
          title: "Unable to approve application",
          description: statusError.message,
          variant: "destructive",
        });
        setIsSaving(false);
        return;
      }

      reviewed = { ...saved, status: "accepted" };
      setApplications((current) =>
        current.map((item) => (item.id === saved.id ? reviewed : item)),
      );
      setSelectedApplication(reviewed);
    }

    const profile = await upsertInnovatorFromApplication(reviewed);
    if (profile) {
      toast({
        title: "Application approved",
        description:
          "Edits saved and profile generated. Activate the profile when ready to publish.",
      });
    }
    setIsSaving(false);
  };

  const rejectApplication = async () => {
    if (!selectedApplication || selectedApplication.status !== "submitted") return;

    setIsSaving(true);
    const saved = await saveApplicationEdits(selectedApplication);
    if (!saved) {
      setIsSaving(false);
      return;
    }

    const { error } = await supabase
      .from("applications")
      .update({ status: "rejected" })
      .eq("id", saved.id)
      .eq("status", "submitted");

    if (error) {
      toast({
        title: "Unable to reject application",
        description: error.message,
        variant: "destructive",
      });
      setIsSaving(false);
      return;
    }

    const reviewed = { ...saved, status: "rejected" as const };
    setApplications((current) =>
      current.map((item) => (item.id === saved.id ? reviewed : item)),
    );
    setSelectedApplication(reviewed);
    toast({
      title: "Application rejected",
      description: "Edits were saved and the application was marked rejected.",
    });
    setIsSaving(false);
  };

  const setProfileVisibility = async (
    application: Application,
    accountStatus: "active" | "inactive",
  ) => {
    setIsSaving(true);
    const { error } = await (supabase as any)
      .from("innovators")
      .update({ account_status: accountStatus })
      .eq("application_id", application.id);
    if (error) {
      toast({
        title: "Unable to update visibility",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setProfileStatuses((current) => ({ ...current, [application.id]: accountStatus }));
      toast({
        title: accountStatus === "active" ? "Profile activated" : "Profile deactivated",
        description:
          accountStatus === "active"
            ? "The profile is now public."
            : "The profile is hidden from the public directory.",
      });
    }
    setIsSaving(false);
  };

  const fieldClass = "mt-1.5";
  const canDecide = selectedApplication?.status === "submitted";
  const profileState = selectedApplication
    ? profileStatuses[selectedApplication.id] || "missing"
    : "missing";

  return (
    <AdminPage>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="bh-admin-page-title">Applicants</h1>
          <p className="text-muted-foreground">
            Review applications, edit details, then approve or reject.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 text-sm">
          <div className="rounded-lg border bg-card px-4 py-3">
            <span className="font-semibold">{applications.length}</span> total
          </div>
          <div className="rounded-lg border bg-card px-4 py-3">
            <span className="font-semibold text-emerald-600">{submittedCount}</span> submitted
          </div>
          <div className="rounded-lg border bg-card px-4 py-3">
            <span className="font-semibold text-blue-600">{acceptedCount}</span> accepted
          </div>
          <div className="rounded-lg border bg-card px-4 py-3">
            <span className="font-semibold text-red-600">{rejectedCount}</span> rejected
          </div>
          <div className="rounded-lg border bg-card px-4 py-3">
            <span className="font-semibold text-amber-600">{draftCount}</span> drafts
          </div>
        </div>
      </div>

      <div className="mb-6 flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search applicants, answers, or IDs..."
            className="pl-9"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-44">
            <SelectValue placeholder="Filter status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="submitted">Submitted</SelectItem>
            <SelectItem value="draft">Drafts</SelectItem>
            <SelectItem value="accepted">Accepted</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Applicant</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>University year</TableHead>
              <TableHead>Skills</TableHead>
              <TableHead>Last updated</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead className="text-right">Review</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="h-4 w-48" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="ml-auto h-8 w-28" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                </TableRow>
              ))
            ) : filteredApplications.length > 0 ? (
              filteredApplications.map((application) => (
                <TableRow
                  key={application.id}
                  className={
                    application.status === "draft"
                      ? "bg-muted/20 text-muted-foreground"
                      : "hover:bg-muted/50"
                  }
                >
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <ClipboardList className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">
                          {application.applicant_name || "Name not saved"}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {application.applicant_email || "Email not saved"}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      title={
                        application.status === "draft"
                          ? "Draft applications are view-only until submitted"
                          : undefined
                      }
                      className={
                        application.status === "draft"
                          ? "gap-1 bg-slate-100 text-slate-500 hover:bg-slate-100"
                          : application.status === "accepted"
                            ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                            : application.status === "rejected"
                              ? "bg-red-100 text-red-800 hover:bg-red-100"
                              : "bg-emerald-100 text-emerald-800 hover:bg-emerald-100"
                      }
                    >
                      {application.status === "draft" && <Eye className="h-3 w-3" />}
                      {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell
                    className={application.status === "draft" ? "text-muted-foreground/50" : ""}
                  >
                    {application.status === "draft"
                      ? "—"
                      : application.university_year || "Not provided"}
                  </TableCell>
                  <TableCell
                    className={`max-w-48 truncate ${
                      application.status === "draft" ? "text-muted-foreground/50" : ""
                    }`}
                  >
                    {application.status === "draft"
                      ? "Details hidden"
                      : application.skills.length
                        ? application.skills.join(", ")
                        : "Not provided"}
                  </TableCell>
                  <TableCell>{new Date(application.updated_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {application.status === "draft"
                      ? "—"
                      : application.submitted_at
                        ? new Date(application.submitted_at).toLocaleDateString()
                        : "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    {application.status === "draft" ? (
                      <span className="text-xs text-muted-foreground">Submit first</span>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openReview(application)}
                      >
                        <Eye className="mr-2 h-4 w-4" /> Review
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                  No applications found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Showing {filteredApplications.length} of {applications.length} applications.
      </p>

      <Dialog
        open={Boolean(selectedApplication)}
        onOpenChange={(open) => {
          if (!open && !isSaving) closeReview();
        }}
      >
        <DialogContent className="flex max-h-[92vh] flex-col gap-0 overflow-hidden p-0 sm:max-w-3xl">
          <DialogHeader className="border-b px-6 py-4 text-left">
            <DialogTitle>Review application</DialogTitle>
            <DialogDescription>
              Edit any field below, then approve or reject. Changes are saved with your decision.
              {selectedApplication ? (
                <>
                  {" "}
                  · Current status:{" "}
                  <span className="capitalize font-medium text-foreground">
                    {selectedApplication.status}
                  </span>
                </>
              ) : null}
            </DialogDescription>
          </DialogHeader>

          {selectedApplication && (
            <div className="flex-1 space-y-5 overflow-y-auto px-6 py-5">
              <div className="flex items-center gap-4">
                {reviewForm.image ? (
                  <img
                    src={reviewForm.image}
                    alt=""
                    className="h-16 w-16 rounded-full object-cover ring-2 ring-[#00628b]/20"
                  />
                ) : (
                  <div className="grid h-16 w-16 place-items-center rounded-full bg-[#e8f3f8] text-sm font-bold text-[#00628b]">
                    {(reviewForm.applicant_name || "?").slice(0, 2).toUpperCase()}
                  </div>
                )}
                <div className="min-w-0 flex-1 space-y-1">
                  <Label htmlFor="review-image">Profile image URL</Label>
                  <Input
                    id="review-image"
                    className={fieldClass}
                    value={reviewForm.image}
                    onChange={(e) => updateField("image", e.target.value)}
                    placeholder="https://..."
                    disabled={isSaving}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="review-name">Full name</Label>
                  <Input
                    id="review-name"
                    className={fieldClass}
                    value={reviewForm.applicant_name}
                    onChange={(e) => updateField("applicant_name", e.target.value)}
                    disabled={isSaving}
                  />
                </div>
                <div>
                  <Label htmlFor="review-email">Email</Label>
                  <Input
                    id="review-email"
                    type="email"
                    className={fieldClass}
                    value={reviewForm.applicant_email}
                    onChange={(e) => updateField("applicant_email", e.target.value)}
                    disabled={isSaving}
                  />
                </div>
                <div>
                  <Label htmlFor="review-phone">Phone</Label>
                  <Input
                    id="review-phone"
                    className={fieldClass}
                    value={reviewForm.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    disabled={isSaving}
                  />
                </div>
                <div>
                  <Label htmlFor="review-city">City</Label>
                  <Input
                    id="review-city"
                    className={fieldClass}
                    value={reviewForm.city}
                    onChange={(e) => updateField("city", e.target.value)}
                    disabled={isSaving}
                  />
                </div>
                <div>
                  <Label>Gender</Label>
                  <Select
                    value={reviewForm.gender || undefined}
                    onValueChange={(value) => updateField("gender", value)}
                    disabled={isSaving}
                  >
                    <SelectTrigger className={fieldClass}>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                      <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Role</Label>
                  <Select
                    value={reviewForm.role || undefined}
                    onValueChange={(value) => updateField("role", value)}
                    disabled={isSaving}
                  >
                    <SelectTrigger className={fieldClass}>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      {["Innovator", "Mentor", ...roleOptions.map((o) => o.name)]
                        .filter((name, index, arr) => arr.indexOf(name) === index)
                        .map((name) => (
                          <SelectItem key={name} value={name}>
                            {name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Department</Label>
                  <Select
                    value={reviewForm.department || undefined}
                    onValueChange={(value) => updateField("department", value)}
                    disabled={isSaving}
                  >
                    <SelectTrigger className={fieldClass}>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departmentOptions.map((option) => (
                        <SelectItem key={option.id} value={option.name}>
                          {option.name}
                        </SelectItem>
                      ))}
                      {reviewForm.department &&
                        !departmentOptions.some((o) => o.name === reviewForm.department) && (
                          <SelectItem value={reviewForm.department}>
                            {reviewForm.department}
                          </SelectItem>
                        )}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="review-year">University year</Label>
                  <Input
                    id="review-year"
                    className={fieldClass}
                    value={reviewForm.university_year}
                    onChange={(e) => updateField("university_year", e.target.value)}
                    disabled={isSaving}
                  />
                </div>
                <div>
                  <Label htmlFor="review-education">Highest education</Label>
                  <Input
                    id="review-education"
                    className={fieldClass}
                    value={reviewForm.highest_education}
                    onChange={(e) => updateField("highest_education", e.target.value)}
                    disabled={isSaving}
                  />
                </div>
                <div>
                  <Label htmlFor="review-discovery">How they found us</Label>
                  <Input
                    id="review-discovery"
                    className={fieldClass}
                    value={reviewForm.discovery_source}
                    onChange={(e) => updateField("discovery_source", e.target.value)}
                    disabled={isSaving}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="review-skills">Skills (comma-separated)</Label>
                <Input
                  id="review-skills"
                  className={fieldClass}
                  value={reviewForm.skillsText}
                  onChange={(e) => updateField("skillsText", e.target.value)}
                  placeholder="React, Node.js, Design"
                  disabled={isSaving}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="review-linkedin">LinkedIn</Label>
                  <Input
                    id="review-linkedin"
                    className={fieldClass}
                    value={reviewForm.linkedin}
                    onChange={(e) => updateField("linkedin", e.target.value)}
                    disabled={isSaving}
                  />
                </div>
                <div>
                  <Label htmlFor="review-github">GitHub</Label>
                  <Input
                    id="review-github"
                    className={fieldClass}
                    value={reviewForm.github}
                    onChange={(e) => updateField("github", e.target.value)}
                    disabled={isSaving}
                  />
                </div>
                <div>
                  <Label htmlFor="review-website">Website</Label>
                  <Input
                    id="review-website"
                    className={fieldClass}
                    value={reviewForm.website}
                    onChange={(e) => updateField("website", e.target.value)}
                    disabled={isSaving}
                  />
                </div>
                <div>
                  <Label htmlFor="review-twitter">X / Twitter</Label>
                  <Input
                    id="review-twitter"
                    className={fieldClass}
                    value={reviewForm.twitter}
                    onChange={(e) => updateField("twitter", e.target.value)}
                    disabled={isSaving}
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="review-facebook">Facebook</Label>
                  <Input
                    id="review-facebook"
                    className={fieldClass}
                    value={reviewForm.facebook}
                    onChange={(e) => updateField("facebook", e.target.value)}
                    disabled={isSaving}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="review-bio">Bio</Label>
                <Textarea
                  id="review-bio"
                  className={`${fieldClass} min-h-[80px]`}
                  value={reviewForm.bio}
                  onChange={(e) => updateField("bio", e.target.value)}
                  disabled={isSaving}
                />
              </div>
              <div>
                <Label htmlFor="review-motivation">Motivation</Label>
                <Textarea
                  id="review-motivation"
                  className={`${fieldClass} min-h-[100px]`}
                  value={reviewForm.motivation}
                  onChange={(e) => updateField("motivation", e.target.value)}
                  disabled={isSaving}
                />
              </div>
              <div>
                <Label htmlFor="review-interests">Project interests</Label>
                <Textarea
                  id="review-interests"
                  className={`${fieldClass} min-h-[80px]`}
                  value={reviewForm.interests}
                  onChange={(e) => updateField("interests", e.target.value)}
                  disabled={isSaving}
                />
              </div>
              <div>
                <Label htmlFor="review-collaboration">Collaboration</Label>
                <Textarea
                  id="review-collaboration"
                  className={`${fieldClass} min-h-[80px]`}
                  value={reviewForm.collaboration}
                  onChange={(e) => updateField("collaboration", e.target.value)}
                  disabled={isSaving}
                />
              </div>
            </div>
          )}

          <DialogFooter className="gap-2 border-t bg-slate-50 px-6 py-4 sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {selectedApplication && profileState === "inactive" && (
                <Button
                  variant="outline"
                  onClick={() => setProfileVisibility(selectedApplication, "active")}
                  disabled={isSaving}
                >
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Activate profile
                </Button>
              )}
              {selectedApplication && profileState === "active" && (
                <Button
                  variant="outline"
                  onClick={() => setProfileVisibility(selectedApplication, "inactive")}
                  disabled={isSaving}
                >
                  <EyeOff className="mr-2 h-4 w-4" />
                  Deactivate profile
                </Button>
              )}
            </div>
            <div className="flex flex-wrap justify-end gap-2">
              <Button variant="outline" onClick={closeReview} disabled={isSaving}>
                Cancel
              </Button>
              {canDecide && (
                <Button
                  variant="destructive"
                  onClick={rejectApplication}
                  disabled={isSaving}
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  {isSaving ? "Saving…" : "Reject"}
                </Button>
              )}
              {(canDecide || selectedApplication?.status === "accepted") && (
                <Button
                  className="bg-[#00628b] text-white hover:bg-[#004f70]"
                  onClick={approveApplication}
                  disabled={isSaving}
                >
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  {isSaving
                    ? "Saving…"
                    : selectedApplication?.status === "accepted"
                      ? "Save & update profile"
                      : "Approve"}
                </Button>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminPage>
  );
};

export default ApplicantManagement;
