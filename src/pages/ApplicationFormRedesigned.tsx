import { useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { ChevronDown, Edit3, Save, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useApplicationSetup } from "@/hooks/useApplicationSetup";

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

const ApplicationFormRedesigned = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const applicationId = new URLSearchParams(window.location.search).get("id");
  const [form, setForm] = useState<FormState>(emptyForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const { options: setupOptions } = useApplicationSetup();
  const roleOptions = setupOptions.filter((option) => option.category === "role");
  const departmentOptions = setupOptions.filter((option) => option.category === "department");
  const skillOptions = setupOptions.filter((option) => option.category === "skill").map((option) => option.name);

  useEffect(() => {
    const load = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      const query = supabase
        .from("applications")
        .select("*")
        .eq("user_id", user.id);
      const { data, error } = await (applicationId ? query.eq("id", applicationId) : query.order("created_at", { ascending: false }).limit(1)).maybeSingle();

      if (error) {
        toast({ title: "Unable to load application", description: error.message, variant: "destructive" });
      } else if (data) {
        const nameParts = (data.applicant_name || "").trim().split(/\s+/);
        const { data: profile } = await (supabase as any)
          .from("innovators")
          .select("name, role, department, gender, bio, image, linkedin, facebook, twitter, github, website")
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
          role: profile?.role || data.role || "",
          gender: profile?.gender || data.gender || "",
          department: profile?.department || data.department || "",
          bio: profile?.bio || "",
          image: profile?.image || "",
          linkedin: profile?.linkedin || "",
          facebook: profile?.facebook || "",
          twitter: profile?.twitter || "",
          github: profile?.github || "",
          website: profile?.website || "",
        }));
      } else {
        setForm((current) => ({ ...current, email: current.email || user.email || "" }));
      }
      setIsLoading(false);
    };

    load();
  }, [applicationId, toast, user]);

  const stepOneValues = [form.firstName, form.lastName, form.email, form.city, form.phone, form.universityYear, form.role, form.gender];
  const stepTwoValues = [form.bio, form.skills, form.motivation, form.interests, form.collaboration, form.highestEducation, form.discoverySource];
  const stepOneComplete = stepOneValues.every(isFilled);
  const stepTwoComplete = stepTwoValues.every(isFilled);

  const updateField = <Field extends keyof FormState>(field: Field, value: FormState[Field]) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/") || file.size > 5 * 1024 * 1024) {
      toast({ title: "Invalid image", description: "Choose an image file smaller than 5MB.", variant: "destructive" });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => updateField("image", String(reader.result));
    reader.readAsDataURL(file);
  };

  const goToStepTwo = () => {
    if (!stepOneComplete) {
      toast({ title: "Complete personal information", description: "Please complete all required fields before continuing.", variant: "destructive" });
      return;
    }
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const save = async (status: "draft" | "submitted") => {
    if (status === "submitted" && (!stepOneComplete || !stepTwoComplete)) {
      toast({ title: "Complete your application", description: "Please complete every required field before submitting.", variant: "destructive" });
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
      toast({ title: "Unable to save application", description: applicationError.message, variant: "destructive" });
      return;
    }

    toast({
      title: status === "submitted" ? "Application submitted" : "Draft saved",
      description: status === "submitted" ? "Your application is ready for admin review." : "You can return and finish your application later.",
    });

    setIsSaving(false);
    navigate("/");
  };

  const inputClass = "mt-2 h-12 w-full rounded-none border border-slate-300 bg-white px-4 text-base text-slate-900 outline-none transition focus:border-[#00628b] focus:ring-2 focus:ring-[#00628b]/20";
  const labelClass = "text-sm font-medium text-slate-700";

  return (
    <main className="min-h-screen bg-white px-5 pb-16 pt-28 text-slate-900 md:px-10 md:pt-32">
      <div className="mx-auto max-w-5xl">

        <form onSubmit={(event) => { event.preventDefault(); currentStep === 1 ? goToStepTwo() : save("submitted"); }} className={isLoading ? "pointer-events-none opacity-60" : ""}>
          <div className="mb-10 flex items-center gap-3 border-b border-slate-200 pb-5 text-sm font-semibold">
            <span className={currentStep === 1 ? "text-[#00628b]" : "text-slate-400"}>1. Personal information</span>
            <span className="text-slate-300">/</span>
            <span className={currentStep === 2 ? "text-[#00628b]" : "text-slate-400"}>2. Application details</span>
          </div>
          {currentStep === 1 ? (
            <>
          <section className="border-b border-slate-200 pb-10">
            <div className="mb-7">
              <h1 className="text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">Personal information</h1>
              <p className="mt-2 text-base text-slate-700">Fields marked with <span className="text-red-600">*</span> are required.</p>
            </div>
            <div className="relative mb-8 h-32 w-32">
              <button type="button" onClick={() => imageInputRef.current?.click()} className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-slate-200 text-slate-400 transition hover:bg-slate-300" aria-label="Upload profile image">
                {form.image ? <img src={form.image} alt="Profile preview" className="h-full w-full object-cover" /> : <UserRound className="h-16 w-16" />}
              </button>
              <span className="pointer-events-none absolute right-[-6px] top-3 grid h-9 w-9 place-items-center rounded-full bg-slate-700 text-white shadow-sm"><Edit3 className="h-5 w-5" /></span>
              <input ref={imageInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div><label htmlFor="first-name" className={labelClass}>First name <span className="text-red-600">*</span></label><input id="first-name" required value={form.firstName} onChange={(event) => updateField("firstName", event.target.value)} className={inputClass} placeholder="First name" /></div>
              <div><label htmlFor="last-name" className={labelClass}>Last name <span className="text-red-600">*</span></label><input id="last-name" required value={form.lastName} onChange={(event) => updateField("lastName", event.target.value)} className={inputClass} placeholder="Last name" /></div>
              <div><label htmlFor="email" className={labelClass}>Email <span className="text-red-600">*</span></label><input id="email" type="email" required value={form.email} onChange={(event) => updateField("email", event.target.value)} className={inputClass} placeholder="you@example.com" /></div>
              <div><label htmlFor="phone" className={labelClass}>Phone number <span className="text-red-600">*</span></label><input id="phone" required value={form.phone} onChange={(event) => updateField("phone", event.target.value)} className={inputClass} placeholder="+250 7XX XXX XXX" /></div>
              <div><label htmlFor="city" className={labelClass}>City <span className="text-red-600">*</span></label><input id="city" required value={form.city} onChange={(event) => updateField("city", event.target.value)} className={inputClass} placeholder="Your city" /></div>
              <div><label htmlFor="university-year" className={labelClass}>University year <span className="text-red-600">*</span></label><div className="relative"><select id="university-year" required value={form.universityYear} onChange={(event) => updateField("universityYear", event.target.value)} className={`${inputClass} appearance-none`}><option value="">Select your year</option><option>1st year</option><option>2nd year</option><option>3rd year</option><option>4th year</option><option>5th year+</option><option>Graduate student</option></select><ChevronDown className="pointer-events-none absolute right-4 top-6 h-4 w-4 text-slate-500" /></div></div>
              <div><label htmlFor="role" className={labelClass}>Role <span className="text-red-600">*</span></label><div className="relative"><select id="role" required value={form.role} onChange={(event) => updateField("role", event.target.value)} className={`${inputClass} appearance-none pr-10`}><option value="">Select your role</option>{roleOptions.map((option) => <option key={option.id} value={option.name}>{option.name}</option>)}</select><ChevronDown className="pointer-events-none absolute right-4 top-6 h-4 w-4 text-slate-500" /></div></div>
              <div><label htmlFor="gender" className={labelClass}>Gender <span className="text-red-600">*</span></label><div className="relative"><select id="gender" required value={form.gender} onChange={(event) => updateField("gender", event.target.value)} className={`${inputClass} appearance-none pr-10`}><option value="">Select your gender</option><option>Female</option><option>Male</option><option>Non-binary</option><option>Prefer not to say</option></select><ChevronDown className="pointer-events-none absolute right-4 top-6 h-4 w-4 text-slate-500" /></div></div>
              <div className="md:col-span-2"><label htmlFor="department" className={labelClass}>Department or field <span className="text-slate-500">(optional)</span></label><div className="relative"><select id="department" value={form.department} onChange={(event) => updateField("department", event.target.value)} className={`${inputClass} appearance-none pr-10`}><option value="">Select your department or field if applicable</option>{departmentOptions.map((option) => <option key={option.id} value={option.name}>{option.name}</option>)}</select><ChevronDown className="pointer-events-none absolute right-4 top-6 h-4 w-4 text-slate-500" /></div></div>
            </div>
          </section>

          <section className="border-b border-slate-200 py-10">
            <h2 className="text-2xl font-semibold text-slate-950 md:text-3xl">Your Profiles</h2>
            <p className="mt-2 text-base text-slate-600">Fields marked with <span className="text-red-600">*</span> are required.</p>
            <div className="mt-7 grid gap-6 md:grid-cols-2">
              <div><label htmlFor="linkedin" className={labelClass}>LinkedIn</label><input id="linkedin" type="url" value={form.linkedin} onChange={(event) => updateField("linkedin", event.target.value)} className={inputClass} placeholder="https://linkedin.com/in/your-name" /></div>
              <div><label htmlFor="facebook" className={labelClass}>Facebook</label><input id="facebook" type="url" value={form.facebook} onChange={(event) => updateField("facebook", event.target.value)} className={inputClass} placeholder="https://facebook.com/your-name" /></div>
              <div><label htmlFor="twitter" className={labelClass}>X (fka Twitter)</label><input id="twitter" type="url" value={form.twitter} onChange={(event) => updateField("twitter", event.target.value)} className={inputClass} placeholder="https://x.com/your-name" /></div>
              <div><label htmlFor="website" className={labelClass}>Website</label><input id="website" type="url" value={form.website} onChange={(event) => updateField("website", event.target.value)} className={inputClass} placeholder="https://yourwebsite.com" /></div>
            </div>
          </section>
            </>
          ) : (
            <>

          <section className="border-b border-slate-200 pb-8 pt-2">
            <h2 className="text-2xl font-semibold text-slate-950 md:text-3xl">About you</h2>
            <div className="mt-7 space-y-6">
              <div><label htmlFor="bio" className={labelClass}>Short biography <span className="text-red-600">*</span></label><textarea id="bio" required value={form.bio} onChange={(event) => updateField("bio", event.target.value)} className="mt-2 min-h-[140px] w-full rounded-none border border-slate-300 bg-white px-4 py-3 text-base outline-none transition focus:border-[#00628b] focus:ring-2 focus:ring-[#00628b]/20" placeholder="Tell the Binary Hub community about yourself." /></div>
              <div><label htmlFor="github" className={labelClass}>Your GitHub link</label><input id="github" type="url" value={form.github} onChange={(event) => updateField("github", event.target.value)} className={inputClass} placeholder="https://github.com/your-name" /></div>
            </div>
          </section>

          <section className="border-b border-slate-200 py-10">
            <h2 className="text-2xl font-semibold text-slate-950 md:text-3xl">Skills and interests</h2>
            <div className="mt-7 space-y-8">
              <div>
                <p className={`${labelClass} mb-3`}>Skills <span className="text-red-600">*</span></p>
                <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                  {skillOptions.map((skill) => (
                    <label key={skill} className="flex min-h-12 cursor-pointer items-center gap-3 border border-slate-300 bg-white px-4 text-base text-slate-700 transition hover:border-[#00628b]">
                      <input type="checkbox" checked={form.skills.includes(skill)} onChange={() => setForm((current) => ({ ...current, skills: current.skills.includes(skill) ? current.skills.filter((item) => item !== skill) : [...current.skills, skill] }))} className="h-4 w-4 accent-[#00628b]" />
                      <span>{skill}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div><label htmlFor="highest-education" className={labelClass}>Highest education qualification <span className="text-red-600">*</span></label><div className="relative"><select id="highest-education" required value={form.highestEducation} onChange={(event) => updateField("highestEducation", event.target.value)} className={`${inputClass} appearance-none pr-10`}><option value="">Select your highest qualification</option><option>Secondary school</option><option>Certificate</option><option>Diploma</option><option>Bachelor's degree</option><option>Master's degree</option><option>Doctorate</option><option>Other</option></select><ChevronDown className="pointer-events-none absolute right-4 top-6 h-4 w-4 text-slate-500" /></div></div>
              <div><label htmlFor="discovery-source" className={labelClass}>How did you know about UR Binary Hub? <span className="text-red-600">*</span></label><div className="relative"><select id="discovery-source" required value={form.discoverySource} onChange={(event) => updateField("discoverySource", event.target.value)} className={`${inputClass} appearance-none pr-10`}><option value="">Select an option</option><option>University of Rwanda</option><option>Friend or colleague</option><option>Social media</option><option>Website or search engine</option><option>University event</option><option>Other</option></select><ChevronDown className="pointer-events-none absolute right-4 top-6 h-4 w-4 text-slate-500" /></div></div>
              <div><label htmlFor="motivation" className={labelClass}>Why do you want to join Binary Hub? <span className="text-red-600">*</span></label><textarea id="motivation" required value={form.motivation} onChange={(event) => updateField("motivation", event.target.value)} className="mt-2 min-h-[130px] w-full rounded-none border border-slate-300 bg-white px-4 py-3 text-base outline-none transition focus:border-[#00628b] focus:ring-2 focus:ring-[#00628b]/20" placeholder="Share your motivation and ambitions." /></div>
              <div><label htmlFor="interests" className={labelClass}>What would you like to build or work on? <span className="text-red-600">*</span></label><textarea id="interests" required value={form.interests} onChange={(event) => updateField("interests", event.target.value)} className="mt-2 min-h-[130px] w-full rounded-none border border-slate-300 bg-white px-4 py-3 text-base outline-none transition focus:border-[#00628b] focus:ring-2 focus:ring-[#00628b]/20" placeholder="Describe the ideas, problems, or products you want to build." /></div>
              <div><label htmlFor="collaboration" className={labelClass}>How would you like to collaborate? <span className="text-red-600">*</span></label><textarea id="collaboration" required value={form.collaboration} onChange={(event) => updateField("collaboration", event.target.value)} className="mt-2 min-h-[120px] w-full rounded-none border border-slate-300 bg-white px-4 py-3 text-base outline-none transition focus:border-[#00628b] focus:ring-2 focus:ring-[#00628b]/20" placeholder="Tell us how you like to work with others." /></div>
            </div>
          </section>
            </>
          )}

          <div className="flex flex-col justify-between gap-5 pt-8 sm:flex-row sm:items-center">
            <button type="button" onClick={() => currentStep === 2 ? setCurrentStep(1) : save("draft")} disabled={isSaving} className="inline-flex items-center gap-2 text-base font-medium text-slate-600 hover:text-[#00628b]">
              <Save className="h-4 w-4" /> {currentStep === 2 ? "Back" : "Save draft"}
            </button>
            <button type="submit" disabled={isSaving} className="inline-flex h-14 items-center justify-center gap-2 bg-[#00628b] px-8 text-base font-semibold text-white transition hover:bg-[#004f70] disabled:cursor-not-allowed disabled:opacity-60">
              {isSaving ? "Saving..." : currentStep === 1 ? "Continue" : "Submit application"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default ApplicationFormRedesigned;
