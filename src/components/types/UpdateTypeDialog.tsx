"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import CustomDialog from "@/components/custom/CustomDialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import TextField from "../custom/TextField";
import TextAreaField from "../custom/TextAreaField";
import SelectField from "../fields/SelectField";
import { toast } from "sonner";
import { updateType } from "@/lib/services";
import { Type, Category } from "@prisma/client";


const updateTypeSchema = z.object({
  id: z.string(),
  label: z.string().min(1, "Le nom du type est obligatoire"),
  description: z.string().optional(),
  categoryId: z.string().min(1, "La catégorie est obligatoire"),
});

export type UpdateTypeInput = z.infer<typeof updateTypeSchema>;

interface UpdateTypeDialogProps {
  trigger: React.ReactNode;
  type: Type & { category: Category };
  categories: Category[];
}

export function UpdateTypeDialog({
  trigger,
  type: typeData,
  categories,
}: UpdateTypeDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      resetForm();
    }
  };

  const form = useForm<UpdateTypeInput>({
    resolver: zodResolver(updateTypeSchema),
    defaultValues: {
      id: typeData.id,
      label: typeData.label,
      description: typeData.description,
      categoryId: typeData.categoryId,
    },
  });

  useEffect(() => {
    if (typeData) {
      form.reset({
        id: typeData.id,
        label: typeData.label,
        description: typeData.description,
        categoryId: typeData.categoryId,
      });
    }
  }, [typeData, form]);

  const resetForm = () => {
    form.reset({
      id: typeData.id,
      label: typeData.label,
      description: typeData.description,
      categoryId: typeData.categoryId,
    });
    setIsSubmitting(false);
  };

  const onSubmit = async (values: UpdateTypeInput) => {
    setIsSubmitting(true);
    try {
      const { id, ...data } = values;
      await updateType(id, data);
      toast?.success("Type mis à jour avec succès");
      handleOpenChange(false);
      // Revalidate the path to refresh the data
     
    } catch (error) {
      console.error(error);
      toast?.error("Erreur lors de la mise à jour du type");
    } finally {
      setIsSubmitting(false);
    }
  };

  const categoryOptions = categories.map(category => ({
    value: category.id,
    label: category.label
  }));

  return (
    <CustomDialog
      trigger={trigger}
      title="Modifier le type"
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
       <SelectField
            control={form.control}
            name="categoryId"
            label="Catégorie"
            placeholder="Sélectionner une catégorie"
            options={categoryOptions}
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

export default UpdateTypeDialog;