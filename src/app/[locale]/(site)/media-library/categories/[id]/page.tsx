import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getCategoryById,
  getPublishedResourcesByCategory,
  getRecentResourcesByCategory,
  getPopularResourcesByCategory,
  getAllTypes,
} from "@/lib/services";
import { getDictionary } from "@/lib/i18n";
import CategoryPageContent from "./CategoryPageContent";
import Image from "next/image";
import { notFound } from "next/navigation";
import SearchBar from "../../SearchBar";
import ContributeCTA from "../../ContributeCTA";
import LibraryContentSkeleton from "../../LibraryContentSkeleton";

export default async function CategoryPage({
  params,
}: {
  params: { locale: string; id: string };
}) {
  const dictionary = await getDictionary(params.locale);

  try {
    const categoryPromise = getCategoryById(params.id);
    const resourcesPromise = getPublishedResourcesByCategory(params.id);
    const typesPromise = getAllTypes();
    const recentPromise = getRecentResourcesByCategory(params.id, 12);
    const popularPromise = getPopularResourcesByCategory(params.id, 12);

    const [category, resources, types, recentlyAdded, mostPopular] =
      await Promise.all([
        categoryPromise,
        resourcesPromise,
        typesPromise,
        recentPromise,
        popularPromise,
      ]);

    if (!category) {
      return notFound();
    }

    return (
      <main className="container mx-auto px-4 py-8">
        <section className="relative rounded-lg overflow-hidden mb-12 bg-gradient-to-br from-website-secondary to-website-secondary/90 shadow-lg border border-website-primary/20">
          {category.thumbnail && (
            <>
              <div className="absolute inset-0 z-10">
                <Image
                  src={category.thumbnail}
                  alt={category.label}
                  className="object-cover object-center"
                  fill
                  priority
                />
              </div>
              <div className="absolute inset-0 z-10 bg-black/40"></div>
            </>
          )}
          <div className="w-full text-center relative z-20 py-20 px-8 md:py-24 md:px-12">
            <h1 className="heading text-white/90 text-6xl md:text-5xl font-bold mb-4">
              {category.label}
            </h1>
            <p className="text-[20px] text-white/80 mb-8 max-w-3xl mx-auto">
              {category.description || dictionary.mediaLibrary.description}
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
          <CategoryPageContent
            categoryId={params.id}
            resources={resources}
            types={types}
            recentlyAdded={recentlyAdded}
            mostPopular={mostPopular}
            dictionary={dictionary}
          />
        </Suspense>

        {/* Contribute CTA */}
        <ContributeCTA dictionary={dictionary} />
      </main>
    );
  } catch (error) {
    console.error("Error loading category page:", error);
    return notFound();
  }
}
