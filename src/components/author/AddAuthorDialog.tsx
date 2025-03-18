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
import { toast } from "sonner";
import { createAuthor } from "@/lib/services";

const addAuthorSchema = z.object({
  firstName: z.string().min(1, "Le prénom est obligatoire"),
  lastName: z.string().min(1, "Le nom est obligatoire"),
});

export type CreateAuthorInput = z.infer<typeof addAuthorSchema>;

export function AddAuthorDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      resetForm();
    }
  };

  const form = useForm<CreateAuthorInput>({
    resolver: zodResolver(addAuthorSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });

  const resetForm = () => {
    form.reset({
      firstName: "",
      lastName: "",
    });
    setIsSubmitting(false);
  };

  const onSubmit = async (values: CreateAuthorInput) => {
    setIsSubmitting(true);
    try {
      await createAuthor(values);
      toast?.success("Auteur ajouté avec succès");
      handleOpenChange(false);
    } catch (error) {
      console.error(error);
      toast?.error("Erreur lors de l'ajout de l'auteur");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CustomDialog
      trigger={<AddButton label="Ajouter un auteur" />}
      title="Ajouter un auteur"
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
              {isSubmitting ? "Ajout..." : "Ajouter"}
            </Button>
          </div>
        </form>
      </Form>
    </CustomDialog>
  );
}

export default AddAuthorDialog;
