"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { FullResource } from "@/lib/types";

export interface ResourceFilteringParams {
  searchTerm?: string | null;
  categoryId?: string | null;
  typeId?: string | null;
  authorId?: string | null;
  handlerId?: string | null;
}

interface ResourceFilteringResult<T> {
  // Filtering
  filters: ResourceFilteringParams;
  setFilter: (key: keyof ResourceFilteringParams, value: string | null) => void;
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

export function useResourceFiltering<T extends FullResource>(
  items: T[],
  defaultLimit = 10,
  initialFilters: ResourceFilteringParams = {}
): ResourceFilteringResult<T> {
  // Filtering state
  const [filters, setFilters] =
    useState<ResourceFilteringParams>(initialFilters);

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
    (key: keyof ResourceFilteringParams, value: string | null) => {
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
      // Search term filter (searches in title and description)
      if (filters.searchTerm && filters.searchTerm.trim() !== "") {
        const searchLower = filters.searchTerm.toLowerCase();
        const titleMatch = item.title.toLowerCase().includes(searchLower);
        const descriptionMatch =
          item.description?.toLowerCase().includes(searchLower) || false;

        if (!titleMatch && !descriptionMatch) {
          return false;
        }
      }

      // Category filter
      if (filters.categoryId && item.categoryId !== filters.categoryId) {
        return false;
      }

      // Type filter
      if (filters.typeId && item.typeId !== filters.typeId) {
        return false;
      }

      // Author filter
      if (filters.authorId && item.authorId !== filters.authorId) {
        return false;
      }

      // Handler filter
      if (filters.handlerId && item.handlerId !== filters.handlerId) {
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
