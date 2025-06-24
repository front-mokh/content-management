"use client";
import { ReactNode, useState } from "react";
import { Village } from "@prisma/client";
import { useRouter } from "next/navigation";
import DeleteConfirmationDialog from "@/components/custom/DeleteConfirmationDialog";
import { deleteVillageRecord } from "@/lib/services/vilageService";
import { showToast } from "@/utils/showToast";

export default function DeleteVillageDialog({
  village,
  trigger,
  onDelete,
}: {
  village: Village;
  trigger: ReactNode;
  onDelete?: () => void;
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteVillageRecord(village.id);
      if (result.success) {
        onDelete?.();
        showToast("success", "Village supprimé avec succès");
        router.refresh(); // Refresh the page data
      } else {
        showToast(
          "error",
          `Échec de la suppression: ${
            result.error || "Une erreur est survenue"
          }`
        );
      }
    } catch (error) {
      console.error("Error in delete handler:", error);
      showToast("error", "Échec de la suppression du village");
    } finally {
      setIsDeleting(false);
    }
  };

  // Create the appropriate description based on whether the event has a PDF
  const getDescription = () => {
    const baseMessage = `Êtes-vous sûr de vouloir supprimer le Village "${village.title}" ?`;
    
    if (village.mediaPath) {
      return `${baseMessage} Cette action supprimera également le fichier média `;
    }
  };

  return (
    <DeleteConfirmationDialog
      trigger={trigger}
      title={`Supprimer le village "${village.title}"`}
      description={getDescription()}
      isDeleting={isDeleting}
      onConfirm={handleDelete}
    />
  );
}