"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Village } from "@prisma/client";
import Link from "next/link";
import { useParams, useSearchParams, useRouter } from "next/navigation";

import { VillageCard } from "./VillageCard";

import { StaticFeaturedVillageHero } from "./StaticFeaturedVillageHero";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  dictionary,
  locale,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dictionary: any;
  locale: string;
}) => {
  const isRTL = locale === "ar";
  return (
    <div className="flex justify-center items-center mt-10 gap-2">
      {/* Left Button - Previous for LTR, Next for RTL */}
      <button
        onClick={() => onPageChange(isRTL ? currentPage + 1 : currentPage - 1)}
        disabled={isRTL ? currentPage === totalPages : currentPage === 1}
        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label={isRTL ? dictionary.common.next : dictionary.common.previous}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 rounded-full ${
              currentPage === page
                ? "bg-website-primary text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Right Button - Next for LTR, Previous for RTL */}
      <button
        onClick={() => onPageChange(isRTL ? currentPage - 1 : currentPage + 1)}
        disabled={isRTL ? currentPage === 1 : currentPage === totalPages}
        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label={isRTL ? dictionary.common.previous : dictionary.common.next}
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
};

// Search component
const SearchBar = ({
  query,
  setQuery,
  dictionary,
}: {
  query: string;
  setQuery: (query: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dictionary: any;
}) => {
  return (
    <div className="relative max-w-md mx-auto mb-8">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={dictionary.villages.searchPlaceholder || "Search villages..."}
        className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-200 focus:border-website-primary focus:ring-2 focus:ring-website-primary/20 transition-all duration-200"
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
    </div>
  );
};

export default function VillagesPage({
    villages,
  dictionary,
}: {
  villages: Village[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dictionary: any;
}) {
  const VILLAGES_PER_PAGE = 9;
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const locale = params.locale || "en";
  const pageParam = searchParams.get("page");
  const searchParam = searchParams.get("search");

  const [currentPage, setCurrentPage] = useState(
    pageParam ? parseInt(pageParam) : 1
  );
  const [searchQuery, setSearchQuery] = useState(searchParam || "");
  const [filteredVillages, setFilteredVillages] = useState(villages);

  // Filter events based on search query
  useEffect(() => {
    if (!searchQuery) {
        setFilteredVillages(villages);
    } else {
      const filtered = villages.filter((event) =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredVillages(filtered);
      // Reset to page 1 when search changes
      setCurrentPage(1);
    }
  }, [searchQuery, villages]);

  // Update URL when page or search changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (currentPage > 1) params.set("page", currentPage.toString());
    if (searchQuery) params.set("search", searchQuery);

    const query = params.toString();
    const url = `/${locale}/villages${query ? `?${query}` : ""}`;

    // Update URL without full page reload
    router.push(url, { scroll: false });
  }, [currentPage, searchQuery, locale, router]);

  const totalPages = Math.ceil(filteredVillages.length / VILLAGES_PER_PAGE);
  const paginatedVillages = filteredVillages.slice(
    (currentPage - 1) * VILLAGES_PER_PAGE,
    currentPage * VILLAGES_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-website-background">
      {/* Hero Section */}
      <StaticFeaturedVillageHero
        dictionary={dictionary}
        locale={locale.toString()}
      />

      {/* Main Events Grid Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-website-primary mb-4">
              {dictionary.villages.allVillagesTitle}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {dictionary.villages.allVillagesDescription}
            </p>
          </motion.div>

          {/* Search Bar */}
          <SearchBar
            query={searchQuery}
            setQuery={handleSearchChange}
            dictionary={dictionary}
          />

          {paginatedVillages.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-gray-700">
                {searchQuery
                  ? dictionary.villages.noSearchResults ||
                    "No villages matching your search"
                  : dictionary.villages.noVillages}
              </h3>
              <p className="text-gray-500 mt-2">
                {searchQuery
                  ? dictionary.villages.tryDifferentSearch ||
                    "Try a different search term"
                  : dictionary.villages.checkBackSoon}
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedVillages.map((village, index) => (
                  <motion.div
                    key={village.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link href={`/${locale}/villages/${village.id}`}>
                      <VillageCard village={village} dictionary={dictionary} />
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  dictionary={dictionary}
                  locale={locale.toString()}
                />
              )}
            </>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-website-secondary/10 to-website-accent/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-website-primary mb-6">
            {dictionary.villages.ctaTitle}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            {dictionary.villages.ctaDescription}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href={`/${locale}/contribution`}
              className="bg-website-accent hover:bg-website-accent/90 text-website-text px-6 py-3 rounded-lg font-medium inline-block shadow-lg hover:shadow-website-accent/50 transition-all duration-300 transform hover:-translate-y-1"
            >
              {dictionary.villages.contributeButton}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="border border-website-secondary text-website-secondary hover:bg-website-secondary/10 px-6 py-3 rounded-lg font-medium inline-block transition-all duration-300 transform hover:-translate-y-1"
            >
              {dictionary.villages.contactButton}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
