"use client";
import AddTypeDialog from "@/components/types/AddTypeDialog";
import CustomPagination from "@/components/custom/CustomPagination";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { usePagination } from "@/hooks/use-pagination";
import { Type, Category } from "@prisma/client";
import React from "react";
import TypesTable from "./TypeTable";

export default function TypesPage({
  types,
  categories,
}: {
  types: (Type & { category: Category })[];
  categories: Category[];
}) {
  const { currentPage, totalPages, pageItems, handlePageChange } =
    usePagination<Type & { category: Category }>(types, 3);

  return (
    <div className="h-full">
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Gestion des Types</CardTitle>
          <AddTypeDialog categories={categories} />
        </CardHeader>
        <CardContent>
          <TypesTable types={pageItems} categories={categories} />
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