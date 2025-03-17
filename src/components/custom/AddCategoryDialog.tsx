"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import AddButton from "@/components/custom/AddButton";
import CustomDialog from "@/components/custom/CustomDialog";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import TextField from "./TextField";
import TextAreaField from "./TextAreaField";
import { toast } from "sonner";
import { createCategory } from "@/lib/services";

const addCategorySchema = z.object({
  label: z.string().min(1, "Le nom de la catégorie est obligatoire"),
  description: z
    .string()
    .min(1, "La description de la catégorie est obligatoire"),
});

export type CreateCategoryInput = z.infer<typeof addCategorySchema>;

export function AddCategoryDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      resetForm();
    }
  };

  const form = useForm<CreateCategoryInput>({
    resolver: zodResolver(addCategorySchema),
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

  const onSubmit = async (values: CreateCategoryInput) => {
    setIsSubmitting(true);
    try {
      await createCategory(values);

      toast?.success("Catégorie ajoutée avec succès");
      handleOpenChange(false);
    } catch (error) {
      console.error(error);
      toast?.error("Erreur lors de l'ajout de la catégorie");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CustomDialog
      trigger={<AddButton label="Ajouter une catégorie" />}
      title="Ajouter une catégorie"
      isOpen={isOpen}
      onOpenChange={handleOpenChange}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <TextField
            control={form.control}
            name="label"
            label="Nom de la catégorie"
            placeholder="Nom de la catégorie"
          />

          <TextAreaField
            control={form.control}
            name="description"
            label="Description"
            placeholder="Description de la catégorie"
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

export default AddCategoryDialog;
