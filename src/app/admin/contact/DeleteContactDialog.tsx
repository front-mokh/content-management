
"use client";
import { ReactNode, useState } from "react";
import { showToast } from "@/utils/showToast";
import { Contact } from "@prisma/client";
import { deleteContact } from "@/lib/services/contactService";
import DeleteConfirmationDialog from "@/components/custom/DeleteConfirmationDialog";

export default function DeleteContactDialog({
  contact,
  trigger,
}: {
  contact: Contact;
  trigger: ReactNode;
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteContact(contact.id);
      showToast("success", "Message supprimé avec succès");
    } catch (error) {
      console.error(error);
      if (error instanceof Error && error.message.includes("foreign key constraint")) {
        showToast("error", "Impossible de supprimer ce message car il est associé à des ressources");
      } else {
        showToast("error", "Échec de la suppression du message");
      }
    }
    setIsDeleting(false);
  };

  return (
    <DeleteConfirmationDialog
      trigger={trigger}
      title={`Supprimer le message"`}
      description={`Êtes-vous sûr de vouloir Supprimer le message de "${contact.firstName} ${contact.lastName}" ?`}
      isDeleting={isDeleting}
      onConfirm={handleDelete}
    />
  );
}
