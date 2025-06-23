import { Suspense } from "react";
import {
  getAllCategories,
  getPublishedResources,
  getRecentResources,
  getPopularResources,
  getAllTypes,
} from "@/lib/services";
import ContributeCTA from "./ContributeCTA";
import { getDictionary } from "@/lib/i18n";
import MediaLibraryContent from "./MediaLibraryContent";
import LibraryContentSkeleton from "./LibraryContentSkeleton";
import MediaLibraryHero from "./MediaLibraryHero";
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

  const getApiPath = (path: string) => {
    const filename = path.split("/").pop();
    return `/api/uploads/${filename}`;
  };

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <MediaLibraryHero dictionary={dictionary} locale={params.locale} />

      {/* Categories section */}
      <div>
        <h2
          className={clsx(
            "heading text-3xl font-bold text-website-text border-website-primary",
            { "border-r-4 pr-3": params.locale === "ar" },
            { "border-l-4 pl-3": params.locale !== "ar" }
          )}
        >
          {dictionary.mediaLibrary.browseCategories}
        </h2>
        {categories.length > 0 && (
          <div className="mt-6 grid grid-cols-3 w-full gap-4 mb-8">
            {categories.map((category) => (
              <Link
                href={`/${params.locale}/media-library/categories/${category.id}`}
                key={category.id}
              >
                <div
                  key={category.id}
                  className="bg-gradient-to-br from-website-secondary to-website-secondary/90 overflow-hidden relative aspect-[2/1] flex flex-col items-center justify-center rounded-lg border border-website-primary/20 p-4 shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  {category.thumbnail && (
                    <>
                      <Image
                        src={getApiPath(category.thumbnail)}
                        alt={category.label}
                        className="h-48 w-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                        layout="fill"
                      />
                      <div className="w-full h-full bg-gradient-to-t from-black/60 to-black/20 absolute top-0 left-0 right-0 bottom-0 group-hover:from-black/70 transition-all duration-300" />
                    </>
                  )}
                  <p className="z-10 text-3xl font-bold text-center text-website-accent-1 mt-2 drop-shadow-lg">
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