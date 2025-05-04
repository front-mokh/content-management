// TypePage.tsx
"use client";
import AddTypeDialog from "@/components/types/AddTypeDialog";
import CustomPagination from "@/components/custom/CustomPagination";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTypeFiltering } from "@/hooks/use-type-filtering";
import { Type } from "@prisma/client";
import React, { useState } from "react";
import TypesTable from "./TypeTable";
import { Button } from "@/components/ui/button";
import { Filter, FilterX, RefreshCw } from "lucide-react";
import TypeFilters from "@/components/types/TypeFilters";

export default function TypesPage({ types }: { types: Type[] }) {
  const {
    pageItems,
    currentPage,
    totalPages,
    handlePageChange,

    resetFilters,
    searchTerm,
    setSearchTerm,
    filteredItems,
    isActive,
  } = useTypeFiltering(types, 8);

  const [showFilters, setShowFilters] = useState(false);

  const handleShowFilters = () => {
    setShowFilters(!showFilters);
    if (showFilters) resetFilters();
  };

  return (
    <div className="h-full">
      <Card className="h-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Gestion des Types</CardTitle>
            <CardDescription>
              Gérez et filtrez les types disponibles
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
            <AddTypeDialog />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {showFilters && (
            <TypeFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          )}
          {isActive && (
            <div className="text-sm text-muted-foreground">
              {filteredItems.length} type
              {filteredItems.length > 1 ? "s" : ""} trouvé
              {filteredItems.length > 1 ? "s" : ""}
            </div>
          )}
          <TypesTable types={pageItems} />
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
    </div>
  );
}
