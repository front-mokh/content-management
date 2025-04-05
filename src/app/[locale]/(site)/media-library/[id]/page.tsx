import { Suspense } from "react";
import { notFound } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Clock, Download, ArrowLeft, FileText, User } from "lucide-react";
import { getResourceById, incrementResourceViews } from "@/lib/services";
import { getDictionary } from "@/lib/i18n";
import Link from "next/link";
import { FullResource } from "@/lib/types";
import { CATEGORY_COLORS, CategoryColorIndex } from "@/lib/constants";
import { ResourcePreview } from "./ResourcePreview";
import ResourceEngagement from "./ResourceEngagement";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import clsx from "clsx";
import { arDZ, enUS, frCA } from "date-fns/locale";

// Helper function to convert resource path to API path
const getApiPath = (path: string) => {
  // Extract the filename from the original path
  const filename = path.split("/").pop();
  // Return the API path
  return `/api/uploads/${filename}`;
};

export default async function ResourceDetailsPage({
  params,
}: {
  params: { locale: string; id: string };
}) {
  const dictionary = await getDictionary(params.locale);
  const resource = await getResourceById(params.id);

  if (!resource) {
    notFound();
  }

  // Increment view count
  await incrementResourceViews(params.id);

  // Create a modified resource with updated path
  const resourceWithApiPath = {
    ...resource,
    apiPath: resource.path ? getApiPath(resource.path) : null,
  };

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Back Button with improved styling */}
      <div className="mb-6">
        <Button
          asChild
          className={clsx(
            "bg-website-secondary/90 text-white hover:bg-website-secondary/80 hover:text-white/80",
            { "flex-row-reverse": params.locale === "ar" }
          )}
        >
          <Link
            href={`/${params.locale}/media-library`}
            className="inline-flex items-center  transition-colors duration-200 group"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{dictionary.mediaLibrary.backToLibrary}</span>
          </Link>
        </Button>
      </div>

      {/* Main content area with gradient border */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - 2/3 width on large screens */}
        <div className="lg:col-span-2">
          <ResourceHeader
            resource={resourceWithApiPath}
            dictionary={dictionary}
          />
        </div>

        {/* Sidebar with consistent styling */}
        <div className="space-y-6">
          <ResourceMetadata
            locale={params.locale}
            resource={resource}
            dictionary={dictionary}
          />
          <ResourceEngagement resource={resource} dictionary={dictionary} />
          <Card className="h-fit">
            <CardContent>
              <Button
                className="w-full bg-website-primary hover:bg-website-primary/90 mb-3 font-medium"
                size="lg"
                asChild
              >
                <a
                  href={resourceWithApiPath.apiPath || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                >
                  <Download className="h-5 w-5 mr-2" />
                  {dictionary.mediaLibrary.details.download}
                </a>
              </Button>

              <Button
                variant="outline"
                className="w-full border-website-secondary/30 text-website-secondary hover:bg-website-secondary/10 hover:text-website-secondary hover:border-website-secondary/50"
                size="lg"
                asChild
              >
                <a
                  href={resourceWithApiPath.apiPath || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Eye className="h-5 w-5 mr-2" />
                  {dictionary.mediaLibrary.details.preview}
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

function ResourceHeader({
  resource,
  dictionary,
}: {
  resource: FullResource & { apiPath?: string | null };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dictionary: any;
}) {
  const categoryColors =
    CATEGORY_COLORS[
      resource.category?.label?.toLowerCase() as CategoryColorIndex
    ] || CATEGORY_COLORS.default;

  return (
    <div className="">
      <Card>
        <CardHeader className="flex flex-row justify-between">
          <h1 className="heading text-website-text text-2xl md:text-3xl font-bold">
            {resource.title}
          </h1>
          <div className="flex flex-col items-end gap-2">
            <Badge className={`${categoryColors.badge} text-sm`}>
              {resource.category?.label}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<ResourcePreviewSkeleton />}>
            <ResourcePreview resource={resource} />
          </Suspense>
        </CardContent>
        <CardFooter className="flex flex-col items-start border-t border-website-primary/30 text-website-text/80 ">
          <h2 className="mt-4 text-xl font-semibold mb-2 text-website-secondary">
            {dictionary.mediaLibrary.details.description}
          </h2>
          <p className="text-website-tex/80 whitespace-pre-line leading-relaxed">
            {resource.description}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

function ResourceMetadata({
  locale,
  resource,
  dictionary,
}: {
  locale: string;
  resource: FullResource;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dictionary: any;
}) {
  const currentLocale = locale === "ar" ? arDZ : locale === "fr" ? frCA : enUS;
  return (
    <Card className="h-fit">
      <CardHeader className="flex flex-col items-start justify-between gap-3">
        <h2 className="text-xl font-semibold text-website-secondary">
          {dictionary.mediaLibrary.details.metadata}
        </h2>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <MetadataItem
            icon={<FileText className="h-4 w-4 text-website-primary/70" />}
            label={dictionary.mediaLibrary.details.category}
            value={resource.category?.label || "—"}
          />

          <MetadataItem
            icon={<FileText className="h-4 w-4 text-website-primary/70" />}
            label={dictionary.mediaLibrary.details.type}
            value={resource.type?.label || "—"}
          />

          {resource.author && (
            <MetadataItem
              icon={<User className="h-4 w-4 text-website-primary/70" />}
              label={dictionary.mediaLibrary.details.author}
              value={`${resource.author.firstName} ${resource.author.lastName}`}
            />
          )}

          <MetadataItem
            icon={<Clock className="h-4 w-4 text-website-primary/70" />}
            label={dictionary.mediaLibrary.details.published}
            value={
              resource.publishedAt
                ? formatDate(resource.publishedAt, locale) +
                  ` (${formatDistanceToNow(new Date(resource.publishedAt), {
                    locale: currentLocale,
                  })})`
                : "—"
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}

function MetadataItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center py-1.5 px-1">
      <div className="mr-2">{icon}</div>
      <div className="flex-1 flex justify-between">
        <span className="text-gray-500 mr-2">{label}</span>
        <span className="font-medium text-gray-800">{value}</span>
      </div>
    </div>
  );
}

function ResourcePreviewSkeleton() {
  return (
    <div className="aspect-video w-full bg-gray-100">
      <Skeleton className="h-full w-full" />
    </div>
  );
}
