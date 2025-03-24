"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Submission } from "@prisma/client";
import React, { useState } from "react";
import RejectedSubmissionsTable from "./RejectedSubmissionsTable";
import CustomPagination from "@/components/custom/CustomPagination";
import { useSubmissionFiltering } from "@/hooks/use-submission-filtering";
import { Filter, FilterX, RefreshCw } from "lucide-react";
import SubmissionFilters from "@/components/custom/SubmissionFilters";

export default function RejectedSubmissionsPage({
  submissions,
}: {
  submissions: Submission[];
}) {
  const {
    pageItems,
    currentPage,
    totalPages,
    handlePageChange,
    searchTerm,
    setSearchTerm,
    filteredItems,
    isActive,
    resetFilters
  } = useSubmissionFiltering(submissions, 10);
  
  const [showFilters, setShowFilters] = useState(false);
  
  const handleShowFilters = () => {
    setShowFilters(!showFilters);
  };
  
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
          <div className="flex gap-2">
            {isActive && (
              <Button
                variant="outline"
                onClick={resetFilters}
                className="flex items-center gap-1"
              >
                <RefreshCw size={16} />
                Réinitialiser
              </Button>
            )}
            <Button variant="outline" onClick={handleShowFilters}>
              {showFilters ? <FilterX size={16} /> : <Filter size={16} />}
              {showFilters ? "Masquer les filtres" : "Afficher les filtres"}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {showFilters && (
          <SubmissionFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        )}
        {isActive && (
          <div className="text-sm text-muted-foreground">
            {filteredItems.length} soumission
            {filteredItems.length > 1 ? "s" : ""} trouvée
            {filteredItems.length > 1 ? "s" : ""}
          </div>
        )}
        <RejectedSubmissionsTable submissions={pageItems} />
      </CardContent>
      {totalPages > 1 && (
        <CardFooter>
          <CustomPagination
            currentPage={currentPage}
            onPageChange={handlePageChange}
            totalPages={totalPages}
          />
        </CardFooter>
      )}
    </Card>
  );
}