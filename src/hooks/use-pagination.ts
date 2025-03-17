"use client";
import { useState, useMemo, useCallback } from "react";

interface PaginationResult<T> {
  currentPage: number;
  totalPages: number;
  pageItems: T[];
  handlePageChange: (page: number) => void;
  handleLimitChange: (limit: number) => void;
}

export function usePagination<T>(
  items: T[],
  defaultLimit = 10
): PaginationResult<T> {
  const [paginationState, setPaginationState] = useState({
    page: 1,
    limit: defaultLimit,
  });

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(items.length / paginationState.limit));
  }, [items.length, paginationState.limit]);

  useMemo(() => {
    if (paginationState.page > totalPages) {
      setPaginationState((prev) => ({
        ...prev,
        page: totalPages,
      }));
    }
  }, [totalPages, paginationState.page]);

  const pageItems = useMemo(() => {
    const startIndex = (paginationState.page - 1) * paginationState.limit;
    const endIndex = Math.min(startIndex + paginationState.limit, items.length);
    return items.slice(startIndex, endIndex);
  }, [items, paginationState.page, paginationState.limit]);

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

  const handleLimitChange = useCallback((newLimit: number) => {
    if (newLimit > 0) {
      setPaginationState({
        limit: newLimit,
        page: 1,
      });
    }
  }, []);

  return {
    currentPage: paginationState.page,
    totalPages,
    pageItems,
    handlePageChange,
    handleLimitChange,
  };
}
