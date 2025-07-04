"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function SearchBar({ dictionary }: { dictionary: any }) {
  const router = useRouter();
  const { locale } = useParams();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const hasSearchedRef = useRef(false);

  // Scroll to results when search query changes
  useEffect(() => {
    if (query && hasSearchedRef.current) {
      const timer = setTimeout(() => {
        const resultsElement = document.getElementById('search-results-section');
        if (resultsElement) {
          resultsElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }
        hasSearchedRef.current = false;
      }, 100); // Small delay to ensure content is rendered

      return () => clearTimeout(timer);
    }
  }, [query]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchQuery = formData.get("search") as string;
    
    if (searchQuery.trim()) {
      hasSearchedRef.current = true; // Mark that we're performing a search
      const params = new URLSearchParams(searchParams);
      params.set("q", searchQuery);
      router.push(`?${params.toString()}`);
    } else {
      const params = new URLSearchParams(searchParams);
      params.delete("q");
      router.push(`?${params.toString()}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
      <div
        className="flex border-2 border-website-primary rounded-full "
        dir="ltr"
      >
        <Input
          type="text"
          name="search"
          placeholder={
            dictionary.mediaLibrary.searchPlaceholder || "Search resources..."
          }
          className="data-[placeholder]:text-white placeholder:text-white/70 text-base text-white/90 w-full py-3 px-4 ring-0 focus:ring-0 focus:border-0 focus-visible:outline-0 focus-visible:ring-0 focus-visible:border-none border-none outline-none focus:outline-none"
          defaultValue={query}
          dir={locale === "ar" ? "rtl" : "ltr"}
        />
        <Button
          size="lg"
          type="submit"
          className="bg-website-primary hover:bg-website-primary/90 text-white rounded-r-full px-6"
        >
          {dictionary.mediaLibrary.search || "Search"}
        </Button>
      </div>
    </form>
  );
}