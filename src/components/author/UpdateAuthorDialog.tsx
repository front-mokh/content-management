"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import CustomDialog from "@/components/custom/CustomDialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import TextField from "../custom/TextField";
import { toast } from "sonner";
import { updateAuthor } from "@/lib/services";
import { Author } from "@prisma/client";

const updateAuthorSchema = z.object({
  id: z.string(),
  firstName: z.string().min(1, "Le prénom est obligatoire"),
  lastName: z.string().min(1, "Le nom est obligatoire"),
});

export type UpdateAuthorInput = z.infer<typeof updateAuthorSchema>;

interface UpdateAuthorDialogProps {
  trigger: React.ReactNode;
  author: Author;
}

export function UpdateAuthorDialog({
  trigger,
  author: authorData,
}: UpdateAuthorDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      resetForm();
    }
  };

  const form = useForm<UpdateAuthorInput>({
    resolver: zodResolver(updateAuthorSchema),
    defaultValues: {
      id: authorData.id,
      firstName: authorData.firstName,
      lastName: authorData.lastName,
    },
  });

  useEffect(() => {
    if (authorData) {
      form.reset({
        id: authorData.id,
        firstName: authorData.firstName,
        lastName: authorData.lastName,
      });
    }
  }, [authorData, form]);

  const resetForm = () => {
    form.reset({
      id: authorData.id,
      firstName: authorData.firstName,
      lastName: authorData.lastName,
    });
    setIsSubmitting(false);
  };

  const onSubmit = async (values: UpdateAuthorInput) => {
    setIsSubmitting(true);
    try {
      const { id, ...data } = values;
      await updateAuthor(id, data);
      toast?.success("Auteur mis à jour avec succès");
      handleOpenChange(false);
    } catch (error) {
      console.error(error);
      toast?.error("Erreur lors de la mise à jour de l'auteur");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CustomDialog
      trigger={trigger}
      title="Modifier l'auteur"
      isOpen={isOpen}
      onOpenChange={handleOpenChange}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <TextField
            control={form.control}
            name="firstName"
            label="Prénom"
            placeholder="Prénom de l'auteur"
          />
          <TextField
            control={form.control}
            name="lastName"
            label="Nom"
            placeholder="Nom de l'auteur"
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

export default UpdateAuthorDialog;
