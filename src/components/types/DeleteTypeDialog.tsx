"use client";
import { ReactNode, useState } from "react";
import { toast } from "sonner";
import { Type } from "@prisma/client";
import { deleteType } from "@/lib/services";
import DeleteConfirmationDialog from "../custom/DeleteConfirmationDialog";

export default function DeleteTypeDialog({
  type,
  trigger,
}: {
  type: Type & { category: { label: string } };
  trigger: ReactNode;
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteType(type.id);
      toast.success("Type supprimé avec succès");
   
     
    } catch (error) {
      console.error(error);
      toast.error("Échec de la suppression du type");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <DeleteConfirmationDialog
      trigger={trigger}
      title={`Supprimer le type "${type.label}"`}
      description={`Êtes-vous sûr de vouloir supprimer le type ${type.label} de la catégorie ${type.category.label} ?`}
      isDeleting={isDeleting}
      onConfirm={handleDelete}
    />
  );
}