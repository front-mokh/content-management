"use client";
import { useCallback, useMemo } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Type } from "@prisma/client";

import { FullResource } from "@/lib/types";
import clsx from "clsx";
import ResourceGrid from "../../ResourceGrid";
import Pagination from "../../Pagination";

export default function CategoryPageContent({
  resources,
  types,
  dictionary,
}: {
  categoryId: string;
  resources: FullResource[];
  types: Type[];
  recentlyAdded: FullResource[];
  mostPopular: FullResource[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dictionary: any;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { locale } = useParams();

  const query = searchParams.get("q") || "";
  const typeId = searchParams.get("type") || "all";
  const sortBy = searchParams.get("sortBy") || "publishedAt";
  const pageParam = searchParams.get("page") || "1";
  const currentPage = parseInt(pageParam, 10);

  // Items per page
  const ITEMS_PER_PAGE = 9;

  // Filter resources based on search query and type
  const filteredResources = useMemo(() => {
    let filtered = [...resources];

    // Filter by type if not "all"
    if (typeId !== "all") {
      filtered = filtered.filter((resource) => resource.typeId === typeId);
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
  }, [resources, typeId, query]);

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

  // Handle type change
  const handleTypeChange = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set("type", value);
      params.set("page", "1"); // Reset to first page on type change
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

  // Filter types to only include those that have resources in this category
  const categoryTypes = useMemo(() => {
    const typeIds = new Set(resources.map((resource) => resource.typeId));
    return types.filter((type) => typeIds.has(type.id));
  }, [resources, types]);

  return (
    <>
      {/* Filter Tabs and Sort Options */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <Tabs
            defaultValue={typeId}
            onValueChange={handleTypeChange}
            className="w-full md:w-auto overflow-x-auto"
            dir={locale === "ar" ? "rtl" : "ltr"}
          >
            <TabsList className="h-auto flex-nowrap bg-gradient-to-br from-website-secondary/90 to-website-secondary/80 shadow-lg border border-website-primary/20 text-white/90">
              <TabsTrigger
                value="all"
                className="px-4 py-2 data-[state=active]:bg-website-primary data-[state=active]:text-white"
              >
                {dictionary.mediaLibrary.allTypes || "All Types"}
              </TabsTrigger>

              {categoryTypes.map((type) => (
                <TabsTrigger
                  key={type.id}
                  value={type.id}
                  className="px-4 py-2 data-[state=active]:bg-website-primary data-[state=active]:text-white"
                >
                  {type.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-2">
            <span className="text-website-text/80">
              {dictionary.mediaLibrary.sortBy}
            </span>
            <Select
              defaultValue={sortBy}
              onValueChange={handleSortChange}
              dir={locale === "ar" ? "rtl" : "ltr"}
            >
              <SelectTrigger className="w-[180px] border-website-primary/60">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="publishedAt">
                  {dictionary.mediaLibrary.sortByOptions.newest}
                </SelectItem>
                <SelectItem value="oldest">
                  {dictionary.mediaLibrary.sortByOptions.oldest}
                </SelectItem>
                <SelectItem value="views">
                  {dictionary.mediaLibrary.sortByOptions.mostViewed}
                </SelectItem>
                <SelectItem value="upvotes">
                  {dictionary.mediaLibrary.sortByOptions.mostUpvoted}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Resources Section */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2
            className={clsx(
              "heading text-3xl font-bold text-website-text border-website-primary",
              {
                "border-r-4 pr-3": locale === "ar",
                "border-l-4 pl-3": locale !== "ar",
              }
            )}
          >
            {query
              ? `${dictionary.mediaLibrary.searchResults + ` "${query}"`} (${
                  sortedResources.length
                })`
              : typeId !== "all"
              ? `${
                  types.find((t) => t.id === typeId)?.label ||
                  dictionary.mediaLibrary.allTypes
                } (${sortedResources.length})`
              : `${dictionary.mediaLibrary.allResources || "All Resources"} (${
                  sortedResources.length
                })`}
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
    </>
  );
}
