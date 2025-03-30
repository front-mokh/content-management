import { Suspense } from "react";
import { notFound } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Eye,
  ThumbsUp,
  Clock,
  Download,
  Share2,
  ArrowLeft,
  FileText,
  User,
} from "lucide-react";
import { getResourceById, incrementResourceViews } from "@/lib/services";
import { getDictionary } from "@/lib/i18n";
import Link from "next/link";
import ResourceCard from "../ResourceCard";
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

  // Fetch related resources
  // const relatedByCategoryPromise = getSimilarResourcesByCategory(
  //   resource.categoryId,
  //   resource.id,
  //   4
  // );
  // const relatedByAuthorPromise = resource.authorId
  //   ? getSimilarResourcesByAuthor(resource.authorId, resource.id, 4)
  //   : Promise.resolve([]);

  // const [relatedByCategory, relatedByAuthor] = await Promise.all([
  //   relatedByCategoryPromise,
  //   relatedByAuthorPromise,
  // ]);

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Back Button with improved styling */}
      <div className="mb-6">
        <Button
          asChild
          className="bg-website-secondary/90 text-white hover:bg-website-secondary/80 hover:text-white/80"
        >
          <Link
            href={`/${params.locale}/media-library`}
            className="inline-flex items-center  transition-colors duration-200 group"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>
              {dictionary.mediaLibrary.backToLibrary || "Back to Media Library"}
            </span>
          </Link>
        </Button>
      </div>

      {/* Main content area with gradient border */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - 2/3 width on large screens */}
        <div className="lg:col-span-2">
          <ResourceHeader resource={resource} dictionary={dictionary} />
        </div>

        {/* Sidebar with consistent styling */}
        <div className="space-y-6">
          <ResourceMetadata resource={resource} dictionary={dictionary} />
          <ResourceEngagement resource={resource} dictionary={dictionary} />
          <div className="bg-white rounded-lg shadow-md p-6 border border-website-primary/10">
            <Button
              className="w-full bg-website-primary hover:bg-website-primary/90 mb-3 font-medium"
              size="lg"
              asChild
            >
              <a
                href={resource.path}
                target="_blank"
                rel="noopener noreferrer"
                download
              >
                <Download className="h-5 w-5 mr-2" />
                {dictionary.mediaLibrary.download || "Download"}
              </a>
            </Button>

            <Button
              variant="outline"
              className="w-full border-website-secondary/30 text-website-secondary hover:bg-website-secondary/10 hover:text-website-secondary hover:border-website-secondary/50"
              size="lg"
              asChild
            >
              <a href={resource.path} target="_blank" rel="noopener noreferrer">
                <Eye className="h-5 w-5 mr-2" />
                {dictionary.mediaLibrary.preview || "Preview"}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}

function ResourceHeader({
  resource,
  dictionary,
}: {
  resource: FullResource;
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
            {dictionary.mediaLibrary.description || "Description"}
          </h2>
          <p className="text-website-tex/80 whitespace-pre-line leading-relaxed">
            {resource.description || (
              <span className="text-gray-400 italic">
                No description provided
              </span>
            )}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

function ResourceMetadata({
  resource,
  dictionary,
}: {
  resource: FullResource;
  dictionary: any;
}) {
  return (
    <Card className="h-fit">
      <CardHeader className="flex flex-col items-start justify-between gap-3">
        <h2 className="text-xl font-semibold text-website-secondary">
          {dictionary.mediaLibrary.metadata || "Metadata"}
        </h2>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <MetadataItem
            icon={<FileText className="h-4 w-4 text-website-primary/70" />}
            label={dictionary.mediaLibrary.category || "Category"}
            value={resource.category?.label || "—"}
          />

          <MetadataItem
            icon={<FileText className="h-4 w-4 text-website-primary/70" />}
            label={dictionary.mediaLibrary.type || "Type"}
            value={resource.type?.label || "—"}
          />

          {resource.author && (
            <MetadataItem
              icon={<User className="h-4 w-4 text-website-primary/70" />}
              label={dictionary.mediaLibrary.author || "Author"}
              value={`${resource.author.firstName} ${resource.author.lastName}`}
            />
          )}

          <MetadataItem
            icon={<Clock className="h-4 w-4 text-website-primary/70" />}
            label={dictionary.mediaLibrary.published || "Published At"}
            value={
              resource.publishedAt
                ? formatDate(resource.publishedAt) +
                  ` (${formatDistanceToNow(new Date(resource.publishedAt), {
                    addSuffix: true,
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
