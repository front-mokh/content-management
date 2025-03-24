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
import { createUser } from "@/lib/services";

const addUserSchema = z.object({
  email: z.string().email("Email invalide").min(1, "L'email est obligatoire"),
  firstName: z.string().min(1, "Le prénom est obligatoire"),
  lastName: z.string().min(1, "Le nom est obligatoire"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

export type CreateUserInput = z.infer<typeof addUserSchema>;

export function AddUserDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      resetForm();
    }
  };

  const form = useForm<CreateUserInput>({
    resolver: zodResolver(addUserSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
    },
  });

  const resetForm = () => {
    form.reset({
      email: "",
      firstName: "",
      lastName: "",
      password: "",
    });
    setIsSubmitting(false);
  };

  const onSubmit = async (values: CreateUserInput) => {
    setIsSubmitting(true);
    try {
      await createUser(values);
      toast?.success("Utilisateur ajouté avec succès");
      handleOpenChange(false);
    } catch (error) {
      console.error(error);
      toast?.error("Erreur lors de l'ajout de l'utilisateur");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CustomDialog
      trigger={<AddButton label="Ajouter un utilisateur" />}
      title="Ajouter un utilisateur"
      isOpen={isOpen}
      onOpenChange={handleOpenChange}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <TextField
            control={form.control}
            name="email"
            label="Email"
            placeholder="Email" 
          />
          <TextField
            control={form.control}
            name="firstName"
            label="Prénom"
            placeholder="Prénom"
          />
          <TextField
            control={form.control}
            name="lastName"
            label="Nom"
            placeholder="Nom"
          />
          <TextField
            control={form.control}
            name="password"
            label="Mot de passe"
            placeholder="Mot de passe"
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

export default AddUserDialog;