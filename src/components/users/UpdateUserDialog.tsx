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
import { updateUser } from "@/lib/services";
import { User } from "@prisma/client";

const updateUserSchema = z.object({
  id: z.string(),
  email: z.string().email("Email invalide").min(1, "L'email est obligatoire"),
  firstName: z.string().min(1, "Le prénom est obligatoire"),
  lastName: z.string().min(1, "Le nom est obligatoire"),
  password: z.string().optional(),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;

interface UpdateUserDialogProps {
  trigger: React.ReactNode;
  user: User;
}

export function UpdateUserDialog({
  trigger,
  user: userData,
}: UpdateUserDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      resetForm();
    }
  };

  const form = useForm<UpdateUserInput>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      id: userData.id,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      password: "",
    },
  });

  useEffect(() => {
    if (userData) {
      form.reset({
        id: userData.id,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        password: "",
      });
    }
  }, [userData, form]);

  const resetForm = () => {
    form.reset({
      id: userData.id,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      password: "",
    });
    setIsSubmitting(false);
  };

  const onSubmit = async (values: UpdateUserInput) => {
    setIsSubmitting(true);
    try {
      const { id, password, ...data } = values;
      // Only include password if it's not empty
      const updateData = password ? { ...data, password } : data;
      await updateUser(id, updateData);
      toast?.success("Utilisateur mis à jour avec succès"); 
      handleOpenChange(false);
    } catch (error) {
      console.error(error);
      toast?.error("Erreur lors de la mise à jour de l'utilisateur");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CustomDialog
      trigger={trigger}
      title="Modifier l'utilisateur"
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
            label="Nouveau mot de passe (optionnel)"
            placeholder="Laissez vide pour ne pas changer"
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

export default UpdateUserDialog;