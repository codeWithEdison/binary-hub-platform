import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Clock,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import Footer from "@/components/Footer";
import { InlineLoadingOrb } from "@/components/LoadingOrb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { TablesInsert } from "@/integrations/supabase/types";

const phones = [
  { label: "Coordinator", number: "+250 788 695 862", href: "tel:+250788695862" },
  { label: "Assistant Coordinator", number: "+250 786 779 666", href: "tel:+250786779666" },
  { label: "Assistant Administrator", number: "+250 790 289 399", href: "tel:+250790289399" },
] as const;

const inquiryTypes = [
  { value: "general", label: "General question" },
  { value: "collaboration", label: "Project collaboration" },
  { value: "partnership", label: "Partnership" },
  { value: "innovation", label: "Innovation support" },
] as const;

type InquiryType = (typeof inquiryTypes)[number]["value"];

const ContactPage = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    company: "",
    inquiry_type: "general" as InquiryType,
    message: "",
  });

  const updateField = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    const payload: TablesInsert<"inquiries"> = {
      first_name: form.first_name.trim(),
      last_name: form.last_name.trim(),
      email: form.email.trim(),
      company: form.company.trim() || null,
      inquiry_type: form.inquiry_type,
      message: form.message.trim(),
      status: "new",
    };

    const { error } = await supabase.from("inquiries").insert(payload);
    setIsSubmitting(false);

    if (error) {
      toast({
        title: "Could not send message",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Message sent",
      description: "Thanks for reaching out. The Binary Hub team will reply soon.",
    });
    setForm({
      first_name: "",
      last_name: "",
      email: "",
      company: "",
      inquiry_type: "general",
      message: "",
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-[hsl(210_25%_96%)] pt-24 md:pt-28">
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-16 sm:px-6 lg:px-8">
        <header className="mb-8 rounded-lg border border-[#00628b]/10 bg-[#00628b] px-5 py-7 text-white shadow-sm sm:px-8 sm:py-9">
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/80">
            Contact
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Let&apos;s <span className="text-[#FFD700]">connect</span>
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">
            Reach the UR Binary Hub team for partnerships, collaboration, or questions about
            joining the community.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <section className="rounded-lg border border-[#00628b]/10 bg-white p-5 shadow-sm sm:p-7">
            <h2 className="font-display text-xl font-semibold text-slate-950">Send a message</h2>
            <p className="mt-1 text-sm text-slate-600">
              Your inquiry is stored securely and reviewed by the admin team.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="first_name">First name</Label>
                  <Input
                    id="first_name"
                    required
                    value={form.first_name}
                    onChange={(e) => updateField("first_name", e.target.value)}
                    className="mt-1.5 h-10 rounded-[7px] border-[#00628b]/25"
                  />
                </div>
                <div>
                  <Label htmlFor="last_name">Last name</Label>
                  <Input
                    id="last_name"
                    required
                    value={form.last_name}
                    onChange={(e) => updateField("last_name", e.target.value)}
                    className="mt-1.5 h-10 rounded-[7px] border-[#00628b]/25"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className="mt-1.5 h-10 rounded-[7px] border-[#00628b]/25"
                  />
                </div>
                <div>
                  <Label htmlFor="company">Organization <span className="font-normal text-slate-500">(optional)</span></Label>
                  <Input
                    id="company"
                    value={form.company}
                    onChange={(e) => updateField("company", e.target.value)}
                    className="mt-1.5 h-10 rounded-[7px] border-[#00628b]/25"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="inquiry_type">Inquiry type</Label>
                <Select
                  value={form.inquiry_type}
                  onValueChange={(value) => updateField("inquiry_type", value as InquiryType)}
                >
                  <SelectTrigger id="inquiry_type" className="mt-1.5 h-10 rounded-[7px] border-[#00628b]/25">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {inquiryTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  required
                  rows={6}
                  value={form.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  className="mt-1.5 rounded-[7px] border-[#00628b]/25"
                  placeholder="How can we help?"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-10 rounded-[7px] bg-[#00628b] px-5 font-semibold text-white hover:bg-[#004f70] hover:text-white"
              >
                {isSubmitting ? (
                  <InlineLoadingOrb state="working" label="Sending" />
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send message
                  </>
                )}
              </Button>
            </form>
          </section>

          <aside className="space-y-5">
            <section className="rounded-lg border border-[#00628b]/10 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="font-display text-lg font-semibold text-slate-950">Direct contact</h2>
              <div className="mt-4 space-y-4 text-sm">
                <a
                  href="mailto:urbinaryhub@gmail.com"
                  className="flex items-start gap-3 text-[#00628b] transition hover:text-[#004f70]"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0" />
                  urbinaryhub@gmail.com
                </a>
                <p className="flex items-start gap-3 text-slate-700">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#00628b]" />
                  Binary Hub, University of Rwanda — Nyarugenge Campus
                </p>
                <p className="flex items-start gap-3 text-slate-700">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#00628b]" />
                  Weekdays · 08:00–17:00 CAT
                </p>
              </div>
            </section>

            <section className="rounded-lg border border-[#00628b]/10 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="font-display text-lg font-semibold text-slate-950">Phone</h2>
              <ul className="mt-4 space-y-3">
                {phones.map((phone) => (
                  <li key={phone.href}>
                    <a
                      href={phone.href}
                      className="flex items-start gap-3 rounded-[7px] border border-[#00628b]/10 px-3 py-2.5 text-sm transition hover:bg-[#00628b]/5"
                    >
                      <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#00628b]" />
                      <span>
                        <span className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
                          {phone.label}
                        </span>
                        <span className="font-medium text-slate-900">{phone.number}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-lg border border-[#00628b]/10 bg-[#00628b] p-5 text-white shadow-sm sm:p-6">
              <h2 className="font-display text-lg font-semibold">Join as an innovator</h2>
              <p className="mt-2 text-sm text-white/85">
                Ready to build with the Hub? Start your membership application.
              </p>
              <Button
                asChild
                className="mt-4 h-10 rounded-[7px] bg-white px-4 font-semibold text-[#00628b] hover:bg-white/90 hover:text-[#00628b]"
              >
                <Link to="/applications/form?role=Innovator">
                  Apply now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </section>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
