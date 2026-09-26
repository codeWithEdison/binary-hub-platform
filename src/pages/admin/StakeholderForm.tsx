import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Image as ImageIcon, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useStakeholders } from "@/hooks/useStakeholders";
import { useAdminFormDraft } from "@/hooks/useAdminFormDraft";
import { useToast } from "@/hooks/use-toast";
import { uploadPublicImage } from "@/lib/uploadImage";
import { InlineLoadingOrb } from "@/components/LoadingOrb";

const stakeholderSchema = z.object({
  name: z.string().min(1, "Name is required"),
  logo: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  contribution: z.string().optional(),
  website: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  contact_email: z.string().email("Must be a valid email").optional().or(z.literal("")),
  contact_phone: z.string().optional(),
});

type StakeholderFormData = z.infer<typeof stakeholderSchema>;

interface StakeholderFormProps {
  stakeholderId?: string | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const categories = [
  "Academic",
  "Infrastructure",
  "Government",
  "Innovation",
  "Funding",
  "International",
  "Research",
  "Industry",
];

export const StakeholderForm: React.FC<StakeholderFormProps> = ({
  stakeholderId,
  onSuccess,
  onCancel,
}) => {
  const { stakeholders, createStakeholder, updateStakeholder } = useStakeholders();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<StakeholderFormData>({
    resolver: zodResolver(stakeholderSchema),
    defaultValues: {
      name: "",
      logo: "",
      category: "",
      contribution: "",
      website: "",
      contact_email: "",
      contact_phone: "",
    },
  });

  const draftKey = `stakeholder:${stakeholderId || "new"}`;
  const watchedValues = form.watch();
  const logoUrl = form.watch("logo");
  const { ready: draftReady, clearDraft, wasRestored } = useAdminFormDraft(
    draftKey,
    watchedValues,
    (draft) => form.reset(draft)
  );

  useEffect(() => {
    if (!draftReady || wasRestored) return;
    if (stakeholderId) {
      const stakeholder = stakeholders.find((s) => s.id === stakeholderId);
      if (stakeholder) {
        form.reset({
          name: stakeholder.name,
          logo: stakeholder.logo || "",
          category: stakeholder.category,
          contribution: stakeholder.contribution || "",
          website: stakeholder.website || "",
          contact_email: stakeholder.contact_email || "",
          contact_phone: stakeholder.contact_phone || "",
        });
      }
    }
  }, [stakeholderId, stakeholders, form, draftReady, wasRestored]);

  const handleLogoUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const result = await uploadPublicImage(file, "stakeholders");
    setIsUploading(false);

    if (result.error) {
      toast({
        title: "Upload failed",
        description: result.error,
        variant: "destructive",
      });
    } else if (result.url) {
      form.setValue("logo", result.url, { shouldDirty: true, shouldValidate: true });
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeLogo = () => {
    form.setValue("logo", "", { shouldDirty: true });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit = async (data: StakeholderFormData) => {
    setIsSubmitting(true);
    const stakeholderData = {
      name: data.name,
      category: data.category,
      logo: data.logo || null,
      contribution: data.contribution || null,
      website: data.website || null,
      contact_email: data.contact_email || null,
      contact_phone: data.contact_phone || null,
    };

    let result;
    if (stakeholderId) {
      result = await updateStakeholder(stakeholderId, stakeholderData);
    } else {
      result = await createStakeholder(stakeholderData);
    }

    setIsSubmitting(false);
    if (!result.error) {
      clearDraft();
      onSuccess();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Stakeholder name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="logo"
          render={() => (
            <FormItem>
              <FormLabel>Logo</FormLabel>
              <FormControl>
                <div className="space-y-3">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleLogoUpload}
                  />
                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      disabled={isUploading}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      {isUploading ? "Uploading..." : logoUrl ? "Replace logo" : "Upload logo"}
                    </Button>
                    {logoUrl ? (
                      <Button type="button" variant="ghost" onClick={removeLogo}>
                        <X className="mr-2 h-4 w-4" />
                        Remove
                      </Button>
                    ) : null}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    JPG, PNG, or WebP. Maximum 5MB.
                  </p>
                  {logoUrl ? (
                    <div className="flex h-28 w-28 items-center justify-center rounded-md border bg-muted/30 p-2">
                      <img
                        src={logoUrl}
                        alt="Stakeholder logo preview"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="flex h-28 w-full items-center justify-center rounded-md border border-dashed text-muted-foreground">
                      <ImageIcon className="mr-2 h-5 w-5" />
                      No logo selected
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} value={field.value || undefined}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contribution"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contribution</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe their contribution to the project"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contact_email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Email</FormLabel>
              <FormControl>
                <Input placeholder="contact@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contact_phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Phone</FormLabel>
              <FormControl>
                <Input placeholder="+250 XXX XXX XXX" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting || isUploading}>
            {isSubmitting ? (
              <InlineLoadingOrb state="working" label="Saving" />
            ) : stakeholderId ? (
              "Update Stakeholder"
            ) : (
              "Create Stakeholder"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
