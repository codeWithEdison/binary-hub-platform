import { useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Check,
  ChevronDown,
  Save,
  UserRound,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useApplicationSetup } from "@/hooks/useApplicationSetup";
import { uploadPublicImage } from "@/lib/uploadImage";
import { InlineLoadingOrb } from "@/components/LoadingOrb";

const emptyForm = {
  firstName: "",
  lastName: "",
  email: "",
  city: "",
  phone: "",
  linkedin: "",
  facebook: "",
  twitter: "",
  github: "",
  website: "",
  universityYear: "",
  role: "",
  gender: "",
  department: "",
  image: "",
  bio: "",
  skills: [] as string[],
  motivation: "",
  interests: "",
  collaboration: "",
  highestEducation: "",
  discoverySource: "",
};

type FormState = typeof emptyForm;

const isFilled = (value: unknown) => {
  if (Array.isArray(value)) return value.length > 0;
  return typeof value === "string" ? value.trim().length > 0 : Boolean(value);
};

const steps = [
  { id: 1 as const, label: "Personal information", short: "Personal" },
  { id: 2 as const, label: "Application details", short: "Details" },
];

const ApplicationFormRedesigned = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const applicationId = new URLSearchParams(window.location.search).get("id");
  const roleFromQuery = new URLSearchParams(window.location.search).get("role");
  const [form, setForm] = useState<FormState>({
    ...emptyForm,
    role: roleFromQuery || "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const { options: setupOptions } = useApplicationSetup();
  const setupRoleOptions = setupOptions.filter((option) => option.category === "role");
  const defaultApplyRoles = ["Innovator", "Mentor"];
  const roleOptions = [
    ...defaultApplyRoles
      .filter((name) => !setupRoleOptions.some((option) => option.name.toLowerCase() === name.toLowerCase()))
      .map((name) => ({ id: `default-${name}`, name })),
    ...setupRoleOptions,
  ];
  const departmentOptions = setupOptions.filter((option) => option.category === "department");
  const skillOptions = setupOptions
    .filter((option) => option.category === "skill")
    .map((option) => option.name);

  useEffect(() => {
    if (!roleFromQuery) return;
    setForm((current) => (current.role ? current : { ...current, role: roleFromQuery }));
  }, [roleFromQuery]);

  useEffect(() => {
    const load = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      const query = supabase.from("applications").select("*").eq("user_id", user.id);
      const { data, error } = await (
        applicationId
          ? query.eq("id", applicationId)
          : query.order("created_at", { ascending: false }).limit(1)
      ).maybeSingle();

      if (error) {
        toast({
          title: "Unable to load application",
          description: error.message,
          variant: "destructive",
        });
      } else if (data) {
        const nameParts = (data.applicant_name || "").trim().split(/\s+/);
        const { data: profile } = await (supabase as any)
          .from("innovators")
          .select(
            "name, role, department, gender, bio, image, linkedin, facebook, twitter, github, website"
          )
          .eq("user_id", user.id)
          .maybeSingle();
        setForm((current) => ({
          ...current,
          firstName: nameParts[0] || "",
          lastName: nameParts.slice(1).join(" "),
          email: data.applicant_email || user.email || "",
          city: data.city || "",
          phone: data.phone || "",
          universityYear: data.university_year || "",
          skills: data.skills || [],
          motivation: data.motivation || "",
          interests: data.interests || "",
          collaboration: data.collaboration || "",
          highestEducation: data.highest_education || "",
          discoverySource: data.discovery_source || "",
          role: profile?.role || data.role || current.role || "",
          gender: profile?.gender || data.gender || current.gender || "",
          department: profile?.department || data.department || current.department || "",
          bio: profile?.bio || data.bio || current.bio || "",
          image: profile?.image || data.image || current.image || "",
          linkedin: profile?.linkedin || data.linkedin || current.linkedin || "",
          facebook: profile?.facebook || data.facebook || current.facebook || "",
          twitter: profile?.twitter || data.twitter || current.twitter || "",
          github: profile?.github || data.github || current.github || "",
          website: profile?.website || data.website || current.website || "",
        }));
      } else {
        setForm((current) => ({
          ...current,
          email: current.email || user.email || "",
          role: current.role || roleFromQuery || "",
        }));
      }
      setIsLoading(false);
    };

    load();
  }, [applicationId, toast, user, roleFromQuery]);

  const stepOneValues = [
    form.firstName,
    form.lastName,
    form.email,
    form.city,
    form.phone,
    form.universityYear,
    form.role,
    form.gender,
    form.image,
  ];
  const stepTwoValues = [
    form.bio,
    form.skills,
    form.motivation,
    form.interests,
    form.collaboration,
    form.highestEducation,
    form.discoverySource,
  ];
  const stepOneComplete = stepOneValues.every(isFilled);
  const stepTwoComplete = stepTwoValues.every(isFilled);
  const completedSteps = (stepOneComplete ? 1 : 0) + (stepTwoComplete ? 1 : 0);
  const progressPercent = Math.round((completedSteps / 2) * 100);

  const updateField = <Field extends keyof FormState>(field: Field, value: FormState[Field]) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const toggleSkill = (skill: string) => {
    setForm((current) => ({
      ...current,
      skills: current.skills.includes(skill)
        ? current.skills.filter((item) => item !== skill)
        : [...current.skills, skill],
    }));
  };

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    const result = await uploadPublicImage(file, "applications");
    setIsUploadingImage(false);

    if (result.error) {
      toast({ title: "Upload failed", description: result.error, variant: "destructive" });
    } else if (result.url) {
      updateField("image", result.url);
    }
    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  const goToStepTwo = () => {
    if (!stepOneComplete) {
      toast({
        title: "Complete personal information",
        description: "Please complete all required fields before continuing.",
        variant: "destructive",
      });
      return;
    }
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToStepOne = () => {
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const save = async (status: "draft" | "submitted") => {
    if (status === "submitted" && (!stepOneComplete || !stepTwoComplete)) {
      toast({
        title: "Complete your application",
        description: "Please complete every required field before submitting.",
        variant: "destructive",
      });
      return;
    }
    if (status === "submitted" && !form.image) {
      toast({
        title: "Profile image required",
        description: "Please upload a profile image before submitting your application.",
        variant: "destructive",
      });
      setCurrentStep(1);
      return;
    }

    setIsSaving(true);
    const fullName = `${form.firstName.trim()} ${form.lastName.trim()}`.trim();

    const applicationData = {
      user_id: user?.id || null,
      secondary_email: null,
      applicant_name: fullName,
      applicant_email: form.email.trim(),
      city: form.city.trim(),
      phone: form.phone.trim(),
      gender: form.gender,
      role: form.role,
      department: form.department,
      linkedin: form.linkedin.trim() || null,
      facebook: form.facebook.trim() || null,
      twitter: form.twitter.trim() || null,
      github: form.github.trim() || null,
      website: form.website.trim() || null,
      bio: form.bio.trim(),
      image: form.image || null,
      highest_education: form.highestEducation,
      discovery_source: form.discoverySource,
      university_year: form.universityYear,
      skills: form.skills,
      motivation: form.motivation.trim(),
      interests: form.interests.trim(),
      collaboration: form.collaboration.trim(),
      status,
      submitted_at: status === "submitted" ? new Date().toISOString() : null,
    };

    const applicationRequest = applicationId
      ? (supabase as any).from("applications").update(applicationData).eq("id", applicationId)
      : (supabase as any).from("applications").insert(applicationData);
    const { error: applicationError } = await applicationRequest;

    if (applicationError) {
      setIsSaving(false);
      toast({
        title: "Unable to save application",
        description: applicationError.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: status === "submitted" ? "Application submitted" : "Draft saved",
      description:
        status === "submitted"
          ? "Your application is ready for admin review."
          : "You can return and finish your application later.",
    });

    setIsSaving(false);
    navigate("/applications");
  };

  const inputClass =
    "mt-1.5 h-10 w-full rounded-[7px] border border-[#00628b]/25 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus-visible:border-[#00628b] focus-visible:ring-2 focus-visible:ring-[#00628b]/25";
  const textareaClass =
    "mt-1.5 min-h-[120px] w-full rounded-[7px] border border-[#00628b]/25 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus-visible:border-[#00628b] focus-visible:ring-2 focus-visible:ring-[#00628b]/25";
  const labelClass = "text-sm font-medium text-slate-700";
  const requiredMark = <span className="text-red-600">*</span>;

  return (
    <main className="min-h-screen bg-[hsl(210_25%_96%)] pb-24 pt-24 text-slate-900 md:pt-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            to="/applications"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#00628b] transition hover:text-[#004f70]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to applications
          </Link>
        </div>

        <header className="mb-8 rounded-lg border border-[#00628b]/10 bg-[#00628b] px-5 py-6 text-white shadow-sm sm:px-7 sm:py-7">
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/80">
            Membership application
          </p>
          <h1 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Apply to UR Binary Hub
            {form.role ? (
              <span className="mt-2 block text-base font-semibold text-[#FFD700] sm:mt-1 sm:inline sm:ml-2 sm:text-lg">
                — {form.role}
              </span>
            ) : null}
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/85">
            Complete both steps to join the University of Rwanda innovation community. Required
            fields are marked with *.
          </p>
        </header>

        <div className="mb-6 rounded-lg border border-[#00628b]/10 bg-white p-4 shadow-sm sm:p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-slate-700">Application progress</p>
            <p className="text-sm font-semibold text-[#00628b]">{progressPercent}%</p>
          </div>
          <div className="mb-5 h-1.5 overflow-hidden rounded-full bg-[#00628b]/10">
            <div
              className="h-full rounded-full bg-[#00628b] transition-all duration-300"
              style={{ width: `${Math.max(progressPercent, currentStep === 1 ? 8 : 50)}%` }}
            />
          </div>
          <ol className="grid grid-cols-2 gap-3">
            {steps.map((step, index) => {
              const complete = step.id === 1 ? stepOneComplete : stepTwoComplete;
              const active = currentStep === step.id;
              return (
                <li key={step.id} className="flex items-center gap-3">
                  <span
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-semibold transition ${
                      complete
                        ? "bg-emerald-600 text-white"
                        : active
                          ? "bg-[#00628b] text-white"
                          : "border border-[#00628b]/20 bg-[#00628b]/5 text-[#00628b]"
                    }`}
                  >
                    {complete ? <Check className="h-4 w-4" /> : index + 1}
                  </span>
                  <div className="min-w-0">
                    <p
                      className={`truncate text-sm font-semibold ${
                        active || complete ? "text-slate-900" : "text-slate-500"
                      }`}
                    >
                      <span className="sm:hidden">{step.short}</span>
                      <span className="hidden sm:inline">{step.label}</span>
                    </p>
                    <p className="text-xs text-slate-500">
                      {complete ? "Complete" : active ? "In progress" : "Up next"}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            currentStep === 1 ? goToStepTwo() : save("submitted");
          }}
          className={isLoading ? "pointer-events-none opacity-60" : ""}
        >
          {currentStep === 1 ? (
            <div className="space-y-5">
              <section className="rounded-lg border border-[#00628b]/10 bg-white p-5 shadow-sm sm:p-6">
                <h2 className="font-display text-lg font-semibold text-slate-950">
                  Profile photo
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  A clear photo helps mentors and teammates recognize you.
                </p>
                <div className="mt-5 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                  <button
                    type="button"
                    onClick={() => imageInputRef.current?.click()}
                    disabled={isUploadingImage}
                    className="group relative flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-[#00628b]/20 bg-[#00628b]/5 text-[#00628b] transition hover:border-[#00628b]/40"
                    aria-label="Upload profile image"
                    aria-required="true"
                  >
                    {form.image ? (
                      <img
                        src={form.image}
                        alt="Profile preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <UserRound className="h-12 w-12 opacity-60" />
                    )}
                    <span className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-1 bg-[#00628b]/90 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-white opacity-0 transition group-hover:opacity-100">
                      <Camera className="h-3 w-3" />
                      {isUploadingImage ? "…" : "Edit"}
                    </span>
                  </button>
                  <div>
                    <p className={labelClass}>
                      Profile image {requiredMark}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">JPG, PNG, or WebP · max 5MB</p>
                    <button
                      type="button"
                      onClick={() => imageInputRef.current?.click()}
                      disabled={isUploadingImage}
                      className="mt-3 inline-flex h-9 items-center rounded-[7px] border border-[#00628b]/25 bg-white px-4 text-sm font-medium text-[#00628b] transition hover:bg-[#00628b]/5 disabled:opacity-60"
                    >
                      {isUploadingImage ? "Uploading…" : form.image ? "Replace photo" : "Upload photo"}
                    </button>
                    <input
                      ref={imageInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                </div>
              </section>

              <section className="rounded-lg border border-[#00628b]/10 bg-white p-5 shadow-sm sm:p-6">
                <h2 className="font-display text-lg font-semibold text-slate-950">
                  Personal information
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Use the same details you use for University of Rwanda contact.
                </p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="first-name" className={labelClass}>
                      First name {requiredMark}
                    </label>
                    <input
                      id="first-name"
                      required
                      value={form.firstName}
                      onChange={(event) => updateField("firstName", event.target.value)}
                      className={inputClass}
                      placeholder="First name"
                    />
                  </div>
                  <div>
                    <label htmlFor="last-name" className={labelClass}>
                      Last name {requiredMark}
                    </label>
                    <input
                      id="last-name"
                      required
                      value={form.lastName}
                      onChange={(event) => updateField("lastName", event.target.value)}
                      className={inputClass}
                      placeholder="Last name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClass}>
                      Email {requiredMark}
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(event) => updateField("email", event.target.value)}
                      className={inputClass}
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className={labelClass}>
                      Phone number {requiredMark}
                    </label>
                    <input
                      id="phone"
                      required
                      value={form.phone}
                      onChange={(event) => updateField("phone", event.target.value)}
                      className={inputClass}
                      placeholder="+250 7XX XXX XXX"
                    />
                  </div>
                  <div>
                    <label htmlFor="city" className={labelClass}>
                      City {requiredMark}
                    </label>
                    <input
                      id="city"
                      required
                      value={form.city}
                      onChange={(event) => updateField("city", event.target.value)}
                      className={inputClass}
                      placeholder="Your city"
                    />
                  </div>
                  <div>
                    <label htmlFor="university-year" className={labelClass}>
                      University year {requiredMark}
                    </label>
                    <div className="relative">
                      <select
                        id="university-year"
                        required
                        value={form.universityYear}
                        onChange={(event) => updateField("universityYear", event.target.value)}
                        className={`${inputClass} appearance-none pr-10`}
                      >
                        <option value="">Select your year</option>
                        <option>1st year</option>
                        <option>2nd year</option>
                        <option>3rd year</option>
                        <option>4th year</option>
                        <option>5th year+</option>
                        <option>Graduate student</option>
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="role" className={labelClass}>
                      Role {requiredMark}
                    </label>
                    <div className="relative">
                      <select
                        id="role"
                        required
                        value={form.role}
                        onChange={(event) => updateField("role", event.target.value)}
                        className={`${inputClass} appearance-none pr-10`}
                      >
                        <option value="">Select your role</option>
                        {roleOptions.map((option) => (
                          <option key={option.id} value={option.name}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="gender" className={labelClass}>
                      Gender {requiredMark}
                    </label>
                    <div className="relative">
                      <select
                        id="gender"
                        required
                        value={form.gender}
                        onChange={(event) => updateField("gender", event.target.value)}
                        className={`${inputClass} appearance-none pr-10`}
                      >
                        <option value="">Select your gender</option>
                        <option>Female</option>
                        <option>Male</option>
                        <option>Prefer not to say</option>
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="department" className={labelClass}>
                      Department or field{" "}
                      <span className="font-normal text-slate-500">(optional)</span>
                    </label>
                    <div className="relative">
                      <select
                        id="department"
                        value={form.department}
                        onChange={(event) => updateField("department", event.target.value)}
                        className={`${inputClass} appearance-none pr-10`}
                      >
                        <option value="">Select if applicable</option>
                        {departmentOptions.map((option) => (
                          <option key={option.id} value={option.name}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    </div>
                  </div>
                </div>
              </section>

              <section className="rounded-lg border border-[#00628b]/10 bg-white p-5 shadow-sm sm:p-6">
                <h2 className="font-display text-lg font-semibold text-slate-950">
                  Online profiles
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Optional — share links that help us understand your work.
                </p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="linkedin" className={labelClass}>
                      LinkedIn
                    </label>
                    <input
                      id="linkedin"
                      type="url"
                      value={form.linkedin}
                      onChange={(event) => updateField("linkedin", event.target.value)}
                      className={inputClass}
                      placeholder="https://linkedin.com/in/…"
                    />
                  </div>
                  <div>
                    <label htmlFor="facebook" className={labelClass}>
                      Facebook
                    </label>
                    <input
                      id="facebook"
                      type="url"
                      value={form.facebook}
                      onChange={(event) => updateField("facebook", event.target.value)}
                      className={inputClass}
                      placeholder="https://facebook.com/…"
                    />
                  </div>
                  <div>
                    <label htmlFor="twitter" className={labelClass}>
                      X (Twitter)
                    </label>
                    <input
                      id="twitter"
                      type="url"
                      value={form.twitter}
                      onChange={(event) => updateField("twitter", event.target.value)}
                      className={inputClass}
                      placeholder="https://x.com/…"
                    />
                  </div>
                  <div>
                    <label htmlFor="website" className={labelClass}>
                      Website
                    </label>
                    <input
                      id="website"
                      type="url"
                      value={form.website}
                      onChange={(event) => updateField("website", event.target.value)}
                      className={inputClass}
                      placeholder="https://…"
                    />
                  </div>
                </div>
              </section>
            </div>
          ) : (
            <div className="space-y-5">
              <section className="rounded-lg border border-[#00628b]/10 bg-white p-5 shadow-sm sm:p-6">
                <h2 className="font-display text-lg font-semibold text-slate-950">About you</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Introduce yourself to mentors and fellow innovators.
                </p>
                <div className="mt-5 space-y-4">
                  <div>
                    <label htmlFor="bio" className={labelClass}>
                      Short biography {requiredMark}
                    </label>
                    <textarea
                      id="bio"
                      required
                      value={form.bio}
                      onChange={(event) => updateField("bio", event.target.value)}
                      className={textareaClass}
                      placeholder="Tell the Binary Hub community about yourself."
                    />
                  </div>
                  <div>
                    <label htmlFor="github" className={labelClass}>
                      GitHub{" "}
                      <span className="font-normal text-slate-500">(optional)</span>
                    </label>
                    <input
                      id="github"
                      type="url"
                      value={form.github}
                      onChange={(event) => updateField("github", event.target.value)}
                      className={inputClass}
                      placeholder="https://github.com/…"
                    />
                  </div>
                </div>
              </section>

              <section className="rounded-lg border border-[#00628b]/10 bg-white p-5 shadow-sm sm:p-6">
                <h2 className="font-display text-lg font-semibold text-slate-950">
                  Skills and interests
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Select every skill that applies — you can refine this later.
                </p>
                <div className="mt-5 space-y-5">
                  <div>
                    <p className={`${labelClass} mb-2`}>
                      Skills {requiredMark}
                    </p>
                    {skillOptions.length === 0 ? (
                      <p className="rounded-[7px] border border-dashed border-[#00628b]/20 bg-[#00628b]/5 px-4 py-6 text-sm text-slate-600">
                        Skills options are loading or not configured yet.
                      </p>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {skillOptions.map((skill) => {
                          const selected = form.skills.includes(skill);
                          return (
                            <button
                              key={skill}
                              type="button"
                              onClick={() => toggleSkill(skill)}
                              className={`inline-flex h-9 items-center rounded-[7px] border px-3 text-sm font-medium transition ${
                                selected
                                  ? "border-[#00628b] bg-[#00628b] text-white"
                                  : "border-[#00628b]/20 bg-white text-slate-700 hover:border-[#00628b]/40 hover:bg-[#00628b]/5"
                              }`}
                            >
                              {selected ? <Check className="mr-1.5 h-3.5 w-3.5" /> : null}
                              {skill}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="highest-education" className={labelClass}>
                        Highest education {requiredMark}
                      </label>
                      <div className="relative">
                        <select
                          id="highest-education"
                          required
                          value={form.highestEducation}
                          onChange={(event) => updateField("highestEducation", event.target.value)}
                          className={`${inputClass} appearance-none pr-10`}
                        >
                          <option value="">Select qualification</option>
                          <option>Secondary school</option>
                          <option>Certificate</option>
                          <option>Diploma</option>
                          <option>Bachelor&apos;s degree</option>
                          <option>Master&apos;s degree</option>
                          <option>Doctorate</option>
                          <option>Other</option>
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="discovery-source" className={labelClass}>
                        How did you hear about us? {requiredMark}
                      </label>
                      <div className="relative">
                        <select
                          id="discovery-source"
                          required
                          value={form.discoverySource}
                          onChange={(event) => updateField("discoverySource", event.target.value)}
                          className={`${inputClass} appearance-none pr-10`}
                        >
                          <option value="">Select an option</option>
                          <option>University of Rwanda</option>
                          <option>Friend or colleague</option>
                          <option>Social media</option>
                          <option>Website or search engine</option>
                          <option>University event</option>
                          <option>Other</option>
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="motivation" className={labelClass}>
                      Why do you want to join Binary Hub? {requiredMark}
                    </label>
                    <textarea
                      id="motivation"
                      required
                      value={form.motivation}
                      onChange={(event) => updateField("motivation", event.target.value)}
                      className={textareaClass}
                      placeholder="Share your motivation and ambitions."
                    />
                  </div>
                  <div>
                    <label htmlFor="interests" className={labelClass}>
                      What would you like to build or work on? {requiredMark}
                    </label>
                    <textarea
                      id="interests"
                      required
                      value={form.interests}
                      onChange={(event) => updateField("interests", event.target.value)}
                      className={textareaClass}
                      placeholder="Describe the ideas, problems, or products you want to build."
                    />
                  </div>
                  <div>
                    <label htmlFor="collaboration" className={labelClass}>
                      How would you like to collaborate? {requiredMark}
                    </label>
                    <textarea
                      id="collaboration"
                      required
                      value={form.collaboration}
                      onChange={(event) => updateField("collaboration", event.target.value)}
                      className={textareaClass}
                      placeholder="Tell us how you like to work with others."
                    />
                  </div>
                </div>
              </section>
            </div>
          )}

          <div className="sticky bottom-0 z-20 -mx-4 mt-8 border-t border-[#00628b]/10 bg-[hsl(210_25%_96%)]/95 px-4 py-4 backdrop-blur sm:static sm:mx-0 sm:rounded-lg sm:border sm:bg-white sm:px-5 sm:shadow-sm sm:backdrop-blur-none">
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={() => (currentStep === 2 ? goToStepOne() : save("draft"))}
                disabled={isSaving || isUploadingImage}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-[7px] px-4 text-sm font-medium text-slate-600 transition hover:bg-[#00628b]/5 hover:text-[#00628b] disabled:opacity-60"
              >
                {currentStep === 2 ? (
                  <>
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Save draft
                  </>
                )}
              </button>
              <button
                type="submit"
                disabled={isSaving || isUploadingImage}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-[7px] bg-[#00628b] px-5 text-sm font-semibold text-white transition hover:bg-[#004f70] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSaving ? (
                  <InlineLoadingOrb state="working" label="Saving" />
                ) : currentStep === 1 ? (
                  <>
                    Continue
                    <ArrowRight className="h-4 w-4" />
                  </>
                ) : (
                  "Submit application"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default ApplicationFormRedesigned;
