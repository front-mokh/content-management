"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FullResource } from "@/lib/types";
import React, { useState } from "react";
import ResourcesTable from "./ResourcesTable";
import AddButton from "@/components/custom/AddButton";
import CustomPagination from "@/components/custom/CustomPagination";
import { useResourceFiltering } from "@/hooks/use-resource-filtering";
import { Author, Category, Type, User } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Filter, FilterX, RefreshCw } from "lucide-react";
import ResourceFilters from "@/components/custom/ResourceFilters";

interface PublishedResourcesPageProps {
  resources: FullResource[];
  categories: Category[];
  types: Type[];
  authors: Author[];
  handlers: User[];
}

export default function PublishedResourcesPage({
  resources,
  categories,
  types,
  authors,
  handlers,
}: PublishedResourcesPageProps) {
  const {
    pageItems,
    currentPage,
    totalPages,
    handlePageChange,
    filters,
    setFilter,
    resetFilters,
    searchTerm,
    setSearchTerm,
    filteredItems,
    isActive,
  } = useResourceFiltering(resources, 10);

  const [showFilters, setShowFilters] = useState(false);

  const handleShowFilters = () => {
    setShowFilters(!showFilters);
    resetFilters();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Ressources Publiées</CardTitle>
            <CardDescription>
              Page de gestion des ressources publiées pour les visiteurs
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
            <AddButton
              label="Ajouter une ressource"
              href="/admin/resources/add"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {showFilters && (
          <ResourceFilters
            filters={filters}
            setFilter={setFilter}
            categories={categories}
            types={types}
            authors={authors}
            handlers={handlers}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        )}

        {isActive && (
          <div className="text-sm text-muted-foreground">
            {filteredItems.length} ressource
            {filteredItems.length > 1 ? "s" : ""} trouvée
            {filteredItems.length > 1 ? "s" : ""}
          </div>
        )}
        <ResourcesTable resources={pageItems} />
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
