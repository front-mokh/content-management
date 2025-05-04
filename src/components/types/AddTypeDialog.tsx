"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import AddButton from "@/components/custom/AddButton";
import CustomDialog from "@/components/custom/CustomDialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import TextField from "../custom/TextField";
import TextAreaField from "../custom/TextAreaField";
import { toast } from "sonner";
import { createType } from "@/lib/services";

const addTypeSchema = z.object({
  label: z.string().min(1, "Le nom du type est obligatoire"),
  description: z.string().optional(),
});

export type CreateTypeInput = z.infer<typeof addTypeSchema>;

export function AddTypeDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      resetForm();
    }
  };

  const form = useForm<CreateTypeInput>({
    resolver: zodResolver(addTypeSchema),
    defaultValues: {
      label: "",
      description: "",
    },
  });

  const resetForm = () => {
    form.reset({
      label: "",
      description: "",
    });
    setIsSubmitting(false);
  };

  const onSubmit = async (values: CreateTypeInput) => {
    setIsSubmitting(true);
    try {
      await createType(values);
      toast?.success("Type ajouté avec succès");
      handleOpenChange(false);
      // Revalidate the path to refresh the data
    } catch (error) {
      console.error(error);
      toast?.error("Erreur lors de l'ajout du type");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CustomDialog
      trigger={<AddButton label="Ajouter un type" />}
      title="Ajouter un type"
      isOpen={isOpen}
      onOpenChange={handleOpenChange}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <TextField
            control={form.control}
            name="label"
            label="Nom du type"
            placeholder="Nom du type"
          />
          <TextAreaField
            control={form.control}
            name="description"
            label="Description (Optionnelle)"
            placeholder="Description du type"
          />

          <div className="flex justify-end gap-2 mt-10">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isSubmitting}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Ajout..." : "Ajouter"}
            </Button>
          </div>
        </form>
      </Form>
    </CustomDialog>
  );
}

export default AddTypeDialog;
