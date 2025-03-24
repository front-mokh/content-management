"use client";

import React from "react";
import SearchInput from "./SearchInput";

interface SubmissionFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export default function SubmissionFilters({
  searchTerm,
  setSearchTerm,
}: SubmissionFiltersProps) {
  return (
    <div className="space-y-4 p-4 border rounded-md">
      <SearchInput
        value={searchTerm}
        onChange={setSearchTerm}
        label="Rechercher"
        placeholder="Rechercher par nom, prénom, email, téléphone ou message..."
      />
      <p className="text-xs text-muted-foreground">
        La recherche s&apos;applique sur le nom, prénom, email, téléphone et message.
      </p>
    </div>
  );
}
