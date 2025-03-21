// app/admin/submissions/converted/ConvertedSubmissionsPage.tsx
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
import ConvertedSubmissionsTable from "./ConvertedSubmissionsTable";
import { usePagination } from "@/hooks/use-pagination";
import CustomPagination from "@/components/custom/CustomPagination";

export default function ConvertedSubmissionsPage({
  submissions
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
            <CardTitle>Soumissions converties</CardTitle>
            <CardDescription>
              Consultez les soumissions qui ont été converties en ressources
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ConvertedSubmissionsTable
          submissions={pageItems}
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