"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Grid3x3, List } from "lucide-react";
import FilterPanel from "../FilterPanel";
import ResourceGrid from "../ResourceGrid";
import ResourceList from "../ResourceList";
import { Pagination } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";

export default function CategoryPage({
  initialCategory,
  initialTypes,
  initialResources,
  initialPagination,
}: {
  initialCategory: any;
  initialTypes: any[];
  initialResources: any[];
  initialPagination: any;
}) {
  const searchParams = useSearchParams();
  const [resources, setResources] = useState(initialResources);
  const [pagination, setPagination] = useState(initialPagination);
  const [types, setTypes] = useState(initialTypes);
  const [isLoading, setIsLoading] = useState(false);

  const category = initialCategory;
  const viewMode = searchParams.get("view") || "grid";
  const page = searchParams.get("page") || "1";
  const typeFilter = searchParams.get("type") || "";
  const sortOption = searchParams.get("sort") || "publishedAt";

  useEffect(() => {
    async function fetchResources() {
      setIsLoading(true);
      try {
        const params = new URLSearchParams({
          category: category.label.toLowerCase(),
          page,
          ...(typeFilter && { type: typeFilter }),
          sort: sortOption,
        });

        const response = await fetch(`/api/resources?${params.toString()}`);
        const data = await response.json();

        setResources(data.resources);
        setPagination(data.pagination);
        setTypes(data.types);
      } catch (error) {
        console.error("Failed to fetch resources", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchResources();
  }, [page, typeFilter, sortOption, category.label]);

  const getUrlWithParams = (newParams: Record<string, string>) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    return `/media-library/${category.label.toLowerCase()}?${params.toString()}`;
  };

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Category Header (Same as before) */}
      <section className="relative rounded-lg overflow-hidden mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-transparent z-10"></div>
        <img
          src={`/images/categories/${category.label.toLowerCase()}-banner.jpg`}
          alt={`${category.label} Category`}
          className="object-cover w-full h-64 md:h-80"
        />
        <div className="relative z-20 p-8 md:p-12 max-w-3xl">
          <h1 className="text-4xl font-bold text-white mb-4">
            {category.label}
          </h1>
          <p className="text-lg text-white/90">{category.description}</p>
          <div className="mt-4 bg-white/20 backdrop-blur-sm rounded-full py-1 px-3 text-sm text-white inline-block">
            {pagination.totalResources} resources available
          </div>
        </div>
      </section>

      {/* Filter and Resource Display */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filter Panel */}
        <div className="w-full md:w-64 flex-shrink-0">
          <FilterPanel
            types={types}
            category={category.label.toLowerCase()}
            constructUrl={getUrlWithParams}
          />
        </div>

        {/* Resource Display */}
        <div className="flex-grow">
          {/* View Controls */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">
              {typeFilter
                ? `${
                    types.find((t) => t.id === typeFilter)?.label || ""
                  } Resources`
                : "All Resources"}
            </h2>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                asChild
              >
                <a href={getUrlWithParams({ view: "grid" })}>
                  <Grid3x3 className="h-4 w-4 mr-1" />
                  Grid
                </a>
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                asChild
              >
                <a href={getUrlWithParams({ view: "list" })}>
                  <List className="h-4 w-4 mr-1" />
                  List
                </a>
              </Button>
            </div>
          </div>

          {isLoading ? (
            <Skeleton className="w-full h-64" />
          ) : viewMode === "grid" ? (
            <ResourceGrid resources={resources} />
          ) : (
            <ResourceList resources={resources} />
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                createHref={(pageNum) =>
                  getUrlWithParams({ page: pageNum.toString() })
                }
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
