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
import { toast } from "sonner";
import { updateType } from "@/lib/services";
import { Type } from "@prisma/client";

const updateTypeSchema = z.object({
  id: z.string(),
  label: z.string().min(1, "Le nom du type est obligatoire"),
  description: z.string().optional(),
});

export type UpdateTypeInput = z.infer<typeof updateTypeSchema>;

interface UpdateTypeDialogProps {
  trigger: React.ReactNode;
  type: Type;
}

export function UpdateTypeDialog({
  trigger,
  type: typeData,
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
    },
  });

  useEffect(() => {
    if (typeData) {
      form.reset({
        id: typeData.id,
        label: typeData.label,
        description: typeData.description,
      });
    }
  }, [typeData, form]);

  const resetForm = () => {
    form.reset({
      id: typeData.id,
      label: typeData.label,
      description: typeData.description,
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
