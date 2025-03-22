"use client";
import AddAuthorDialog from "@/components/author/AddAuthorDialog";
import CustomPagination from "@/components/custom/CustomPagination";
import {CardFooter,} from "@/components/ui/card";
import { usePagination } from "@/hooks/use-pagination";
import { Author } from "@prisma/client";
import React from "react";
import AuthorsTable from "./AuthorsTable";
import Page from "@/components/custom/Page";
type AuthorWithResourceCount = Author & { resourceCount: number };

export default function AuthorsPage({
  authors,
}: {
  authors: AuthorWithResourceCount[];
}) {
  const { currentPage, totalPages, pageItems, handlePageChange } =
    usePagination<AuthorWithResourceCount>(authors, 3);

  return (
    <Page
    title="Gestion des Auteurs"
    description="Créer, modifier et gérer les auteurs des ressources"
    backButtonHref="" 
    actions={<AddAuthorDialog />}
  >
    <div className="space-y-6">
    <AuthorsTable authors={pageItems} />
      
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