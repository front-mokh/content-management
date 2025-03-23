import { Metadata } from "next";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import {
  BookOpen,
  Video,
  Headphones,
  FileText,
  LayoutGrid,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Resources Library | Kabyle Cultural Heritage",
  description:
    "Explore our extensive collection of Kabyle cultural heritage resources",
};

// Initialize Prisma client
const prisma = new PrismaClient();

// Get resource count by category
async function getResourceStats() {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { resources: { where: { status: "PUBLISHED" } } },
      },
    },
  });

  return categories;
}

// Get featured resources (most viewed/upvoted)
async function getFeaturedResources() {
  return prisma.resource.findMany({
    where: {
      status: "PUBLISHED",
    },
    orderBy: [{ views: "desc" }, { upvotes: "desc" }],
    take: 6,
    include: {
      category: true,
      type: true,
      author: true,
    },
  });
}

// Get recent resources
async function getRecentResources() {
  return prisma.resource.findMany({
    where: {
      status: "PUBLISHED",
    },
    orderBy: { publishedAt: "desc" },
    take: 6,
    include: {
      category: true,
      type: true,
      author: true,
    },
  });
}

// Get resource icon based on type
function getResourceIcon(typeLabel: string) {
  switch (typeLabel.toLowerCase()) {
    case "book":
    case "text":
      return <BookOpen className="h-8 w-8 text-primary" />;
    case "video":
      return <Video className="h-8 w-8 text-primary" />;
    case "audio":
      return <Headphones className="h-8 w-8 text-primary" />;
    case "document":
      return <FileText className="h-8 w-8 text-primary" />;
    default:
      return <LayoutGrid className="h-8 w-8 text-primary" />;
  }
}

export default async function ResourcesPage() {
  const categories = await getResourceStats();
  const featuredResources = await getFeaturedResources();
  const recentResources = await getRecentResources();

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      {/* Hero section */}
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Explore the Kabyle Cultural Heritage
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Discover our extensive collection of multimedia resources preserving
          the rich cultural heritage of Kabylia.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link href="#categories">Browse Categories</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contribute">Contribute Resources</Link>
          </Button>
        </div>
      </section>

      {/* Featured and Recent Resources */}
      <section className="mb-16">
        <Tabs defaultValue="featured" className="w-full">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-3xl font-bold">Resources Library</h2>
            <TabsList>
              <TabsTrigger value="featured">Featured</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="featured" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredResources.map((resource) => (
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
                        <div className="absolute top-4 left-4">
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
                      href={`/resources/${resource.categoryId}?resource=${resource.id}`}
                      passHref
                    >
                      <Button variant="secondary" size="sm">
                        View Details
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recent" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentResources.map((resource) => (
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
                        <div className="absolute top-4 left-4">
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
                      {resource.publishedAt &&
                        new Date(resource.publishedAt).toLocaleDateString(
                          "fr-FR",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                    </div>
                    <Link
                      href={`/resources/${resource.categoryId}?resource=${resource.id}`}
                      passHref
                    >
                      <Button variant="secondary" size="sm">
                        View Details
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Categories Section */}
      <section id="categories" className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={`/resources/${category.id}`} passHref>
              <Card className="hover:shadow-lg transition-all cursor-pointer h-full">
                <CardHeader>
                  <CardTitle>{category.label}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-base p-2">
                      {category._count.resources} resources
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full">
                    Browse Category
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Call to Contribute */}
      <section className="bg-muted rounded-xl p-8 text-center mb-16">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">
            Contribute to Our Collection
          </h2>
          <p className="text-lg mb-6">
            Help us preserve and share the rich Kabyle cultural heritage. Submit
            your own resources to our library.
          </p>
          <Button asChild size="lg">
            <Link href="/contribute">Submit Your Resources</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
