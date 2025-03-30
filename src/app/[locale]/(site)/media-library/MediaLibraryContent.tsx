"use client";
import { useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Category, Type } from "@prisma/client";
import ResourceGrid from "./ResourceGrid";
import Pagination from "./Pagination";
import TypeChips from "./TypeChips";
import { FullResource } from "@/lib/types";

export default function MediaLibraryContent({
  resources,
  categories,
  types,
  recentlyAdded,
  mostPopular,
  dictionary,
}: {
  resources: FullResource[];
  categories: Category[];
  types: Type[];
  recentlyAdded: FullResource[];
  mostPopular: FullResource[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dictionary: any;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.get("q") || "";
  const categoryId = searchParams.get("category") || "all";
  const sortBy = searchParams.get("sortBy") || "publishedAt";
  const pageParam = searchParams.get("page") || "1";
  const currentPage = parseInt(pageParam, 10);
  const selectedTypesParam = searchParams.get("types") || "";
  const selectedTypes = selectedTypesParam ? selectedTypesParam.split(",") : [];

  // Items per page
  const ITEMS_PER_PAGE = 12;

  // Filter resources based on search query, category and types
  const filteredResources = useMemo(() => {
    let filtered = [...resources];

    // Filter by category if not "all"
    if (categoryId !== "all") {
      filtered = filtered.filter(
        (resource) => resource.categoryId === categoryId
      );
    }

    // Filter by types if any selected
    if (selectedTypes.length > 0) {
      filtered = filtered.filter((resource) =>
        selectedTypes.includes(resource.typeId)
      );
    }

    // Filter by search query if present
    if (query) {
      filtered = filtered.filter((resource) => {
        const matchesTitle = resource.title
          .toLowerCase()
          .includes(query.toLowerCase());
        const matchesDescription = resource.description
          .toLowerCase()
          .includes(query.toLowerCase());

        // Check author name if author exists
        const matchesAuthor = resource.author
          ? `${resource.author.firstName} ${resource.author.lastName}`
              .toLowerCase()
              .includes(query.toLowerCase())
          : false;

        return matchesTitle || matchesDescription || matchesAuthor;
      });
    }

    return filtered;
  }, [resources, categoryId, selectedTypes, query]);

  // Sort filtered resources
  const sortedResources = useMemo(() => {
    return [...filteredResources].sort((a, b) => {
      if (sortBy === "publishedAt") {
        return (
          new Date(b.publishedAt || b.createdAt).getTime() -
          new Date(a.publishedAt || a.createdAt).getTime()
        );
      } else if (sortBy === "oldest") {
        return (
          new Date(a.publishedAt || a.createdAt).getTime() -
          new Date(b.publishedAt || b.createdAt).getTime()
        );
      } else if (sortBy === "views") {
        return Number(b.views) - Number(a.views);
      } else if (sortBy === "upvotes") {
        return Number(b.upvotes) - Number(a.upvotes);
      }
      return 0;
    });
  }, [filteredResources, sortBy]);

  // Calculate pagination
  const totalPages = Math.ceil(sortedResources.length / ITEMS_PER_PAGE);

  // Get current page items
  const currentPageItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedResources.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [sortedResources, currentPage, ITEMS_PER_PAGE]);

  // Handle category change
  const handleCategoryChange = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set("category", value);
      params.set("page", "1"); // Reset to first page on category change
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  // Handle sort change
  const handleSortChange = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set("sortBy", value);
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  // Handle page change
  const handlePageChange = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", page.toString());
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  // Handle type toggle
  const handleTypeToggle = useCallback(
    (typeId: string) => {
      const params = new URLSearchParams(searchParams);
      const newSelectedTypes = [...selectedTypes];

      const typeIndex = newSelectedTypes.indexOf(typeId);
      if (typeIndex === -1) {
        newSelectedTypes.push(typeId);
      } else {
        newSelectedTypes.splice(typeIndex, 1);
      }

      if (newSelectedTypes.length > 0) {
        params.set("types", newSelectedTypes.join(","));
      } else {
        params.delete("types");
      }

      params.set("page", "1"); // Reset to first page on type change
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams, selectedTypes]
  );

  // Determine which content to show
  const showFilteredResults =
    query || categoryId !== "all" || selectedTypes.length > 0;

  return (
    <>
      {/* Filter Tabs and Sort Options */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <Tabs
            defaultValue={categoryId}
            onValueChange={handleCategoryChange}
            className="w-full md:w-auto overflow-x-auto"
          >
            <TabsList className="h-auto flex-nowrap bg-gradient-to-br from-website-secondary/90 to-website-secondary/80 shadow-lg border border-website-primary/20 text-white/90">
              <TabsTrigger
                value="all"
                className="px-4 py-2 data-[state=active]:bg-website-primary data-[state=active]:text-white"
              >
                {dictionary.mediaLibrary.allCategories || "All"}
              </TabsTrigger>

              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="px-4 py-2 data-[state=active]:bg-website-primary data-[state=active]:text-white"
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-2">
            <span className="text-website-text/80">
              {dictionary.mediaLibrary.sortBy || "Sort by:"}
            </span>
            <Select defaultValue={sortBy} onValueChange={handleSortChange}>
              <SelectTrigger className="w-[180px] border-website-primary/60">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="publishedAt">
                  {dictionary.mediaLibrary.newest || "Newest"}
                </SelectItem>
                <SelectItem value="oldest">
                  {dictionary.mediaLibrary.oldest || "Oldest"}
                </SelectItem>
                <SelectItem value="views">
                  {dictionary.mediaLibrary.mostViewed || "Most Viewed"}
                </SelectItem>
                <SelectItem value="upvotes">
                  {dictionary.mediaLibrary.mostUpvoted || "Most Upvoted"}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Type filter chips */}
        {categoryId !== "all" && (
          <TypeChips
            types={types}
            categoryId={categoryId}
            selectedTypes={selectedTypes}
            onTypeToggle={handleTypeToggle}
            dictionary={dictionary}
          />
        )}
      </div>

      {/* Resource Grid */}
      {showFilteredResults ? (
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="heading text-3xl font-bold text-website-text border-l-4 border-website-primary pl-3">
              {query
                ? `${
                    dictionary.mediaLibrary.searchResults +
                      " for " +
                      `"${query}"` || "Search Results"
                  } (${sortedResources.length})`
                : `${
                    categories.find((c) => c.id === categoryId)?.label ||
                    dictionary.mediaLibrary.allCategories
                  } (${sortedResources.length})`}
            </h2>
          </div>
          {sortedResources.length > 0 ? (
            <>
              <ResourceGrid resources={currentPageItems} />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                dictionary={dictionary}
              />
            </>
          ) : (
            <div className="text-center py-12 bg-website-accent/5 rounded-lg border border-website-primary/10">
              <p className="text-xl text-gray-500">
                {dictionary.mediaLibrary.noResults ||
                  "No resources found matching your criteria."}
              </p>
            </div>
          )}
        </section>
      ) : (
        <>
          {/* Recently Added Section */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="heading text-3xl font-bold text-website-text border-l-4 border-website-primary pl-3">
                {dictionary.mediaLibrary.recentlyAdded || "Recently Added"}
              </h2>
            </div>
            <ResourceGrid resources={recentlyAdded} />
          </section>

          {/* Most Popular Section */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="heading text-3xl font-bold text-website-text border-l-4 border-website-primary pl-3">
                {dictionary.mediaLibrary.mostPopular || "Most Popular"}
              </h2>
            </div>
            <ResourceGrid resources={mostPopular} />
          </section>
        </>
      )}
    </>
  );
}
