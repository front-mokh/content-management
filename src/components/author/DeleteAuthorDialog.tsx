// components/custom/DeleteAuthorDialog.tsx
"use client";
import { ReactNode, useState } from "react";
import { showToast } from "@/utils/showToast";
import { Author } from "@prisma/client";
import { deleteAuthor } from "@/lib/services";
import DeleteConfirmationDialog from "../custom/DeleteConfirmationDialog";

export default function DeleteAuthorDialog({
  author,
  trigger,
}: {
  author: Author;
  trigger: ReactNode;
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteAuthor(author.id);
      showToast("success", "Auteur supprimé avec succès");
    } catch (error) {
      console.error(error);
      if (error instanceof Error && error.message.includes("foreign key constraint")) {
        showToast("error", "Impossible de supprimer cet auteur car il est associé à des ressources");
      } else {
        showToast("error", "Échec de la suppression de l'auteur");
      }
    }
    setIsDeleting(false);
  };

  return (
    <DeleteConfirmationDialog
      trigger={trigger}
      title={`Supprimer l'auteur "${author.firstName} ${author.lastName}"`}
      description={`Êtes-vous sûr de vouloir supprimer l'auteur ${author.firstName} ${author.lastName} ?`}
      isDeleting={isDeleting}
      onConfirm={handleDelete}
    />
  );
}