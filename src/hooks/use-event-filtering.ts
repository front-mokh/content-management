import { useState, useEffect } from "react";
import { Event } from "@prisma/client";

export function useEventFiltering(events: Event[], itemsPerPage: number) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState<Event[]>(events);

  // Reset to first page when filtered items change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Apply filters whenever searchTerm changes
  useEffect(() => {
    let results = events;

    // Apply search filter if there's a search term
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      results = events.filter(
        (event) =>
          event.title?.toLowerCase().includes(searchLower) ||
          event.description?.toLowerCase().includes(searchLower)
      );
    }

    setFilteredItems(results);
  }, [events, searchTerm]);

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
