import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { useStakeholders, type Stakeholder } from "@/hooks/useStakeholders";

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
  "Industry"
];

export const StakeholderForm: React.FC<StakeholderFormProps> = ({
  stakeholderId,
  onSuccess,
  onCancel,
}) => {
  const { stakeholders, createStakeholder, updateStakeholder } = useStakeholders();
  
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

  useEffect(() => {
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
  }, [stakeholderId, stakeholders, form]);

  const onSubmit = async (data: StakeholderFormData) => {
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

    if (!result.error) {
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
          render={({ field }) => (
            <FormItem>
              <FormLabel>Logo URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/logo.png" {...field} />
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
          <Button type="submit">
            {stakeholderId ? "Update" : "Create"} Stakeholder
          </Button>
        </div>
      </form>
    </Form>
  );
};