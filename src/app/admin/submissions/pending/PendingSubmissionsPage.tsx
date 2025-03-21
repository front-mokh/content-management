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
import SubmissionsTable from "./SubmissionsTable";
import { usePagination } from "@/hooks/use-pagination";
import CustomPagination from "@/components/custom/CustomPagination";

export default function PendingSubmissionsPage({
  submissions,
}: {
  submissions: Submission[];
}) {
  const { pageItems, currentPage, handlePageChange, totalPages } =
    usePagination(submissions, 10);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Soumissions en attente</CardTitle>
            <CardDescription>
              Consultez et gérez les soumissions en attente d&apos;approbation
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <SubmissionsTable submissions={pageItems} />
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