import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useApplicationSetup, SetupCategory } from "@/hooks/useApplicationSetup";
import { AdminPage, AdminPageHeader, AdminPanel, AdminToolbar } from "@/components/admin/AdminPage";

const groups: Array<{ category: SetupCategory; title: string; description: string }> = [
  { category: "role", title: "Roles", description: "Roles applicants can select." },
  { category: "department", title: "Departments", description: "Departments or fields applicants can select." },
  { category: "skill", title: "Skills", description: "Skills applicants can select in Step 2." },
];

const ApplicationSetup = () => {
  const { options, loading, addOption, removeOption } = useApplicationSetup(true);
  const [values, setValues] = useState<Record<SetupCategory, string>>({ role: "", department: "", skill: "" });

  const handleAdd = async (category: SetupCategory) => {
    const value = values[category].trim();
    if (!value) return;
    const result = await addOption(category, value);
    if (!result.error) setValues((current) => ({ ...current, [category]: "" }));
  };

  return (
    <AdminPage narrow>
      <AdminPageHeader
        title="Application setup"
        description="Manage the options applicants select while completing their application."
      />
      <div className="grid gap-4 md:grid-cols-3">
          {groups.map((group) => (
            <section key={group.category} className="rounded-lg border bg-card p-5">
              <h2 className="text-lg font-semibold">{group.title}</h2>
              <p className="mt-1 min-h-10 text-sm text-muted-foreground">{group.description}</p>
              <div className="mt-5 flex gap-2">
                <Input value={values[group.category]} onChange={(event) => setValues((current) => ({ ...current, [group.category]: event.target.value }))} placeholder={`Add ${group.title.toLowerCase().slice(0, -1)}`} onKeyDown={(event) => { if (event.key === "Enter") handleAdd(group.category); }} />
                <Button size="icon" onClick={() => handleAdd(group.category)} aria-label={`Add ${group.title.toLowerCase().slice(0, -1)}`}><Plus className="h-4 w-4" /></Button>
              </div>
              <div className="mt-5 space-y-2">
                {loading ? <p className="text-sm text-muted-foreground">Loading...</p> : options.filter((option) => option.category === group.category).map((option) => (
                  <div key={option.id} className="flex items-center justify-between border-b py-2 text-sm last:border-0">
                    <span className={option.active === false ? "text-muted-foreground line-through" : ""}>{option.name}</span>
                    <Button variant="ghost" size="icon" onClick={() => removeOption(option.id)} aria-label={`Remove ${option.name}`}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                  </div>
                ))}
              </div>
            </section>
          ))}
      </div>
    </AdminPage>
  );
};

export default ApplicationSetup;
