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
import { Event } from "@prisma/client";
import React, { useState } from "react";
import EventsTable from "./EventsTable";
import AddButton from "@/components/custom/AddButton";
import { useEventFiltering } from "@/hooks/use-event-filtering";
import { Filter, FilterX, RefreshCw } from "lucide-react";
import EventFilters from "@/components/custom/EventsFilters";
import CustomPagination from "@/components/custom/CustomPagination";

interface EventsPageProps {
  events: Event[];
}

export default function EventsPage({ events }: EventsPageProps) {
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
  } = useEventFiltering(events, 10);

  const [showFilters, setShowFilters] = useState(false);

  const handleShowFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Événements</CardTitle>
            <CardDescription>Gestion des événements.</CardDescription>
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
            <AddButton label="Ajouter un événement" href="/admin/events/add" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {showFilters && (
          <EventFilters searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        )}
        {isActive && (
          <div className="text-sm text-muted-foreground">
            {filteredItems.length} événement
            {filteredItems.length > 1 ? "s" : ""} trouvé
            {filteredItems.length > 1 ? "s" : ""}
          </div>
        )}
        <EventsTable events={pageItems} />
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
