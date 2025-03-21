import { FileDownloader } from "@/components/custom/FileDownloader";
import TableWrapper from "@/components/custom/TableWrapper";
import ViewAction from "@/components/custom/ViewAction";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import React from "react";
import { Submission } from "@prisma/client";
import DeleteAction from "@/components/custom/DeleteAction";
import DeleteSubmissionDialog from "../DeleteSubmissionDialog";
import RejectSubmissionAction from "../RejectSubmissionAction";
import ConvertToResourceAction from "./ConvertToResourceAction";

export default function AcceptedSubmissionsTable({
  submissions,
  categories,
  types,
  authors,
}: {
  submissions: Submission[];
  categories: { id: string; label: string }[];
  types: { id: string; label: string; categoryId: string }[];
  authors: { id: string; firstName: string; lastName: string }[];
}) {
  return (
    <TableWrapper>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Prénom</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Téléphone</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Auteur</TableHead>
            <TableHead className="text-center">Fichier</TableHead>
            <TableHead>Date d&apos;acceptation</TableHead>
            <TableHead className="w-[200px] text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {submissions.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={9}
                className="text-muted-foreground text-center"
              >
                Aucune soumission acceptée n&apos;a été trouvée
              </TableCell>
            </TableRow>
          )}
          {submissions.map((submission) => (
            <TableRow key={submission.id}>
              <TableCell className="font-medium">{submission.lastName}</TableCell>
              <TableCell>{submission.firstName}</TableCell>
              <TableCell>{submission.email}</TableCell>
              <TableCell>
                {submission.phone || (
                  <span className="text-muted-foreground">Non renseigné</span>
                )}
              </TableCell>
              <TableCell>
                {submission.message || (
                  <span className="text-muted-foreground">Aucun message</span>
                )}
              </TableCell>
              <TableCell>{submission.author}</TableCell>
              <TableCell className="text-center">
                <FileDownloader path={submission.filepath} />
              </TableCell>
              <TableCell>{formatDate(submission.updatedAt)}</TableCell>
              <TableCell className="w-[200px] text-right">
                <div className="w-fit flex">
                  <ConvertToResourceAction 
                    submission={submission}
                    categories={categories}
                    types={types}
                    authors={authors}
                  />
                  <RejectSubmissionAction submission={submission} />
                  <ViewAction href={`/admin/submissions/${submission.id}`} />
                  <DeleteSubmissionDialog
                    trigger={<DeleteAction />}
                    submission={submission}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableWrapper>
  );
}