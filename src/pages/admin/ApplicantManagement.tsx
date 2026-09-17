import { useEffect, useMemo, useState } from "react";
import { ClipboardList, Eye, Search, UserPlus, EyeOff, CheckCircle2 } from "lucide-react";
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

type ApplicationStatus = Application["status"];

const ApplicantManagement = () => {
  const { toast } = useToast();
  const [applications, setApplications] = useState<Application[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [profileStatuses, setProfileStatuses] = useState<Record<string, "active" | "inactive" | "missing">>({});

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
        const userIds = ((data as Application[]) || []).map((application) => application.user_id).filter(Boolean);
        if (userIds.length) {
          const { data: profiles } = await (supabase as any).from("innovators").select("user_id, account_status").in("user_id", userIds);
          setProfileStatuses(Object.fromEntries(userIds.map((userId) => {
            const profile = (profiles || []).find((item: { user_id: string; account_status: "active" | "inactive" }) => item.user_id === userId);
            return [userId, profile?.account_status || "missing"];
          })));
        }
        const applicationIds = ((data as Application[]) || []).map((application) => application.id);
        if (applicationIds.length) {
          const { data: profiles } = await (supabase as any).from("innovators").select("application_id, account_status").in("application_id", applicationIds);
          setProfileStatuses((current) => ({
            ...current,
            ...Object.fromEntries(applicationIds.map((applicationId) => {
              const profile = (profiles || []).find((item: { application_id: string; account_status: "active" | "inactive" }) => item.application_id === applicationId);
              return [applicationId, profile?.account_status || current[applicationId] || "missing"];
            })),
          }));
        }
      }
      setLoading(false);
    };

    loadApplications();
  }, [toast]);

  const filteredApplications = useMemo(() => applications.filter((application) => {
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
  }), [applications, searchQuery, statusFilter]);

  const submittedCount = applications.filter((application) => application.status === "submitted").length;
  const acceptedCount = applications.filter((application) => application.status === "accepted").length;
  const rejectedCount = applications.filter((application) => application.status === "rejected").length;
  const draftCount = applications.filter((application) => application.status === "draft").length;

  const openStatusModal = (application: Application) => {
    setSelectedApplication(application);
  };

  const acceptAndGenerateProfile = async (application: Application) => {
    if (application.status !== "submitted" && application.status !== "accepted") return;
    setIsSaving(true);
    let reviewedApplication = application;

    if (application.status === "submitted") {
      const { error: statusError } = await supabase
        .from("applications")
        .update({ status: "accepted" })
        .eq("id", application.id)
        .eq("status", "submitted");

      if (statusError) {
        toast({ title: "Unable to accept application", description: statusError.message, variant: "destructive" });
        setIsSaving(false);
        return;
      }

      reviewedApplication = { ...application, status: "accepted" };
      setApplications((current) => current.map((item) => item.id === application.id ? reviewedApplication : item));
      setSelectedApplication(reviewedApplication);
    }

    const { data: applicationProfile } = await (supabase as any)
      .from("innovators")
      .select("id, account_status")
      .eq("application_id", application.id)
      .maybeSingle();
    const { data: userProfile } = !applicationProfile && application.user_id
      ? await (supabase as any).from("innovators").select("id, account_status").eq("user_id", application.user_id).maybeSingle()
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
      ? await (supabase as any).from("innovators").update(profileData).eq("id", existing.id).select("id, account_status").single()
      : await (supabase as any).from("innovators").insert(profileData).select("id, account_status").single();
    if (error) {
      toast({ title: "Application accepted, but profile generation failed", description: error.message, variant: "destructive" });
    } else {
      await (supabase as any).from("innovator_skills").delete().eq("innovator_id", profile.id);
      if (application.skills?.length) await (supabase as any).from("innovator_skills").insert(application.skills.map((skill) => ({ innovator_id: profile.id, skill })));
      setProfileStatuses((current) => ({ ...current, [application.id]: profile.account_status }));
      toast({ title: "Application accepted", description: "Profile generated from the submitted data and kept inactive until activated." });
    }
    setIsSaving(false);
  };

  const setProfileVisibility = async (application: Application, accountStatus: "active" | "inactive") => {
    setIsSaving(true);
    const { error } = await (supabase as any).from("innovators").update({ account_status: accountStatus }).eq("application_id", application.id);
    if (error) toast({ title: "Unable to update visibility", description: error.message, variant: "destructive" });
    else {
      setProfileStatuses((current) => ({ ...current, [application.id]: accountStatus }));
      toast({ title: accountStatus === "active" ? "Profile activated" : "Profile deactivated", description: accountStatus === "active" ? "The profile is now public." : "The profile is hidden from the public directory." });
    }
    setIsSaving(false);
  };

  return (
    <div className="p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="mb-1 text-2xl font-semibold">Applicants</h1>
            <p className="text-muted-foreground">Monitor applications and review applicant responses.</p>
          </div>
          <div className="flex gap-3 text-sm">
            <div className="rounded-lg border bg-card px-4 py-3"><span className="font-semibold">{applications.length}</span> total</div>
            <div className="rounded-lg border bg-card px-4 py-3"><span className="font-semibold text-emerald-600">{submittedCount}</span> submitted</div>
            <div className="rounded-lg border bg-card px-4 py-3"><span className="font-semibold text-blue-600">{acceptedCount}</span> accepted</div>
            <div className="rounded-lg border bg-card px-4 py-3"><span className="font-semibold text-red-600">{rejectedCount}</span> rejected</div>
            <div className="rounded-lg border bg-card px-4 py-3"><span className="font-semibold text-amber-600">{draftCount}</span> drafts</div>
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
              {loading ? Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell><Skeleton className="h-4 w-48" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell><Skeleton className="ml-auto h-8 w-28" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                </TableRow>
              )) : filteredApplications.length > 0 ? filteredApplications.map((application) => (
                <TableRow
                  key={application.id}
                  className={application.status === "draft" ? "bg-muted/20 text-muted-foreground" : "hover:bg-muted/50"}
                >
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <ClipboardList className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{application.applicant_name || "Name not saved"}</div>
                        <div className="text-xs text-muted-foreground">{application.applicant_email || "Email not saved"}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      title={application.status === "draft" ? "Draft applications are view-only until submitted" : undefined}
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
                  <TableCell className={application.status === "draft" ? "text-muted-foreground/50" : ""}>
                    {application.status === "draft" ? "—" : application.university_year || "Not provided"}
                  </TableCell>
                  <TableCell className={`max-w-48 truncate ${application.status === "draft" ? "text-muted-foreground/50" : ""}`}>
                    {application.status === "draft" ? "Details hidden" : application.skills.length ? application.skills.join(", ") : "Not provided"}
                  </TableCell>
                  <TableCell>{new Date(application.updated_at).toLocaleDateString()}</TableCell>
                  <TableCell>{application.status === "draft" ? "—" : application.submitted_at ? new Date(application.submitted_at).toLocaleDateString() : "-"}</TableCell>
                  <TableCell className="text-right">
                    {application.status === "draft" ? <span className="text-xs text-muted-foreground">Submit first</span> : (
                      <Button size="sm" variant="outline" onClick={() => openStatusModal(application)}>
                        <Eye className="mr-2 h-4 w-4" /> Review
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">No applications found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">Showing {filteredApplications.length} of {applications.length} applications.</p>
      </div>

      <Dialog open={Boolean(selectedApplication)} onOpenChange={(open) => !open && setSelectedApplication(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Review application</DialogTitle>
            <DialogDescription>
              {selectedApplication?.applicant_name || "Applicant"} · {selectedApplication?.applicant_email || "Email not saved"}
            </DialogDescription>
          </DialogHeader>

          {selectedApplication && (
            <div className="grid gap-4 border-y py-4 text-sm md:grid-cols-2">
              {selectedApplication.image && (
                <div className="md:col-span-2">
                  <img src={selectedApplication.image} alt={`${selectedApplication.applicant_name || "Applicant"} profile`} className="h-24 w-24 rounded-full object-cover ring-1 ring-border" />
                </div>
              )}
              {!selectedApplication.image && (
                <div className="md:col-span-2 rounded-md border border-dashed p-4 text-muted-foreground">
                  No profile picture was submitted.
                </div>
              )}
              <div><span className="font-medium">Phone:</span> {selectedApplication.phone || "Not provided"}</div>
              <div><span className="font-medium">City:</span> {selectedApplication.city || "Not provided"}</div>
              <div><span className="font-medium">Gender:</span> {selectedApplication.gender || "Not provided"}</div>
              <div><span className="font-medium">Role:</span> {selectedApplication.role || "Not provided"}</div>
              <div><span className="font-medium">Department:</span> {selectedApplication.department || "Not provided"}</div>
              <div><span className="font-medium">Education:</span> {selectedApplication.highest_education || "Not provided"}</div>
              <div className="md:col-span-2"><span className="font-medium">Skills:</span> {selectedApplication.skills?.join(", ") || "Not provided"}</div>
              <div><span className="font-medium">LinkedIn:</span> {selectedApplication.linkedin || "Not provided"}</div>
              <div><span className="font-medium">Facebook:</span> {selectedApplication.facebook || "Not provided"}</div>
              <div><span className="font-medium">X:</span> {selectedApplication.twitter || "Not provided"}</div>
              <div><span className="font-medium">GitHub:</span> {selectedApplication.github || "Not provided"}</div>
              <div><span className="font-medium">Website:</span> {selectedApplication.website || "Not provided"}</div>
              <div><span className="font-medium">How they found us:</span> {selectedApplication.discovery_source || "Not provided"}</div>
              <div className="md:col-span-2"><span className="font-medium">Bio:</span><p className="mt-1 whitespace-pre-wrap text-muted-foreground">{selectedApplication.bio || "Not provided"}</p></div>
              <div className="md:col-span-2"><span className="font-medium">Motivation:</span><p className="mt-1 whitespace-pre-wrap text-muted-foreground">{selectedApplication.motivation || "Not provided"}</p></div>
              <div className="md:col-span-2"><span className="font-medium">Project interests:</span><p className="mt-1 whitespace-pre-wrap text-muted-foreground">{selectedApplication.interests || "Not provided"}</p></div>
              <div className="md:col-span-2"><span className="font-medium">Collaboration:</span><p className="mt-1 whitespace-pre-wrap text-muted-foreground">{selectedApplication.collaboration || "Not provided"}</p></div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedApplication(null)} disabled={isSaving}>Cancel</Button>
            {selectedApplication && profileStatuses[selectedApplication.id] === "missing" && (
              <Button variant="outline" onClick={() => acceptAndGenerateProfile(selectedApplication)} disabled={isSaving}>
                <UserPlus className="mr-2 h-4 w-4" />
                {selectedApplication.status === "submitted" ? "Accept & generate profile" : "Generate profile"}
              </Button>
            )}
            {selectedApplication && profileStatuses[selectedApplication.id] === "active" && (
              <Button variant="outline" onClick={() => setProfileVisibility(selectedApplication, "inactive")} disabled={isSaving}>
                <EyeOff className="mr-2 h-4 w-4" /> Close profile
              </Button>
            )}
            {selectedApplication && profileStatuses[selectedApplication.id] === "inactive" && (
              <Button className="bg-[#00628b] text-white hover:bg-[#004f70]" onClick={() => setProfileVisibility(selectedApplication, "active")} disabled={isSaving}>
                <CheckCircle2 className="mr-2 h-4 w-4" /> Activate profile
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApplicantManagement;
