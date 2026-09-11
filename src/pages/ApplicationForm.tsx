import { useMemo, useState } from "react";
import { ArrowLeft, ChevronRight, CircleAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";

const questionSections = [
  "Profile",
  "Skills",
  "Motivation",
  "Project interests",
  "Collaboration",
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
  const [form, setForm] = useState({
    universityYear: "",
    skills: [] as string[],
    motivation: "",
    interests: "",
    collaboration: "",
  });

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

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-4 py-8 text-[#111111] md:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <button
          type="button"
          onClick={() => navigate("/applications")}
          className="mb-8 inline-flex items-center gap-2 text-xl font-medium text-[#111111] transition-opacity hover:opacity-80"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back</span>
        </button>

        <header className="mb-10">
          <h1 className="font-['ZurichBT','Georgia','serif'] text-[2.7rem] font-normal leading-none tracking-[-0.04em] not-italic md:text-[3.4rem] lg:text-[4.2rem]">
            My Application
          </h1>
          <p className="mt-4 text-xl text-[#111111]/70 md:text-2xl">Winter 2027</p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[200px_minmax(0,1fr)]">
          <aside className="pt-4 text-base text-[#111111]/65 md:text-lg">
            {questionSections.map((item, index) => (
              <div key={item} className={index === 0 ? "mb-4 text-[#111111]" : "mb-4"}>
                {item}
              </div>
            ))}
          </aside>

          <section className="w-full">
            <h2 className="mb-6 text-[1.8rem] font-semibold tracking-[-0.03em] text-[#111111] md:text-[2rem]">Application</h2>

            <div className="rounded-2xl border border-black/30 bg-white/30 p-3 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)] md:p-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-lg font-semibold text-[#111111] md:text-xl">Rukundo Wilson</div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#d84e42] px-3 py-1 text-xs font-semibold text-white md:text-sm">
                    <CircleAlert className="h-3.5 w-3.5" />
                    Profile incomplete
                  </div>
                </div>

                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 self-start text-base font-medium text-[#111111] md:self-auto"
                >
                  Complete my profile <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mt-8 space-y-6">
              <div>
                <label className="mb-3 block text-xl font-medium leading-tight text-[#111111] md:text-2xl">
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

              <div>
                <label className="mb-3 block text-xl font-medium leading-tight text-[#111111] md:text-2xl">
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

              <div>
                <label className="mb-3 block text-xl font-medium leading-tight text-[#111111] md:text-2xl">
                  Why do you want to join Binary Hub?
                </label>
                <textarea
                  value={form.motivation}
                  onChange={(e) => updateField("motivation", e.target.value)}
                  className="min-h-[150px] w-full rounded-2xl border border-black/30 bg-white/50 px-4 py-3 text-base outline-none transition focus:border-[#00628b] focus:ring-2 focus:ring-[#00628b]/20"
                  placeholder="Share your motivation and ambitions."
                />
              </div>

              <div>
                <label className="mb-3 block text-xl font-medium leading-tight text-[#111111] md:text-2xl">
                  What would you like to build or work on at Binary Hub?
                </label>
                <textarea
                  value={form.interests}
                  onChange={(e) => updateField("interests", e.target.value)}
                  className="min-h-[120px] w-full rounded-2xl border border-black/30 bg-white/50 px-4 py-3 text-base outline-none transition focus:border-[#00628b] focus:ring-2 focus:ring-[#00628b]/20"
                  placeholder="Describe the ideas, problems, or products you want to build."
                />
              </div>

              <div>
                <label className="mb-3 block text-xl font-medium leading-tight text-[#111111] md:text-2xl">
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
                onClick={() => navigate("/applications")}
                className="text-base font-medium text-[#111111] hover:opacity-80"
              >
                ← Back
              </button>

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  className="rounded-full border border-[#111111] bg-white px-4 py-2 text-base font-medium text-[#111111] transition hover:bg-[#f6f6f6]"
                >
                  Save changes
                </button>
                <button
                  type="button"
                  className="rounded-full bg-[#4a4a4a] px-5 py-2 text-base font-medium text-white transition hover:bg-[#2d2d2d]"
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
