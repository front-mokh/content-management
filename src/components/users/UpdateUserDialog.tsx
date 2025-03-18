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
  username: z.string().min(1, "Le nom d'utilisateur est obligatoire"),
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
      username: userData.username,
      password: "",
    },
  });

  useEffect(() => {
    if (userData) {
      form.reset({
        id: userData.id,
        username: userData.username,
        password: "",
      });
    }
  }, [userData, form]);

  const resetForm = () => {
    form.reset({
      id: userData.id,
      username: userData.username,
      password: "",
    });
    setIsSubmitting(false);
  };

  const onSubmit = async (values: UpdateUserInput) => {
    setIsSubmitting(true);
    try {
      const { id, ...data } = values;
      // Only include password if it's not empty
      const updateData = data.password ? data : { username: data.username };
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
            name="username"
            label="Nom d'utilisateur"
            placeholder="Nom d'utilisateur"
          />
          <TextField
            control={form.control}
            name="password"
            label="Nouveau mot de passe (optionnel)"
            placeholder="Laissez vide pour ne pas changer"
            type="password"
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