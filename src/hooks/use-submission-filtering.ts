"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { Submission } from "@prisma/client";

export interface SubmissionFilteringParams {
  searchTerm?: string | null;
}

interface SubmissionFilteringResult {
  // Filtering
  filters: SubmissionFilteringParams;
  setFilter: (key: keyof SubmissionFilteringParams, value: string | null) => void;
  resetFilters: () => void;
  isActive: boolean;

  // Filtered data
  filteredItems: Submission[];

  // Pagination
  currentPage: number;
  totalPages: number;
  pageItems: Submission[];
  handlePageChange: (page: number) => void;
  handleLimitChange: (limit: number) => void;

  // Search
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export function useSubmissionFiltering(
  items: Submission[],
  defaultLimit = 10,
  initialFilters: SubmissionFilteringParams = {}
): SubmissionFilteringResult {
  // Filtering state
  const [filters, setFilters] =
    useState<SubmissionFilteringParams>(initialFilters);

  // Search term with debounce
  const [searchValue, setSearchValue] = useDebounce(
    filters.searchTerm || "",
    400,
    (value) => {
      setFilters((prev) => ({ ...prev, searchTerm: value || null }));
    }
  );

  // Pagination state
  const [paginationState, setPaginationState] = useState({
    page: 1,
    limit: defaultLimit,
  });

  // Set individual filter
  const setFilter = useCallback(
    (key: keyof SubmissionFilteringParams, value: string | null) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
      // Reset to first page when filters change
      setPaginationState((prev) => ({ ...prev, page: 1 }));
    },
    []
  );

  // Reset all filters
  const resetFilters = useCallback(() => {
    setFilters({});
    setSearchValue("");
    setPaginationState((prev) => ({ ...prev, page: 1 }));
  }, [setSearchValue]);

  // Filter items based on current filters
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Search term filter (searches in lastName, firstName, email, phone, message)
      if (filters.searchTerm && filters.searchTerm.trim() !== "") {
        const searchLower = filters.searchTerm.toLowerCase();
        
        const lastNameMatch = item.lastName.toLowerCase().includes(searchLower);
        const firstNameMatch = item.firstName.toLowerCase().includes(searchLower);
        const emailMatch = item.email.toLowerCase().includes(searchLower);
        const phoneMatch = item.phone?.toLowerCase().includes(searchLower) || false;
        const messageMatch = item.message?.toLowerCase().includes(searchLower) || false;

        if (!lastNameMatch && !firstNameMatch && !emailMatch && !phoneMatch && !messageMatch) {
          return false;
        }
      }

      return true;
    });
  }, [items, filters]);

  // Calculate total pages
  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(filteredItems.length / paginationState.limit));
  }, [filteredItems.length, paginationState.limit]);

  // Ensure current page is valid
  useEffect(() => {
    if (paginationState.page > totalPages) {
      setPaginationState((prev) => ({
        ...prev,
        page: totalPages,
      }));
    }
  }, [totalPages, paginationState.page]);

  // Get current page items
  const pageItems = useMemo(() => {
    const startIndex = (paginationState.page - 1) * paginationState.limit;
    const endIndex = Math.min(
      startIndex + paginationState.limit,
      filteredItems.length
    );
    return filteredItems.slice(startIndex, endIndex);
  }, [filteredItems, paginationState.page, paginationState.limit]);

  // Page change handler
  const handlePageChange = useCallback(
    (newPage: number) => {
      if (newPage > 0 && newPage <= totalPages) {
        setPaginationState((prev) => ({
          ...prev,
          page: newPage,
        }));
      }
    },
    [totalPages]
  );

  // Limit change handler
  const handleLimitChange = useCallback((newLimit: number) => {
    if (newLimit > 0) {
      setPaginationState({
        limit: newLimit,
        page: 1,
      });
    }
  }, []);

  const isActive = useMemo(() => {
    return Object.values(filters).some((value) => value);
  }, [filters]);

  return {
    // Filtering
    filters,
    setFilter,
    resetFilters,
    isActive,

    // Filtered data
    filteredItems,

    // Pagination
    currentPage: paginationState.page,
    totalPages,
    pageItems,
    handlePageChange,
    handleLimitChange,

    // Search
    searchTerm: searchValue,
    setSearchTerm: setSearchValue,
  };
}