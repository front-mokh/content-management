"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { acceptSubmission, rejectSubmission, deleteSubmission } from "@/lib/services";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Submission = {
  id: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  filepath: string;
};

interface SubmissionActionsProps {
  submission: Submission;
}

export default function SubmissionActions({ submission }: SubmissionActionsProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleAccept = async () => {
    setIsLoading(true);
    try {
      const result = await acceptSubmission(submission.id);
      if (!result.success) {
        throw new Error(result.error);
      }
      toast.success("Soumission acceptée avec succès");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Erreur lors de l'acceptation de la soumission"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = async () => {
    setIsLoading(true);
    try {
      const result = await rejectSubmission(submission.id);
      if (!result.success) {
        throw new Error(result.error);
      }
      toast.success("Soumission rejetée");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Erreur lors du rejet de la soumission"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const result = await deleteSubmission(submission.id);
      if (!result.success) {
        throw new Error(result.error);
      }
      toast.success("Soumission supprimée avec succès");
      router.push("/admin/submissions");
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Erreur lors de la suppression de la soumission"
      );
    } finally {
      setIsLoading(false);
      setShowDeleteDialog(false);
    }
  };

  return (
    <>
      <div className="flex gap-2">
        <Link href={`/admin/submissions/${submission.id}/edit`} passHref>
          <Button variant="outline" disabled={isLoading}>
            Modifier
          </Button>
        </Link>

        {submission.status === "PENDING" && (
          <>
            <Button
              onClick={handleAccept}
              disabled={isLoading}
              className="bg-green-600 hover:bg-green-700"
            >
              Accepter
            </Button>
            <Button
              onClick={handleReject}
              disabled={isLoading}
              variant="outline"
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              Rejeter
            </Button>
          </>
        )}

        {submission.status === "ACCEPTED" && (
          <Link href={`/admin/submissions/${submission.id}/convert`} passHref>
            <Button disabled={isLoading}>
              Convertir en ressource
            </Button>
          </Link>
        )}

        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogTrigger asChild>
            <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
              Supprimer
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Êtes-vous sûr?</AlertDialogTitle>
              <AlertDialogDescription>
                Cette action ne peut pas être annulée. La soumission sera définitivement supprimée
                de notre système.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                Supprimer
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
}