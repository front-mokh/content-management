"use server";
import { prisma } from "../db";
import {
  CreateResourceInput,
  UpdateResourceInput,
  ResourceFilters,
} from "../db/schema";
import { Resource, ResourceStatus, Submission } from "@prisma/client";
import { FullResource } from "../types";
import { revalidatePath } from "next/cache";

export async function createResource(
  data: CreateResourceInput
): Promise<Resource> {
  return prisma.resource.create({
    data: {
      ...data,
      status: data.status || ResourceStatus.UNPUBLISHED,
    },
  });
}

export async function getResourceById(
  id: string
): Promise<FullResource | null> {
  return prisma.resource.findUnique({
    where: { id },
    include: {
      category: true,
      type: true,
      author: true,
      handler: true,
    },
  });
}

export async function updateResource(
  id: string,
  data: UpdateResourceInput
): Promise<Resource> {
  return prisma.resource.update({ where: { id }, data });
}

export async function deleteResource(id: string): Promise<Resource> {
  return prisma.resource.delete({ where: { id } });
}

export async function getAllResources(
  filters?: ResourceFilters,
  skip?: number,
  take?: number
): Promise<FullResource[]> {
  return prisma.resource.findMany({
    where: filters,
    skip,
    take,
    orderBy: { createdAt: "desc" },
    include: {
      category: true,
      type: true,
      author: true,
      handler: true,
    },
  });
}

export async function getPublishedResources(): Promise<FullResource[]> {
  return prisma.resource.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { createdAt: "desc" },
    include: {
      category: true,
      type: true,
      author: true,
      handler: true,
    },
  });
}
export async function getUnpublishedResources(): Promise<FullResource[]> {
  return prisma.resource.findMany({
    where: { status: "UNPUBLISHED" },
    orderBy: { createdAt: "desc" },
    include: {
      category: true,
      type: true,
      author: true,
      handler: true,
    },
  });
}

export async function incrementResourceViews(id: string): Promise<Resource> {
  return prisma.resource.update({
    where: { id },
    data: { views: { increment: 1 } },
  });
}

export async function incrementResourceUpvotes(id: string): Promise<Resource> {
  return prisma.resource.update({
    where: { id },
    data: { upvotes: { increment: 1 } },
  });
}

// i added this function to handle dislikes
export async function incrementResourceDislikes(id: string): Promise<Resource> {
  return prisma.resource.update({
    where: { id },
    data: { dislikes: { increment: 1 } },
  });
}

export async function publishResource(id: string) {
  const resource = prisma.resource.update({
    where: { id },
    data: { status: "PUBLISHED", publishedAt: new Date() },
  });
  revalidatePath("/admin/resources/unpublished");
  revalidatePath("/admin/resources/published");
  return resource;
}

export async function unPublishResource(id: string) {
  const resource = prisma.resource.update({
    where: { id },
    data: { status: "UNPUBLISHED" },
  });
  revalidatePath("/admin/resources/unpublished");
  revalidatePath("/admin/resources/published");
  return resource;
}
export async function getResourceSubmissions(
  resourceId: string
): Promise<Submission[]> {
  return prisma.submission.findMany({
    where: { resourceId },
  });
}

export const getResourcesByCategory = async ({
  categoryId,
  page,
  typeId,
  sort = "publishedAt",
  limit = 10,
}: {
  categoryId: string;
  page: number;
  typeId?: string;
  sort?: string;
  limit?: number;
}) => {
  const resources = await prisma.resource.findMany({
    where: {
      categoryId,
      typeId,
      publishedAt: {
        not: null,
      },
    },
    include: {
      category: true,
      type: true,
      author: true,
      handler: true,
    },
    orderBy: {
      [sort]: "desc",
    },
    take: limit,
    skip: (page - 1) * limit,
  });

  const totalResources = await prisma.resource.count({
    where: {
      categoryId,
      typeId,
      publishedAt: {
        not: null,
      },
    },
  });

  const totalPages = Math.ceil(totalResources / limit);

  return {
    resources,
    pagination: {
      currentPage: page,
      totalPages,
      totalResources,
    },
  };
};

export async function getPopularResourcesByUpvotes(
  take: number = 5
): Promise<FullResource[]> {
  return prisma.resource.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { upvotes: "desc" },
    take,
    include: {
      category: true,
      type: true,
      author: true,
      handler: true,
    },
  });
}

/**
 * Get resources count by category
 */
export async function getResourcesByCategory_d() {
  const categories = await prisma.category.findMany();

  const categoryResources = await Promise.all(
    categories.map(async (category) => {
      const count = await prisma.resource.count({
        where: { categoryId: category.id },
      });

      return {
        category,
        count,
      };
    })
  );

  // Filter out categories with 0 resources
  return categoryResources.filter((item) => item.count > 0);
}

// Function to get a specific category by ID
export async function getCategoryById(id: string) {
  try {
    const category = await prisma.category.findUnique({
      where: { id },
    });
    return category;
  } catch (error) {
    console.error("Error fetching category by ID:", error);
    throw error;
  }
}

// Function to get all published resources for a specific category
export async function getPublishedResourcesByCategory(
  categoryId: string
): Promise<FullResource[]> {
  try {
    const resources = await prisma.resource.findMany({
      where: {
        categoryId,
        status: "PUBLISHED",
      },
      include: {
        author: true,
        handler: true,

        category: true,
        type: true,
      },
      orderBy: {
        publishedAt: "desc",
      },
    });
    return resources;
  } catch (error) {
    console.error("Error fetching resources by category:", error);
    throw error;
  }
}

// Function to get recent resources for a specific category
export async function getRecentResourcesByCategory(
  categoryId: string,
  limit = 12
): Promise<FullResource[]> {
  try {
    const resources = await prisma.resource.findMany({
      where: {
        categoryId,
        status: "PUBLISHED",
      },
      include: {
        author: true,
        handler: true,
        category: true,
        type: true,
      },
      orderBy: {
        publishedAt: "desc",
      },
      take: limit,
    });
    return resources;
  } catch (error) {
    console.error("Error fetching recent resources by category:", error);
    throw error;
  }
}

// Function to get popular resources for a specific category
export async function getPopularResourcesByCategory(
  categoryId: string,
  limit = 12
): Promise<FullResource[]> {
  try {
    const resources = await prisma.resource.findMany({
      where: {
        categoryId,
        status: "PUBLISHED",
      },
      include: {
        handler: true,
        author: true,
        category: true,
        type: true,
      },
      orderBy: {
        views: "desc",
      },
      take: limit,
    });
    return resources;
  } catch (error) {
    console.error("Error fetching popular resources by category:", error);
    throw error;
  }
}
