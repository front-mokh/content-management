"use client";
import AddTypeDialog from "@/components/types/AddTypeDialog";
import CustomPagination from "@/components/custom/CustomPagination";
import { CardFooter } from "@/components/ui/card";
import { usePagination } from "@/hooks/use-pagination";
import { Type, Category } from "@prisma/client";
import React from "react";
import TypesTable from "./TypeTable";
import Page from "@/components/custom/Page";

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
    <Page
      title="Gestion des Types"
      description="Créer, modifier et gérer les types au sein des catégories"
      backButtonHref="" 
      actions={<AddTypeDialog categories={categories} />}
    >
      <div className="space-y-6">
        <TypesTable types={pageItems} categories={categories} />
        
        {totalPages > 1 && (
          <CardFooter className="px-0">
            <CustomPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </CardFooter>
        )}
      </div>
    </Page>
  );
}