"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams, useSearchParams, useRouter, usePathname } from "next/navigation"; 

import { AuthorCard } from "./AuthorCard";
import { StaticFeaturedAuthorHero } from "./static-featured-author-hero";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Author } from "@prisma/client";

// Pagination component with RTL support
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
  dictionary: any;
  locale: string;
}) => {
  // Check if the current locale is RTL (Arabic)
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
  dictionary: any;
}) => {
  return (
    <div className="relative max-w-md mx-auto mb-8">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={dictionary.authors.searchPlaceholder || "Search authors..."}
        className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-200 focus:border-website-primary focus:ring-2 focus:ring-website-primary/20 transition-all duration-200"
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
    </div>
  );
};

export default function AuthorsPage({
  authors,
  dictionary,
}: {
  authors: (Author & { resourceCount: number })[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dictionary: any;
}) {
  const AUTHORS_PER_PAGE = 9;
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname(); 

  const locale = params.locale || "en";
  const pageParam = searchParams.get("page");
  const searchParam = searchParams.get("search");

  const [currentPage, setCurrentPage] = useState(
    pageParam ? parseInt(pageParam) : 1
  );
  const [searchQuery, setSearchQuery] = useState(searchParam || "");
  const [filteredAuthors, setFilteredAuthors] = useState(authors);

  // Filter authors based on search query
  useEffect(() => {
    if (!searchQuery) {
      setFilteredAuthors(authors);
    } else {
      const filtered = authors.filter((author) =>
        `${author.firstName} ${author.lastName}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
      setFilteredAuthors(filtered);
      // Reset to page 1 when search changes
      setCurrentPage(1);
    }
  }, [searchQuery, authors]);

  // Update URL when page or search changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (currentPage > 1) params.set("page", currentPage.toString());
    if (searchQuery) params.set("search", searchQuery);

    const query = params.toString();
    const url = `${pathname}${query ? `?${query}` : ""}`;

    // Update URL without full page reload
    router.push(url, { scroll: false });
  }, [currentPage, searchQuery, locale, router, pathname]);

  const totalPages = Math.ceil(filteredAuthors.length / AUTHORS_PER_PAGE);
  const paginatedAuthors = filteredAuthors.slice(
    (currentPage - 1) * AUTHORS_PER_PAGE,
    currentPage * AUTHORS_PER_PAGE
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
      <StaticFeaturedAuthorHero
        dictionary={dictionary}
        locale={locale.toString()}
      />

      {/* Main Authors Grid Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-website-primary mb-4">
              {dictionary.authors.allAuthorsTitle}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {dictionary.authors.allAuthorsDescription}
            </p>
          </motion.div>

          {/* Search Bar */}
          <SearchBar
            query={searchQuery}
            setQuery={handleSearchChange}
            dictionary={dictionary}
          />

          {paginatedAuthors.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-gray-700">
                {searchQuery
                  ? dictionary.authors.noSearchResults ||
                    "No authors matching your search"
                  : dictionary.authors.noAuthors}
              </h3>
              <p className="text-gray-500 mt-2">
                {searchQuery
                  ? dictionary.authors.tryDifferentSearch ||
                    "Try a different search term"
                  : dictionary.authors.checkBackSoon}
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedAuthors.map((author, index) => (
                  <motion.div
                    key={author.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <AuthorCard author={author} dictionary={dictionary} />
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
            {dictionary.authors.ctaTitle}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            {dictionary.authors.ctaDescription}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href={`/${locale}/contribution`}
              className="bg-website-accent hover:bg-website-accent/90 text-website-text px-6 py-3 rounded-lg font-medium inline-block shadow-lg hover:shadow-website-accent/50 transition-all duration-300 transform hover:-translate-y-1"
            >
              {dictionary.authors.contributeButton}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="border border-website-secondary text-website-secondary hover:bg-website-secondary/10 px-6 py-3 rounded-lg font-medium inline-block transition-all duration-300 transform hover:-translate-y-1"
            >
              {dictionary.authors.contactButton}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}