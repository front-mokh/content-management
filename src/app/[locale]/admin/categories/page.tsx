import AddCategoryDialog from "@/components/custom/AddCategoryDialog";
import UpdateAction from "@/components/custom/UpdateAction";
import UpdateCategoryDialog from "@/components/custom/UpdateCategoryDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllCategories } from "@/lib/services";
import { formatDate } from "@/lib/utils";
import React from "react";

export default async function CategoriesPage() {
  const categories = await getAllCategories();

  return (
    <div>
      <Card>
        <CardHeader>
          Gestion des Catégories
          <AddCategoryDialog />
        </CardHeader>
        <CardContent>
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
                  <TableCell className="font-medium">
                    {category.label}
                  </TableCell>
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
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
