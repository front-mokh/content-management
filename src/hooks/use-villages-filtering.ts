import { useState, useEffect } from "react";
import { Village } from "@prisma/client";

export function useVillageFiltering(villages: Village[], itemsPerPage: number) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState<Village[]>(villages);

  // Reset to first page when filtered items change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Apply filters whenever searchTerm changes
  useEffect(() => {
    let results = villages;

    // Apply search filter if there's a search term
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      results = villages.filter(
        (village) =>
          village.title?.toLowerCase().includes(searchLower) ||
        village.description?.toLowerCase().includes(searchLower)
      );
    }

    setFilteredItems(results);
  }, [villages, searchTerm]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const pageItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  // Handle page changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Check if any filters are active
  const isActive = searchTerm.trim() !== "";

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm("");
  };

  return {
    filteredItems,
    pageItems,
    currentPage,
    totalPages,
    handlePageChange,
    searchTerm,
    setSearchTerm,
    isActive,
    resetFilters,
  };
}
