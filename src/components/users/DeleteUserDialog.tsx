"use client";
import { ReactNode, useState } from "react";
import { toast } from "sonner";
import { User } from "@prisma/client";
import { deleteUser } from "@/lib/services";
import DeleteConfirmationDialog from "../custom/DeleteConfirmationDialog";

export default function DeleteUserDialog({
  user,
  trigger,
}: {
  user: User;
  trigger: ReactNode;
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteUser(user.id);
      toast.success("Utilisateur supprimé avec succès");
    } catch (error) {
      console.error(error);
      if (error instanceof Error && error.message.includes("foreign key constraint")) {
        toast.error("Impossible de supprimer cet utilisateur car il est associé à des ressources");
      } else {
        toast.error("Échec de la suppression de l'utilisateur");
      }
    }
    setIsDeleting(false);
  };

  return (
    <DeleteConfirmationDialog
      trigger={trigger}
      title={`Supprimer l'utilisateur "${user.username}"`}
      description={`Êtes-vous sûr de vouloir supprimer l'utilisateur ${user.username} ?`}
      isDeleting={isDeleting}
      onConfirm={handleDelete}
    />
  );
}