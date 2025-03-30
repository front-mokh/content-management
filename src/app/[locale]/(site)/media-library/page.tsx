import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getAllCategories,
  getPublishedResources,
  getRecentResources,
  getPopularResources,
  getAllTypes,
} from "@/lib/services";
import SearchBar from "./SearchBar";
import ContributeCTA from "./ContributeCTA";
import { getDictionary } from "@/lib/i18n";
import MediaLibraryContent from "./MediaLibraryContent";
import LibraryContentSkeleton from "./LibraryContentSkeleton";
import Image from "next/image";

export default async function MediaLibraryPage({
  params,
}: {
  params: { locale: string };
}) {
  const dictionary = await getDictionary(params.locale);

  const resourcesPromise = getPublishedResources();
  const categoriesPromise = getAllCategories();
  const typesPromise = getAllTypes();
  const recentPromise = getRecentResources(12);
  const popularPromise = getPopularResources(12);

  const [resources, categories, types, recentlyAdded, mostPopular] =
    await Promise.all([
      resourcesPromise,
      categoriesPromise,
      typesPromise,
      recentPromise,
      popularPromise,
    ]);

  return (
    <main className="container mx-auto px-4 py-8">
      <section className="relative rounded-lg overflow-hidden mb-12 bg-gradient-to-br from-website-secondary to-website-secondary/90 shadow-lg border border-website-primary/20">
        <div className="w-full text-center relative z-20 py-16 px-8 md:py-24 md:px-12">
          <h1 className="heading text-white/90 text-6xl md:text-5xl font-bold  mb-4">
            Kabyle Heritage Media Library
          </h1>
          <p className="text-[20px] text-white/80 mb-8 max-w-3xl mx-auto">
            Discover the rich cultural heritage of Kabylia through our extensive
            collection of texts, audio recordings, videos, and images.
          </p>
          <Suspense
            fallback={
              <Skeleton className="h-12 w-full max-w-2xl mx-auto rounded-lg" />
            }
          >
            <SearchBar dictionary={dictionary} />
          </Suspense>
        </div>
      </section>

      {/* Media Library Content */}
      <Suspense fallback={<LibraryContentSkeleton />}>
        <MediaLibraryContent
          resources={resources}
          categories={categories}
          types={types}
          recentlyAdded={recentlyAdded}
          mostPopular={mostPopular}
          dictionary={dictionary}
        />
      </Suspense>

      {/* Contribute CTA */}
      <ContributeCTA />
    </main>
  );
}
