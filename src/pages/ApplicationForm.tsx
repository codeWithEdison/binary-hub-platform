import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const questionSections = [
  { label: "Profile", id: "application-profile" },
  { label: "Skills", id: "application-skills" },
  { label: "Motivation", id: "application-motivation" },
  { label: "Project interests", id: "application-interests" },
  { label: "Collaboration", id: "application-collaboration" },
];

const skillOptions = [
  "Java",
  "JavaScript",
  "TypeScript",
  "Python",
  "React",
  "Node.js",
  "UI/UX Design",
  "Graphics Design",
  "Marketing",
  "Sales",
  "Project Management",
  "Data Analysis",
  "AI/ML",
  "Mobile Development",
  "Cybersecurity",
  "Other",
];

const ApplicationForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const applicationId = new URLSearchParams(window.location.search).get("id");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showSecondaryEmail, setShowSecondaryEmail] = useState(false);
  const [form, setForm] = useState({
    secondaryEmail: "",
    universityYear: "",
    skills: [] as string[],
    motivation: "",
    interests: "",
    collaboration: "",
  });

  useEffect(() => {
    if (!user) return;

    if (!applicationId) {
      setIsLoading(false);
      return;
    }

    const loadApplication = async () => {
      let applicationQuery = supabase
        .from("applications")
        .select("secondary_email, university_year, skills, motivation, interests, collaboration, status")
        .eq("user_id", user.id);

      applicationQuery = applicationQuery.eq("id", applicationId);

      const { data, error } = await applicationQuery.maybeSingle();

      if (error) {
        toast({ title: "Unable to load application", description: error.message, variant: "destructive" });
      } else if (data) {
        setForm({
          secondaryEmail: data.secondary_email || "",
          universityYear: data.university_year,
          skills: data.skills,
          motivation: data.motivation,
          interests: data.interests,
          collaboration: data.collaboration,
        });
        setShowSecondaryEmail(Boolean(data.secondary_email));
      }

      setIsLoading(false);
    };

    loadApplication();
  }, [applicationId, toast, user]);

  const progress = useMemo(() => {
    const fields = Object.values(form);
    const filled = fields.filter((value) => {
      if (Array.isArray(value)) return value.length > 0;
      if (typeof value === "string") return value.trim().length > 0;
      return Boolean(value);
    }).length;
    return Math.round((filled / fields.length) * 100);
  }, [form]);

  const updateField = (field: keyof typeof form, value: string | string[]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const toggleSkill = (skill: string) => {
    setForm((prev) => {
      const currentSkills = prev.skills;
      return {
        ...prev,
        skills: currentSkills.includes(skill)
          ? currentSkills.filter((item) => item !== skill)
          : [...currentSkills, skill],
      };
    });
  };

  const saveApplication = async (status: "draft" | "submitted", navigateAfterSave = false) => {
    if (!user) return;

    if (status === "submitted" && progress < 100) {
      toast({ title: "Complete your application", description: "Please answer every question before submitting.", variant: "destructive" });
      return;
    }

    setIsSaving(true);
    const applicationData = {
      user_id: user.id,
      secondary_email: form.secondaryEmail.trim() || null,
      university_year: form.universityYear,
      skills: form.skills,
      motivation: form.motivation,
      interests: form.interests,
      collaboration: form.collaboration,
      status,
      submitted_at: status === "submitted" ? new Date().toISOString() : null,
    };
    const { error } = applicationId
      ? await supabase.from("applications").update(applicationData).eq("id", applicationId).eq("user_id", user.id)
      : await supabase.from("applications").insert(applicationData);
    setIsSaving(false);

    if (error) {
      toast({ title: "Unable to save application", description: error.message, variant: "destructive" });
      return;
    }

    toast({
      title: status === "submitted" ? "Application submitted" : "Draft saved",
      description: status === "submitted" ? "Thank you for applying to Binary Hub." : "You can return and continue later.",
    });

    if (navigateAfterSave || status === "submitted") navigate("/applications");
  };

  const saveDraftAndGoBack = async () => {
    await saveApplication("draft", true);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-4 pt-28 pb-8 text-[#111111] md:px-8 md:pt-32 lg:px-12 lg:pt-32">
      <div className="mx-auto max-w-6xl">
        <button
          type="button"
          onClick={saveDraftAndGoBack}
          disabled={isSaving}
          className="mb-8 inline-flex items-center gap-2 text-xl font-medium text-[#111111] transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back</span>
        </button>

        <header className="mb-10">
          <h1 className="text-3xl font-bold leading-tight tracking-[-0.03em] text-gray-900 md:text-5xl">
            My Application
          </h1>
          <p className="mt-3 text-lg text-[#111111]/70 md:text-xl">Winter 2027</p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[200px_minmax(0,1fr)]">
          <aside className="pt-4 text-sm text-[#111111]/65 md:text-base">
            {questionSections.map((item, index) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`mb-4 block transition-colors hover:text-[#00628b] ${index === 0 ? "font-medium text-[#111111]" : ""}`}
              >
                {item.label}
              </a>
            ))}
          </aside>

          <section className="w-full">
            <h2 className="mb-6 text-2xl font-bold tracking-[-0.03em] text-[#111111] md:text-3xl">Application</h2>

            <div className="rounded-2xl border border-black/30 bg-white/30 p-4 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)] md:p-5">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm text-[#111111]/60">Name</p>
                  <p className="mt-1 text-lg font-semibold text-[#111111]">
                    {[user?.user_metadata?.first_name, user?.user_metadata?.last_name].filter(Boolean).join(" ") || user?.user_metadata?.full_name || "Applicant"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#111111]/60">Email</p>
                  <p className="mt-1 break-all text-lg font-semibold text-[#111111]">{user?.email || "No email"}</p>
                </div>
              </div>
              <div className="mt-5">
                {!showSecondaryEmail ? (
                  <button
                    type="button"
                    onClick={() => setShowSecondaryEmail(true)}
                    className="inline-flex items-center gap-1 text-base font-medium text-[#00628b] hover:underline"
                  >
                    Add a secondary email <ChevronRight className="h-4 w-4" />
                  </button>
                ) : (
                  <>
                    <label htmlFor="secondary-email" className="mb-2 block text-sm text-[#111111]/60">Secondary email (optional)</label>
                    <input
                      id="secondary-email"
                      type="email"
                      value={form.secondaryEmail}
                      onChange={(e) => updateField("secondaryEmail", e.target.value)}
                      placeholder="Add another email address"
                      className="w-full rounded-xl border border-black/30 bg-white/60 px-4 py-3 text-base outline-none transition focus:border-[#00628b] focus:ring-2 focus:ring-[#00628b]/20"
                    />
                  </>
                )}
              </div>
            </div>

            <div className={`mt-8 space-y-6 ${isLoading ? "pointer-events-none opacity-60" : ""}`}>
              <div id="application-profile">
                <label className="mb-3 block text-lg font-semibold leading-tight text-[#111111] md:text-xl">
                  What year are you in at university?
                </label>
                <select
                  value={form.universityYear}
                  onChange={(e) => updateField("universityYear", e.target.value)}
                  className="w-full rounded-2xl border border-black/30 bg-white/50 px-4 py-3 text-base outline-none transition focus:border-[#00628b] focus:ring-2 focus:ring-[#00628b]/20"
                >
                  <option value="">Select your year</option>
                  <option value="1st year">1st year</option>
                  <option value="2nd year">2nd year</option>
                  <option value="3rd year">3rd year</option>
                  <option value="4th year">4th year</option>
                  <option value="5th year+">5th year+</option>
                  <option value="Graduate student">Graduate student</option>
                </select>
              </div>

              <div id="application-skills">
                <label className="mb-3 block text-lg font-semibold leading-tight text-[#111111] md:text-xl">
                  What skills do you bring?
                </label>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                  {skillOptions.map((skill) => {
                    const checked = form.skills.includes(skill);

                    return (
                      <label
                        key={skill}
                        className={`flex cursor-pointer items-center gap-2 rounded-full border px-3 py-2 text-sm transition ${
                          checked
                            ? "border-[#00628b] bg-[#00628b]/10 text-[#00628b]"
                            : "border-black/20 bg-white/50 text-[#111111]"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleSkill(skill)}
                          className="h-4 w-4 accent-[#00628b]"
                        />
                        <span>{skill}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div id="application-motivation">
                <label className="mb-3 block text-lg font-semibold leading-tight text-[#111111] md:text-xl">
                  Why do you want to join Binary Hub?
                </label>
                <textarea
                  value={form.motivation}
                  onChange={(e) => updateField("motivation", e.target.value)}
                  className="min-h-[150px] w-full rounded-2xl border border-black/30 bg-white/50 px-4 py-3 text-base outline-none transition focus:border-[#00628b] focus:ring-2 focus:ring-[#00628b]/20"
                  placeholder="Share your motivation and ambitions."
                />
              </div>

              <div id="application-interests">
                <label className="mb-3 block text-lg font-semibold leading-tight text-[#111111] md:text-xl">
                  What would you like to build or work on at Binary Hub?
                </label>
                <textarea
                  value={form.interests}
                  onChange={(e) => updateField("interests", e.target.value)}
                  className="min-h-[120px] w-full rounded-2xl border border-black/30 bg-white/50 px-4 py-3 text-base outline-none transition focus:border-[#00628b] focus:ring-2 focus:ring-[#00628b]/20"
                  placeholder="Describe the ideas, problems, or products you want to build."
                />
              </div>

              <div id="application-collaboration">
                <label className="mb-3 block text-lg font-semibold leading-tight text-[#111111] md:text-xl">
                  Are you open to collaborating with others on a team?
                </label>
                <textarea
                  value={form.collaboration}
                  onChange={(e) => updateField("collaboration", e.target.value)}
                  className="min-h-[110px] w-full rounded-2xl border border-black/30 bg-white/50 px-4 py-3 text-base outline-none transition focus:border-[#00628b] focus:ring-2 focus:ring-[#00628b]/20"
                  placeholder="Tell us if you enjoy team projects and how you like to work with others."
                />
              </div>
            </div>

            <div className="mt-10 flex items-center justify-between gap-4 border-t border-black/20 pt-6">
              <button
                type="button"
                onClick={saveDraftAndGoBack}
                disabled={isLoading || isSaving}
                className="text-base font-medium text-[#111111] hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSaving ? "Saving..." : "← Back"}
              </button>

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  disabled={isLoading || isSaving}
                  onClick={() => saveApplication("draft")}
                  className="rounded-full border border-[#111111] bg-white px-4 py-2 text-base font-medium text-[#111111] transition hover:bg-[#f6f6f6] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSaving ? "Saving..." : "Save changes"}
                </button>
                <button
                  type="button"
                  disabled={isLoading || isSaving}
                  onClick={() => saveApplication("submitted")}
                  className="rounded-full bg-[#4a4a4a] px-5 py-2 text-base font-medium text-white transition hover:bg-[#2d2d2d] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Submit application
                </button>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-end text-sm text-[#111111]/60">
              Progress: {progress}%
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default ApplicationForm;
