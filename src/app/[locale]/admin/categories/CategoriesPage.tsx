"use client";
import AddCategoryDialog from "@/components/custom/AddCategoryDialog";
import CustomPagination from "@/components/custom/CustomPagination";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { usePagination } from "@/hooks/use-pagination";
import { Category } from "@prisma/client";
import React from "react";
import CategoriesTable from "./CategoriesTable";

export default function CategoriesPage({
  categories,
}: {
  categories: Category[];
}) {
  const { currentPage, totalPages, pageItems, handlePageChange } =
    usePagination<Category>(categories, 3);
  return (
    <div className="h-full">
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Gestion des Catégories</CardTitle>
          <AddCategoryDialog />
        </CardHeader>
        <CardContent>
          <CategoriesTable categories={pageItems} />
        </CardContent>
        <CardFooter>
          {totalPages > 1 && (
            <div className="mt-6">
              <CustomPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
