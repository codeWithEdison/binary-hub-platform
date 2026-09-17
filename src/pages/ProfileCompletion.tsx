import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import InnovatorForm from "@/components/InnovatorForm";
import { useAuth } from "@/hooks/useAuth";
import { ArrowLeft, CheckCircle2, Circle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const hasCompletedApplication = (application: Record<string, unknown> | null | undefined) => {
  if (!application) return false;

  const requiredFields = [
    application.email,
    application.universityYear,
    application.skills,
    application.motivation,
    application.interests,
    application.collaboration,
  ];

  return requiredFields.every((value) => {
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === "string") return value.trim().length > 0;
    return Boolean(value);
  });
};

const ProfileCompletion = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const applicationAnswers = undefined;

  useEffect(() => {
    if (!user) {
      return;
    }

    const checkApplication = async () => {
      const { data } = await supabase
        .from("applications")
        .select("applicant_email, university_year, skills, motivation, interests, collaboration")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (!data || !hasCompletedApplication({
        email: data.applicant_email || user.email,
        universityYear: data.university_year,
        skills: data.skills,
        motivation: data.motivation,
        interests: data.interests,
        collaboration: data.collaboration,
      })) {
        toast({
          title: "Complete the application first",
          description: "Finish the application questions before moving to your profile details.",
          variant: "destructive",
        });
        navigate("/applications/form");
      }
    };

    checkApplication();
  }, [navigate, toast, user]);

  const submitApplication = async () => {
    if (!user) {
      toast({ title: "Sign in required", description: "Please sign in before submitting an application.", variant: "destructive" });
      return;
    }

    const { error } = await supabase
      .from("applications")
      .update({ status: "submitted", submitted_at: new Date().toISOString() })
      .eq("user_id", user.id);

    if (error) {
      toast({ title: "Unable to submit application", description: error.message, variant: "destructive" });
      return;
    }

    toast({ title: "Application submitted", description: "Thank you for applying to Binary Hub." });
    navigate("/");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-4 pb-10 pt-28 text-[#111111] md:px-8 md:pt-32">
      <div className="mx-auto max-w-6xl">
        <button
          type="button"
          onClick={() => navigate("/applications/form")}
          className="mb-6 inline-flex items-center gap-2 text-base font-medium hover:opacity-70"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to application
        </button>

        <header className="mb-8 max-w-4xl">
          <h1 className="mt-2 text-3xl font-bold tracking-[-0.03em] md:text-5xl">Finish your application</h1>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm font-medium">
            <span className="inline-flex items-center gap-2 text-emerald-700"><CheckCircle2 className="h-4 w-4" /> Application questions</span>
            <span className="text-black/30">→</span>
            <span className="inline-flex items-center gap-2 text-[#00628b]"><Circle className="h-4 w-4" /> Final details</span>
          </div>
        </header>

        <div className="rounded-2xl border border-[#00628b]/15 bg-white/60 p-2 shadow-sm md:p-4">
          <InnovatorForm
            applicationMode
            userId={user?.id}
            applicationAnswers={applicationAnswers}
            onSuccess={submitApplication}
            onCancel={() => navigate("/applications/form")}
          />
        </div>
      </div>
    </main>
  );
};

export default ProfileCompletion;