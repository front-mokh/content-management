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

  // Create the appropriate description based on whether the event has a PDF
  const getDescription = () => {
    const baseMessage = `Êtes-vous sûr de vouloir supprimer l'événement "${event.title}" ?`;
    
    if (event.pdfPath) {
      return `${baseMessage} Cette action supprimera également le fichier média et le document PDF associés.`;
    } else {
      return `${baseMessage} Cette action supprimera également le fichier média associé.`;
    }
  };

  return (
    <DeleteConfirmationDialog
      trigger={trigger}
      title={`Supprimer l'événement "${event.title}"`}
      description={getDescription()}
      isDeleting={isDeleting}
      onConfirm={handleDelete}
    />
  );
}