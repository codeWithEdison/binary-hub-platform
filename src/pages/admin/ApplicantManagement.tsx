import { useEffect, useMemo, useState } from "react";
import { ClipboardList, Eye, Search } from "lucide-react";
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
  user_id: string;
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
};

type ApplicationStatus = Application["status"];

const ApplicantManagement = () => {
  const { toast } = useToast();
  const [applications, setApplications] = useState<Application[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<ApplicationStatus>("draft");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loadApplications = async () => {
      const { data, error } = await supabase
        .from("applications")
        .select("id, user_id, applicant_name, applicant_email, university_year, skills, motivation, interests, collaboration, status, created_at, updated_at, submitted_at")
        .order("updated_at", { ascending: false });

      if (error) {
        toast({
          title: "Unable to load applicants",
          description: error.message,
          variant: "destructive",
        });
      } else {
        setApplications((data as Application[]) || []);
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
    setSelectedStatus(application.status);
  };

  const updateApplicationStatus = async () => {
    if (!selectedApplication) return;

    setIsSaving(true);
    const submittedAt = selectedStatus === "submitted" || selectedStatus === "accepted" || selectedStatus === "rejected"
      ? selectedApplication.submitted_at || new Date().toISOString()
      : null;
    const { error } = await supabase
      .from("applications")
      .update({ status: selectedStatus, submitted_at: submittedAt })
      .eq("id", selectedApplication.id);

    if (error) {
      toast({
        title: "Unable to update status",
        description: error.message,
        variant: "destructive",
      });
    } else {
      let notificationError: Error | null = null;
      if (selectedStatus !== selectedApplication.status && selectedStatus !== "draft") {
        const { error } = await supabase.functions.invoke("send-application-status-email", {
          body: {
            applicationId: selectedApplication.id,
            status: selectedStatus,
          },
        });
        notificationError = error;
      }

      setApplications((current) => current.map((application) => (
        application.id === selectedApplication.id
          ? { ...application, status: selectedStatus as Application["status"], submitted_at: submittedAt, updated_at: new Date().toISOString() }
          : application
      )));
      setSelectedApplication(null);
      toast({
        title: "Application status updated",
        description: notificationError
          ? "The status was saved, but the notification email could not be sent."
          : selectedStatus !== "draft"
            ? "The applicant was notified by email."
            : undefined,
        variant: notificationError ? "destructive" : undefined,
      });
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell><Skeleton className="h-4 w-48" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                </TableRow>
              )) : filteredApplications.length > 0 ? filteredApplications.map((application) => (
                <TableRow
                  key={application.id}
                  className={application.status === "draft" ? "bg-muted/20 text-muted-foreground" : "cursor-pointer hover:bg-muted/50"}
                  onClick={() => application.status !== "draft" && openStatusModal(application)}
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
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">No applications found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">Showing {filteredApplications.length} of {applications.length} applications.</p>
      </div>

      <Dialog open={Boolean(selectedApplication)} onOpenChange={(open) => !open && setSelectedApplication(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update application status</DialogTitle>
            <DialogDescription>
              {selectedApplication?.applicant_name || "Applicant"} · {selectedApplication?.applicant_email || "Email not saved"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2 py-3">
            <label htmlFor="application-status" className="text-sm font-medium">Status</label>
            <Select value={selectedStatus} onValueChange={(value: ApplicationStatus) => setSelectedStatus(value)}>
              <SelectTrigger id="application-status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="submitted">Submitted</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedApplication(null)} disabled={isSaving}>Cancel</Button>
            <Button onClick={updateApplicationStatus} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save status"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApplicantManagement;
