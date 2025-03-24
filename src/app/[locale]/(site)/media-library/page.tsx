import { Suspense } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import CategoryCarousel from "./CategoryCarousel";
import ResourceGrid from "./ResourceGrid";
import {
  getAllCategories,
  getFeaturedResources,
  getPopularResources,
  getRecentResources,
} from "@/lib/services";
import Link from "next/link";
import SearchBar from "./SearchBar";
import ContributeCTA from "./ContributeCTA";
import CategoryCard from "./CategoryCard";
import { getDictionary } from "@/lib/i18n";

export default async function MediaLibraryPage({
  params,
}: {
  params: { locale: string };
}) {
  const dictionary = await getDictionary(params.locale);

  const categoriesPromise = getAllCategories();
  const featuredPromise = getFeaturedResources();
  const recentPromise = getRecentResources(8);
  const popularPromise = getPopularResources(8);

  const [categories, featuredByCategory, recentlyAdded, mostPopular] =
    await Promise.all([
      categoriesPromise,
      featuredPromise,
      recentPromise,
      popularPromise,
    ]);

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="relative rounded-lg overflow-hidden mb-12 bg-website-accent">
        <div className="relative z-20 py-16 px-8 md:py-24 md:px-12 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Kabyle Heritage Media Library
          </h1>
          <p className="text-lg text-white/90 mb-8">
            Discover the rich cultural heritage of Kabylia through our extensive
            collection of texts, audio recordings, videos, and images.
          </p>
          <SearchBar />
        </div>
      </section>

      {/* Categories Section */}
      <section className="mb-16">
        <div className="flex items-center justify-center mb-6">
          <h2 className="text-3xl font-bold text-website-text">
            {dictionary.mediaLibrary.browseCategories}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Recently Added Section */}
      <section className="mb-16">
        <div className="flex items-center justify-center mb-6">
          <h2 className="text-3xl font-bold text-website-text">
            {dictionary.mediaLibrary.recentlyAdded}
          </h2>
        </div>
        <ResourceGrid resources={recentlyAdded} />
      </section>

      {/* Most Popular Section */}
      <section className="mb-16">
        <div className="flex items-center justify-center mb-6">
          <h2 className="text-3xl font-bold text-website-text">
            {dictionary.mediaLibrary.mostPopular}
          </h2>
        </div>
        <ResourceGrid resources={mostPopular} />
      </section>

      {/* Contribute CTA */}
      <ContributeCTA />
    </main>
  );
}
