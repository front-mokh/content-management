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
import clsx from "clsx";
import Link from "next/link";

export default async function MediaLibraryPage({
  params,
}: {
  params: { locale: string };
}) {
  const dictionary = await getDictionary(params.locale);

  const resourcesPromise = getPublishedResources();
  const categoriesPromise = getAllCategories();
  const typesPromise = getAllTypes();
  const recentPromise = getRecentResources(12); // i modified in them to enable them to get only published resources
  const popularPromise = getPopularResources(12); // i modified in them to enable them to get only published resources

  const [resources, categories, types, recentlyAdded, mostPopular] =
    await Promise.all([
      resourcesPromise,
      categoriesPromise,
      typesPromise,
      recentPromise,
      popularPromise,
    ]);

  const getApiPath = (path: string) => {
    // Extract the filename from the original path
    const filename = path.split("/").pop();
    // Return the API path
    return `/api/uploads/${filename}`;
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <section className="relative rounded-lg overflow-hidden mb-12 bg-gradient-to-br from-website-secondary to-website-secondary/90 shadow-lg border border-website-primary/20">
        <div className="w-full text-center relative z-20 py-16 px-8 md:py-24 md:px-12">
          <h1 className="heading text-white/90 text-6xl md:text-5xl font-bold  mb-4">
            {dictionary.mediaLibrary.title}
          </h1>
          <p className="text-[20px] text-white/80 mb-8 max-w-3xl mx-auto">
            {dictionary.mediaLibrary.description}
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

      {/* categories crads display with thumbnial image preview */}
      <div>
        <h2
          className={clsx(
            "heading text-3xl font-bold text-website-text  border-website-primary",
            { "border-r-4 pr-3": params.locale === "ar" },
            { "border-l-4 pl-3": params.locale !== "ar" }
          )}
        >
          {dictionary.mediaLibrary.browseCategories}
        </h2>
        {categories.length > 0 && (
          <div className="mt-6 grid  grid-cols-3 w-full  gap-4 mb-8">
            {categories.map((category) => (
              <Link
                href={`/${params.locale}/media-library/categories/${category.id}`}
                key={category.id}
              >
                <div
                  key={category.id}
                  className="bg-gradient-to-br from-website-secondary to-website-secondary/90 overflow-hidden relative aspect-[2/1] flex flex-col items-center justify-center rounded-lg border border-website-primary/20 p-4 shadow-lg"
                >
                  {category.thumbnail && (
                    <>
                      <Image
                        src={getApiPath(category.thumbnail)}
                        alt={category.label}
                        className="h-48 w-full object-cover rounded-lg"
                        layout="fill"
                      />
                      <div className="w-full h-full bg-radial from-black/50  to-black/20 absolute top-0 left-0 right-0 bottom-0" />
                    </>
                  )}
                  <p className="z-10 text-3xl font-bold text-center text-website-accent-1 mt-2">
                    {category.label}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

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
      <ContributeCTA dictionary={dictionary} />
    </main>
  );
}
