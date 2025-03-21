"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteSubmission } from "@/lib/services";
import { Submission } from "@prisma/client";
import React, { useState } from "react";
import { showToast } from "@/utils/showToast";

export default function DeleteSubmissionDialog({
  trigger,
  submission,
}: {
  trigger: React.ReactNode;
  submission: Submission;
}) {
  const [open, setOpen] = useState(false);


  async function handleDelete() {
    try {
      await deleteSubmission(submission.id);
      showToast("success", "La soumission a été supprimée avec succès.");
   
      setOpen(false);
    } catch  {
        showToast("success", "Une erreur est survenue lors de la suppression de la soumission.");
     
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <div onClick={() => setOpen(true)}>{trigger}</div>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer cette soumission ?</AlertDialogTitle>
          <AlertDialogDescription>
            Cette action est irréversible. Cette soumission sera définitivement supprimée
            de notre base de données.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Supprimer</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}