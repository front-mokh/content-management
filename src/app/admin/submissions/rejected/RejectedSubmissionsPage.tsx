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
import RejectedSubmissionsTable from "./RejectedSubmissionsTable";
import { usePagination } from "@/hooks/use-pagination";
import CustomPagination from "@/components/custom/CustomPagination";

export default function RejectedSubmissionsPage({
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
            <CardTitle>Soumissions rejetées</CardTitle>
            <CardDescription>
              Consultez et gérez les soumissions qui ont été rejetées
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <RejectedSubmissionsTable submissions={pageItems} />
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