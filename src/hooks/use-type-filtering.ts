// hooks/use-type-filtering.ts
"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { Type } from "@prisma/client";

export interface TypeFilteringParams {
  searchTerm?: string | null;
  categoryId?: string | null;
}

interface TypeFilteringResult<T> {
  // Filtering
  filters: TypeFilteringParams;
  setFilter: (key: keyof TypeFilteringParams, value: string | null) => void;
  resetFilters: () => void;
  isActive: boolean;

  // Filtered data
  filteredItems: T[];

  // Pagination
  currentPage: number;
  totalPages: number;
  pageItems: T[];
  handlePageChange: (page: number) => void;
  handleLimitChange: (limit: number) => void;

  // Search
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export function useTypeFiltering<T extends Type>(
  items: T[],
  defaultLimit = 10,
  initialFilters: TypeFilteringParams = {}
): TypeFilteringResult<T> {
  // Filtering state
  const [filters, setFilters] = useState<TypeFilteringParams>(initialFilters);

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
    (key: keyof TypeFilteringParams, value: string | null) => {
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
      // Search term filter (searches in label and description)
      if (filters.searchTerm && filters.searchTerm.trim() !== "") {
        const searchLower = filters.searchTerm.toLowerCase();
        const labelMatch = item.label.toLowerCase().includes(searchLower);
        const descriptionMatch =
          item.description?.toLowerCase().includes(searchLower) || false;

        if (!labelMatch && !descriptionMatch) {
          return false;
        }
      }

      // Category filter
      if (filters.categoryId && item.categoryId !== filters.categoryId) {
        return false;
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
