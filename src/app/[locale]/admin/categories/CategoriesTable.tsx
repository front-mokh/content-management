import DeleteAction from "@/components/custom/DeleteAction";
import DeleteCategoryDialog from "@/components/custom/DeleteCategoryDialog";
import TableWrapper from "@/components/custom/TableWrapper";
import UpdateAction from "@/components/custom/UpdateAction";
import UpdateCategoryDialog from "@/components/custom/UpdateCategoryDialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { Category } from "@prisma/client";
import React from "react";

export default function CategoriesTable({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <TableWrapper>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom de la catégorie</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Date de création</TableHead>
            <TableHead>Date de modification</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell className="font-medium">{category.label}</TableCell>
              <TableCell className="font-medium">
                {category.description}
              </TableCell>
              <TableCell>{formatDate(category.createdAt)}</TableCell>
              <TableCell>{formatDate(category.updatedAt)}</TableCell>
              <TableCell>
                <div className="space-x-2">
                  <UpdateCategoryDialog
                    trigger={<UpdateAction />}
                    category={category}
                  />
                  <DeleteCategoryDialog
                    trigger={<DeleteAction />}
                    category={category}
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
