"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import Link from "next/link";
import { 
  acceptSubmission, 
  rejectSubmission, 
  deleteSubmission 
} from "@/lib/services";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { File, MoreHorizontal, Check, X, Trash, Eye, FileEdit, Repeat } from "lucide-react";

type Submission = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  message?: string | null;
  filepath: string;
  author: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  createdAt: Date;
  updatedAt: Date;
};

interface SubmissionsListProps {
  submissions: Submission[];
}

export default function SubmissionsList({ submissions }: SubmissionsListProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleAccept = async (id: string) => {
    setIsLoading((prev) => ({ ...prev, [id]: true }));
    try {
      const result = await acceptSubmission(id);
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
      setIsLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleReject = async (id: string) => {
    setIsLoading((prev) => ({ ...prev, [id]: true }));
    try {
      const result = await rejectSubmission(id);
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
      setIsLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleDelete = async (id: string) => {
    setIsLoading((prev) => ({ ...prev, [id]: true }));
    try {
      const result = await deleteSubmission(id);
      if (!result.success) {
        throw new Error(result.error);
      }
      toast.success("Soumission supprimée avec succès");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Erreur lors de la suppression de la soumission"
      );
    } finally {
      setIsLoading((prev) => ({ ...prev, [id]: false }));
      setDeleteId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs">En attente</span>;
      case "ACCEPTED":
        return <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs">Acceptée</span>;
      case "REJECTED":
        return <span className="px-2 py-1 rounded-full bg-red-100 text-red-800 text-xs">Rejetée</span>;
      default:
        return null;
    }
  };

  if (submissions.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Aucune soumission trouvée</p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Auteur</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Document</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.map((submission) => (
              <TableRow key={submission.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{submission.author}</p>
                    <p className="text-sm text-gray-500">
                      {submission.firstName} {submission.lastName}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="text-sm">{submission.email}</p>
                    {submission.phone && (
                      <p className="text-sm text-gray-500">{submission.phone}</p>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <a
                    href={submission.filepath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <File className="h-4 w-4 mr-1" />
                    <span>Voir</span>
                  </a>
                </TableCell>
                <TableCell>{getStatusBadge(submission.status)}</TableCell>
                <TableCell>
                  <div>
                    <p className="text-sm">
                      {formatDistanceToNow(new Date(submission.createdAt), { 
                        addSuffix: true,
                        locale: fr
                      })}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <Link href={`/admin/submissions/${submission.id}`} passHref>
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          Détails
                        </DropdownMenuItem>
                      </Link>
                      <Link href={`/admin/submissions/${submission.id}/edit`} passHref>
                        <DropdownMenuItem>
                          <FileEdit className="h-4 w-4 mr-2" />
                          Modifier
                        </DropdownMenuItem>
                      </Link>
                      {submission.status === "PENDING" && (
                        <>
                          <DropdownMenuItem onClick={() => handleAccept(submission.id)}>
                            <Check className="h-4 w-4 mr-2" />
                            Accepter
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleReject(submission.id)}>
                            <X className="h-4 w-4 mr-2" />
                            Rejeter
                          </DropdownMenuItem>
                        </>
                      )}
                      {submission.status === "ACCEPTED" && (
                        <Link href={`/admin/submissions/${submission.id}/convert`} passHref>
                          <DropdownMenuItem>
                            <Repeat className="h-4 w-4 mr-2" />
                            Convertir en ressource
                          </DropdownMenuItem>
                        </Link>
                      )}
                      <DropdownMenuItem onClick={() => setDeleteId(submission.id)} className="text-red-600">
                        <Trash className="h-4 w-4 mr-2" />
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
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
            <AlertDialogAction onClick={() => deleteId && handleDelete(deleteId)} className="bg-red-600 hover:bg-red-700">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}