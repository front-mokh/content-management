"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import CustomDialog from "@/components/custom/CustomDialog";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import TextField from "./TextField";
import TextAreaField from "./TextAreaField";
import { toast } from "sonner";
import { updateCategory } from "@/lib/services";
import { Category } from "@prisma/client";

const updateCategorySchema = z.object({
  id: z.string(),
  label: z.string().min(1, "Le nom de la catégorie est obligatoire"),
  description: z
    .string()
    .min(1, "La description de la catégorie est obligatoire"),
});

export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;

interface UpdateCategoryDialogProps {
  trigger: React.ReactNode;
  category: Category;
}

export function UpdateCategoryDialog({
  trigger,
  category: categoryData,
}: UpdateCategoryDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      resetForm();
    }
  };

  const form = useForm<UpdateCategoryInput>({
    resolver: zodResolver(updateCategorySchema),
    defaultValues: {
      id: categoryData.id,
      label: categoryData.label,
      description: categoryData.description,
    },
  });

  useEffect(() => {
    if (categoryData) {
      form.reset({
        id: categoryData.id,
        label: categoryData.label,
        description: categoryData.description,
      });
    }
  }, [categoryData, form]);

  const resetForm = () => {
    form.reset({
      id: categoryData.id,
      label: categoryData.label,
      description: categoryData.description,
    });
    setIsSubmitting(false);
  };

  const onSubmit = async (values: UpdateCategoryInput) => {
    setIsSubmitting(true);
    try {
      const { id, ...data } = values;
      await updateCategory(id, data);

      // Handle success
      toast?.success("Catégorie mise à jour avec succès");
      handleOpenChange(false);
    } catch (error) {
      console.error(error);
      toast?.error("Erreur lors de la mise à jour de la catégorie");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CustomDialog
      trigger={trigger}
      title="Modifier la catégorie"
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
              {isSubmitting ? "Mise à jour..." : "Mettre à jour"}
            </Button>
          </div>
        </form>
      </Form>
    </CustomDialog>
  );
}

export default UpdateCategoryDialog;
