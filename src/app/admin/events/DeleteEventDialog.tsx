"use client";
import { ReactNode, useState } from "react";
import { Event } from "@prisma/client";
import { useRouter } from "next/navigation";
import DeleteConfirmationDialog from "@/components/custom/DeleteConfirmationDialog";
import { deleteEvent } from "@/lib/deleteEvent";
import { showToast } from "@/utils/showToast";

export default function DeleteEventDialog({
  event,
  trigger,
  onDelete,
}: {
  event: Event;
  trigger: ReactNode;
  onDelete?: () => void;
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteEvent(event.id);
      if (result.success) {
        onDelete?.();
        showToast("success", "Événement supprimé avec succès");
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
      showToast("error", "Échec de la suppression de l'événement");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <DeleteConfirmationDialog
      trigger={trigger}
      title={`Supprimer l'événement "${event.title}"`}
      description={`Êtes-vous sûr de vouloir supprimer l'événement ${event.title} ? Cette action supprimera également le fichier média associé.`}
      isDeleting={isDeleting}
      onConfirm={handleDelete}
    />
  );
}
