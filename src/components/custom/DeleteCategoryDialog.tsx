"use client";
import { ReactNode, useState } from "react";

import { showToast } from "@/utils/showToast";
import { Category } from "@prisma/client";
import { deleteCategory } from "@/lib/services";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";

export default function DeleteCategoryDialog({
  category,
  trigger,
}: {
  category: Category;
  trigger: ReactNode;
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteCategory(category.id);

      showToast("success", "Catégorie supprimée avec succès");
    } catch {
      showToast("error", "Échec de la suppression de la catégorie");
    }
    setIsDeleting(false);
  };

  return (
    <DeleteConfirmationDialog
      trigger={trigger}
      title={`Supprimer la catégorie "${category.label}"`}
      description={`Êtes-vous sûr de vouloir supprimer la catégorie ${category.label}`}
      isDeleting={isDeleting}
      onConfirm={handleDelete}
    />
  );
}
