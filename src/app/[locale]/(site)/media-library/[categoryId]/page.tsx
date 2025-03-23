import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PrismaClient } from "@prisma/client";
import {
  ChevronLeft,
  BookOpen,
  Video,
  Headphones,
  FileText,
  LayoutGrid,
  Filter,
  Search,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ResourceDetailDialog from "./resource-detail-dialog";

// Initialize Prisma client
const prisma = new PrismaClient();

// Generate metadata
export async function generateMetadata({
  params,
}: {
  params: { categoryId: string };
}): Promise<Metadata> {
  const category = await prisma.category.findUnique({
    where: { id: params.categoryId },
  });

  return {
    title: category
      ? `${category.label} Resources | Kabyle Cultural Heritage`
      : "Category Resources",
    description:
      category?.description ||
      "Browse our collection of Kabyle cultural heritage resources",
  };
}

// Get resource icon based on type
function getResourceIcon(typeLabel: string) {
  switch (typeLabel.toLowerCase()) {
    case "book":
    case "text":
      return <BookOpen className="h-6 w-6" />;
    case "video":
      return <Video className="h-6 w-6" />;
    case "audio":
      return <Headphones className="h-6 w-6" />;
    case "document":
      return <FileText className="h-6 w-6" />;
    default:
      return <LayoutGrid className="h-6 w-6" />;
  }
}

// Get category and its types
async function getCategoryWithTypes(categoryId: string) {
  return prisma.category.findUnique({
    where: { id: categoryId },
    include: {
      types: true,
    },
  });
}

// Get resources for the category
async function getCategoryResources(categoryId: string) {
  return prisma.resource.findMany({
    where: {
      categoryId,
      status: "PUBLISHED",
    },
    include: {
      type: true,
      author: true,
    },
    orderBy: {
      publishedAt: "desc",
    },
  });
}

// Get specific resource if requested
async function getResourceDetails(resourceId: string) {
  return prisma.resource.findUnique({
    where: {
      id: resourceId,
      status: "PUBLISHED",
    },
    include: {
      type: true,
      author: true,
      category: true,
    },
  });
}

export default async function CategoryResourcesPage({
  params,
  searchParams,
}: {
  params: { categoryId: string };
  searchParams: { resource?: string; type?: string; q?: string };
}) {
  const category = await getCategoryWithTypes(params.categoryId);
  const resources = await getCategoryResources(params.categoryId);

  // Get requested resource details if any
  const requestedResourceId = searchParams.resource;
  const requestedResource = requestedResourceId
    ? await getResourceDetails(requestedResourceId)
    : null;

  // Filter resources if type filter is applied
  const filteredResources = searchParams.type
    ? resources.filter((resource) => resource.typeId === searchParams.type)
    : resources;

  // Filter resources by search query if provided
  const searchResults = searchParams.q
    ? filteredResources.filter(
        (resource) =>
          resource.title
            .toLowerCase()
            .includes(searchParams.q!.toLowerCase()) ||
          resource.description
            .toLowerCase()
            .includes(searchParams.q!.toLowerCase())
      )
    : filteredResources;

  if (!category) {
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>
        <p className="mb-8">
          The category you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link href="/resources">Back to Resources</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      {/* Header with breadcrumb */}
      <div className="mb-8">
        <Link
          href="/resources"
          className="flex items-center text-muted-foreground hover:text-primary mb-4"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to all resources
        </Link>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold">{category.label}</h1>
            <p className="text-xl text-muted-foreground mt-2">
              {category.description}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <form action="">
                <Input
                  placeholder="Search in this category"
                  name="q"
                  defaultValue={searchParams.q || ""}
                  className="pl-10"
                />
                {searchParams.type && (
                  <input type="hidden" name="type" value={searchParams.type} />
                )}
              </form>
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter Resources</SheetTitle>
                  <SheetDescription>
                    Filter resources by type and other criteria
                  </SheetDescription>
                </SheetHeader>
                <div className="py-6">
                  <h3 className="text-lg font-medium mb-4">Resource Types</h3>
                  <div className="flex flex-col gap-2">
                    <Link
                      href={`/resources/${params.categoryId}`}
                      className="text-blue-600 hover:underline mb-2"
                    >
                      Clear filters
                    </Link>
                    {category.types.map((type) => (
                      <Link
                        key={type.id}
                        href={`/resources/${params.categoryId}?type=${type.id}`}
                        className={`flex items-center p-2 rounded-md ${
                          searchParams.type === type.id
                            ? "bg-primary/10 text-primary"
                            : "hover:bg-muted"
                        }`}
                      >
                        <div className="mr-3">
                          {getResourceIcon(type.label)}
                        </div>
                        <div>
                          <div className="font-medium">{type.label}</div>
                          <div className="text-sm text-muted-foreground">
                            {type.description}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Resource listing */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {searchResults.length > 0 ? (
          searchResults.map((resource) => (
            <Card
              key={resource.id}
              className="overflow-hidden transition-all hover:shadow-lg"
            >
              <div className="aspect-video bg-muted relative overflow-hidden">
                {resource.path && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                    <Badge
                      variant="secondary"
                      className="absolute top-4 right-4"
                    >
                      {resource.type.label}
                    </Badge>
                    <div className="absolute top-4 left-4 bg-white/90 p-2 rounded-full">
                      {getResourceIcon(resource.type.label)}
                    </div>
                  </div>
                )}
              </div>
              <CardHeader className="p-4">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl line-clamp-2">
                    {resource.title}
                  </CardTitle>
                </div>
                <CardDescription className="line-clamp-2 mt-2">
                  {resource.description}
                </CardDescription>
              </CardHeader>
              <CardFooter className="p-4 pt-0 flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  {resource.author &&
                    `${resource.author.firstName} ${resource.author.lastName}`}
                </div>
                <Link
                  href={`/resources/${params.categoryId}?resource=${
                    resource.id
                  }${searchParams.type ? `&type=${searchParams.type}` : ""}${
                    searchParams.q ? `&q=${searchParams.q}` : ""
                  }`}
                  passHref
                >
                  <Button variant="secondary" size="sm">
                    View Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full py-12 text-center">
            <div className="mb-4 flex justify-center">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
            </div>
            <h3 className="text-xl font-medium mb-2">No resources found</h3>
            <p className="text-muted-foreground mb-6">
              {searchParams.q
                ? `No results match "${searchParams.q}" in this category`
                : "There are no resources available in this category yet"}
            </p>
            {searchParams.q && (
              <Button asChild variant="outline">
                <Link href={`/resources/${params.categoryId}`}>
                  Clear Search
                </Link>
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Resource detail dialog if resource is requested */}
      {requestedResource && (
        <ResourceDetailDialog
          resource={requestedResource}
          backHref={`/resources/${params.categoryId}${
            searchParams.type ? `?type=${searchParams.type}` : ""
          }${
            searchParams.q
              ? `${searchParams.type ? "&" : "?"}q=${searchParams.q}`
              : ""
          }`}
        />
      )}
    </div>
  );
}
