"use client";
import React from "react";
import SearchInput from "@/components/custom/SearchInput";

interface EventFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export default function VillagesFilters({
  searchTerm,
  setSearchTerm,
}: EventFiltersProps) {
  return (
    <div className="space-y-4 p-4 border rounded-md">
      <SearchInput
        value={searchTerm}
        onChange={setSearchTerm}
        label="Rechercher"
        placeholder="Rechercher par titre ou description..."
      />
      <p className="text-xs text-muted-foreground">
        La recherche s&apos;applique sur le titre et la description des
        Villages.
      </p>
    </div>
  );
}
