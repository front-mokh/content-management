import DeleteAction from "@/components/custom/DeleteAction";
import DeleteTypeDialog from "@/components/types/DeleteTypeDialog";
import TableWrapper from "@/components/custom/TableWrapper";
import UpdateAction from "@/components/custom/UpdateAction";
import UpdateTypeDialog from "@/components/types/UpdateTypeDialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { Type, Category } from "@prisma/client";
import React from "react";

export default function TypesTable({
  types,
  categories,
}: {
  types: (Type & { category: Category })[];
  categories: Category[];
}) {
  return (
    <TableWrapper>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom du type</TableHead>
            <TableHead className="text-center">Description</TableHead>
            <TableHead>Catégorie</TableHead>
            <TableHead>Date de création</TableHead>
            <TableHead>Date de modification</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {types.map((type) => (
            <TableRow key={type.id}>
              <TableCell className="font-medium">{type.label}</TableCell>
              <TableCell className="font-medium text-center">
                {type.description ? type.description : "/"}
              </TableCell>
              <TableCell>{type.category.label}</TableCell>
              <TableCell>{formatDate(type.createdAt)}</TableCell>
              <TableCell>{formatDate(type.updatedAt)}</TableCell>
              <TableCell>
                <div className="space-x-2">
                  <UpdateTypeDialog
                    trigger={<UpdateAction />}
                    type={type}
                    categories={categories}
                  />
                  <DeleteTypeDialog
                    trigger={<DeleteAction />}
                    type={type}
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