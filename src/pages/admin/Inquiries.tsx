import { useCallback, useEffect, useMemo, useState } from "react";
import { Archive, Mail, Search, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

 type Inquiry = Tables<"inquiries">;
 type InquiryStatus = Inquiry["status"];

const statusStyles: Record<InquiryStatus, string> = {
  new: "bg-[#00628b]/10 text-[#00628b]",
  read: "bg-slate-100 text-slate-600",
  archived: "bg-amber-100 text-amber-800",
};

const inquiryTypeLabels: Record<Inquiry["inquiry_type"], string> = {
  collaboration: "Project collaboration",
  partnership: "Partnership",
  innovation: "Innovation support",
  general: "General question",
};

const Inquiries = () => {
  const { toast } = useToast();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchInquiries = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from("inquiries").select("*").order("created_at", { ascending: false });
    if (error) {
      toast({ title: "Could not load inquiries", description: error.message, variant: "destructive" });
    } else {
      setInquiries(data || []);
    }
    setLoading(false);
  }, [toast]);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  const filteredInquiries = useMemo(() => inquiries.filter((inquiry) => {
    const search = searchQuery.toLowerCase();
    const matchesSearch = [inquiry.first_name, inquiry.last_name, inquiry.email, inquiry.company || "", inquiry.message]
      .some((value) => value.toLowerCase().includes(search));
    return matchesSearch && (statusFilter === "all" || inquiry.status === statusFilter);
  }), [inquiries, searchQuery, statusFilter]);

  const updateStatus = async (inquiry: Inquiry, status: InquiryStatus) => {
    const { error } = await supabase.from("inquiries").update({ status }).eq("id", inquiry.id);
    if (error) {
      toast({ title: "Could not update inquiry", description: error.message, variant: "destructive" });
      return;
    }
    setInquiries((current) => current.map((item) => item.id === inquiry.id ? { ...item, status } : item));
  };

  const deleteInquiry = async (inquiry: Inquiry) => {
    if (!window.confirm("Delete this inquiry permanently?")) return;
    const { error } = await supabase.from("inquiries").delete().eq("id", inquiry.id);
    if (error) {
      toast({ title: "Could not delete inquiry", description: error.message, variant: "destructive" });
      return;
    }
    setInquiries((current) => current.filter((item) => item.id !== inquiry.id));
  };

  return (
    <div className="p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Inquiries</h1>
            <p className="text-muted-foreground">Review messages submitted through the contact form.</p>
          </div>
          <Badge variant="outline">{inquiries.filter((inquiry) => inquiry.status === "new").length} new</Badge>
        </div>

        <div className="mb-6 flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search inquiries..." className="pl-9" />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-44"><SelectValue placeholder="Filter status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="read">Read</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sender</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading && <TableRow><TableCell colSpan={6} className="py-10 text-center text-muted-foreground">Loading inquiries...</TableCell></TableRow>}
              {!loading && filteredInquiries.length === 0 && <TableRow><TableCell colSpan={6} className="py-10 text-center text-muted-foreground">No inquiries found.</TableCell></TableRow>}
              {!loading && filteredInquiries.map((inquiry) => (
                <TableRow key={inquiry.id} className={inquiry.status === "new" ? "bg-[#00628b]/[0.03]" : undefined}>
                  <TableCell className="min-w-48">
                    <div className="font-medium">{inquiry.first_name} {inquiry.last_name}</div>
                    <a href={`mailto:${inquiry.email}`} className="inline-flex items-center gap-1 text-xs text-[#00628b] hover:underline"><Mail className="h-3 w-3" />{inquiry.email}</a>
                    {inquiry.company && <div className="mt-1 text-xs text-muted-foreground">{inquiry.company}</div>}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">{inquiryTypeLabels[inquiry.inquiry_type]}</TableCell>
                  <TableCell className="max-w-sm whitespace-normal text-sm text-muted-foreground">{inquiry.message}</TableCell>
                  <TableCell className="whitespace-nowrap text-sm text-muted-foreground">{new Date(inquiry.created_at).toLocaleDateString()}</TableCell>
                  <TableCell><Badge className={statusStyles[inquiry.status]}>{inquiry.status}</Badge></TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      {inquiry.status === "new" && <Button variant="outline" size="sm" onClick={() => updateStatus(inquiry, "read")}>Mark read</Button>}
                      {inquiry.status !== "archived" && <Button variant="ghost" size="icon" onClick={() => updateStatus(inquiry, "archived")} title="Archive inquiry"><Archive className="h-4 w-4" /></Button>}
                      <Button variant="ghost" size="icon" onClick={() => deleteInquiry(inquiry)} title="Delete inquiry"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Inquiries;
