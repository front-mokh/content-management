"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Submission } from "@prisma/client";
import React from "react";
import AcceptedSubmissionsTable from "./AcceptedSubmissionsTable";
import { usePagination } from "@/hooks/use-pagination";
import CustomPagination from "@/components/custom/CustomPagination";

export default function AcceptedSubmissionsPage({
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
  const { pageItems, currentPage, handlePageChange, totalPages } =
    usePagination(submissions, 10);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Soumissions acceptées</CardTitle>
            <CardDescription>
              Consultez et gérez les soumissions qui ont été acceptées ou convertissez-les en ressources
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <AcceptedSubmissionsTable 
          submissions={pageItems} 
          categories={categories}
          types={types}
          authors={authors}
        />
      </CardContent>
      <CardFooter>
        {totalPages > 1 && (
          <CustomPagination
            currentPage={currentPage}
            onPageChange={handlePageChange}
            totalPages={totalPages}
          />
        )}
      </CardFooter>
    </Card>
  );
}