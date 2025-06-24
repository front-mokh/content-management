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
import { Village } from "@prisma/client";
import React, { useState } from "react";
import VillagesTable from "./VillagesTable";
import AddButton from "@/components/custom/AddButton";
import { Filter, FilterX, RefreshCw } from "lucide-react";
import CustomPagination from "@/components/custom/CustomPagination";
import VillagesFilters from "@/components/custom/VillagesFilters";
import { useVillageFiltering } from "@/hooks/use-villages-filtering";

interface VillagesPageProps {
  villages: Village[];
}

export default function VillagesPage({ villages }: VillagesPageProps) {
  const {
    pageItems,
    currentPage,
    totalPages,
    handlePageChange,
    searchTerm,
    setSearchTerm,
    filteredItems,
    isActive,
    resetFilters,
  } = useVillageFiltering(villages, 10);

  const [showFilters, setShowFilters] = useState(false);

  const handleShowFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Villages</CardTitle>
            <CardDescription>Gestion des Villages.</CardDescription>
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
            <AddButton label="Ajouter un Village" href="/admin/villages/add" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {showFilters && (
          <VillagesFilters searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        )}
        {isActive && (
          <div className="text-sm text-muted-foreground">
            {filteredItems.length} Villages
            {filteredItems.length > 1 ? "s" : ""} trouvé
            {filteredItems.length > 1 ? "s" : ""}
          </div>
        )}
        <VillagesTable villages={pageItems} />
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
