// AuthorsPage.tsx
"use client";
import AddAuthorDialog from "@/components/author/AddAuthorDialog";
import CustomPagination from "@/components/custom/CustomPagination";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { usePagination } from "@/hooks/use-pagination";
import { Author } from "@prisma/client";
import React from "react";
import AuthorsTable from "./AuthorsTable";

type AuthorWithResourceCount = Author & { resourceCount: number };

export default function AuthorsPage({
  authors,
}: {
  authors: AuthorWithResourceCount[];
}) {
  const { currentPage, totalPages, pageItems, handlePageChange } =
    usePagination<AuthorWithResourceCount>(authors, 8);
  
  return (
    <div className="h-full">
      <Card className="h-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Gestion des Auteurs</CardTitle>
          <AddAuthorDialog />
        </CardHeader>
        <CardContent>
          <AuthorsTable authors={pageItems} />
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