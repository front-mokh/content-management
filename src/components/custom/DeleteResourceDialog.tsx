"use client";
import { ReactNode, useState } from "react";

import { showToast } from "@/utils/showToast";
import { Resource } from "@prisma/client";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import { deleteResource } from "@/lib/deleteResource";

export default function DeleteResourceDialog({
  resource,
  trigger,
  onDelete,
}: {
  resource: Resource;
  trigger: ReactNode;
  onDelete?: () => void;
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteResource(resource.id);
      onDelete?.();
      showToast("success", "Ressource supprimée avec succès");
    } catch {
      showToast("error", "Échec de la suppression de la ressource");
    }
    setIsDeleting(false);
  };

  return (
    <DeleteConfirmationDialog
      trigger={trigger}
      title={`Supprimer la ressource "${resource.title}"`}
      description={`Êtes-vous sûr de vouloir supprimer la ressource ${resource.title}`}
      isDeleting={isDeleting}
      onConfirm={handleDelete}
    />
  );
}
