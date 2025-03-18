import DeleteAction from "@/components/custom/DeleteAction";
import DeleteAuthorDialog from "@/components/author/DeleteAuthorDialog";
import TableWrapper from "@/components/custom/TableWrapper";
import UpdateAction from "@/components/custom/UpdateAction";
import UpdateAuthorDialog from "@/components/author/UpdateAuthorDialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { Author } from "@prisma/client";
import React from "react";

type AuthorWithResourceCount = Author & { resourceCount: number };

export default function AuthorsTable({
  authors,
}: {
  authors: AuthorWithResourceCount[];
}) {
  return (
    <TableWrapper>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Prénom</TableHead>
            <TableHead>Nombre de ressources</TableHead>
            <TableHead>Date de création</TableHead>
            <TableHead>Date de modification</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {authors.map((author) => (
            <TableRow key={author.id}>
              <TableCell className="font-medium">{author.lastName}</TableCell>
              <TableCell className="font-medium">{author.firstName}</TableCell>
              <TableCell>{author.resourceCount}</TableCell>
              <TableCell>{formatDate(author.createdAt)}</TableCell>
              <TableCell>{formatDate(author.updatedAt)}</TableCell>
              <TableCell>
                <div className="space-x-2">
                  <UpdateAuthorDialog
                    trigger={<UpdateAction />}
                    author={author}
                  />
                  <DeleteAuthorDialog
                    trigger={<DeleteAction />}
                    author={author}
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