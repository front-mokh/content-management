"use server";

import { revalidatePath } from "next/cache";
import { Category, prisma, Resource, Type } from "../db";
import { CreateCategoryInput, UpdateCategoryInput } from "../db/schema";
import { FullResource } from "../types";
import { join } from "path";
import { randomUUID } from "crypto";
import fs from "fs/promises";
import { auth } from "../../../auth";

// Create a category with an optional thumbnail image
export async function createCategoryWithThumbnail(
  data: CreateCategoryInput,
  file: File | null
): Promise<{ success: boolean; data?: Category; error?: string }> {
  try {
    await getSessionOrThrow();

    let thumbnailUrl = "";
    if (file) {
      thumbnailUrl = await processUploadedFile(file);
    }

    const category = await prisma.category.create({
      data: {
        ...data,
        thumbnail: thumbnailUrl,
      },
    });

    revalidatePath("/admin/categories");
    return { success: true, data: category };
  } catch (error) {
    console.error("Error creating category:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Une erreur s'est produite",
    };
  }
}

// Update a category with an optional new thumbnail image
export async function updateCategoryWithThumbnail(
  id: string,
  data: UpdateCategoryInput,
  file: File | null,
  originalThumbnailPath: string | null
): Promise<{ success: boolean; data?: Category; error?: string }> {
  try {
    await getSessionOrThrow();

    let thumbnailUrl = originalThumbnailPath || "";

    if (file) {
      // Process and save the new image file
      thumbnailUrl = await processUploadedFile(file);

      // Delete the old thumbnail file if it exists
      if (originalThumbnailPath) {
        await deleteOldFile(originalThumbnailPath);
      }
    }

    const category = await prisma.category.update({
      where: { id },
      data: {
        ...data,
        thumbnail: thumbnailUrl,
      },
    });

    revalidatePath("/admin/categories");
    return { success: true, data: category };
  } catch (error) {
    console.error("Error updating category:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Une erreur s'est produite",
    };
  }
}

// Process and save an uploaded file
async function processUploadedFile(file: File): Promise<string> {
  try {
    // Read file content
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate a unique filename
    const fileName = `${randomUUID()}-${file.name.replace(/\s/g, "_")}`;

    // Set the upload directory - make sure this directory exists and is writable
    const uploadDir = join(process.cwd(), "public", "uploads", "thumbnails");

    // Ensure the directory exists
    await fs.mkdir(uploadDir, { recursive: true });

    // Create the full path
    const filePath = join(uploadDir, fileName);

    // Write the file to the uploads directory
    await fs.writeFile(filePath, buffer);

    // Return the URL that can be used to access the file
    return `/uploads/thumbnails/${fileName}`;
  } catch (error) {
    console.error("Error processing file:", error);
    throw new Error("Erreur lors du traitement du fichier");
  }
}

// Delete an old file
async function deleteOldFile(filePath: string) {
  try {
    if (!filePath || filePath === "") return;

    const fullPath = join(process.cwd(), "public", filePath);

    try {
      await fs.access(fullPath);
      await fs.unlink(fullPath);
      console.log(`Deleted old thumbnail: ${filePath}`);
    } catch (error) {
      console.warn(`Could not delete old thumbnail at ${fullPath}:`, error);
    }
  } catch (error) {
    console.error("Error deleting old thumbnail:", error);
  }
}

// Get the current session or throw an error
async function getSessionOrThrow() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Vous devez être connecté pour effectuer cette action");
  }

  return session;
}

// Keep the original functions
export async function createCategory(
  data: CreateCategoryInput
): Promise<Category> {
  const category = await prisma.category.create({ data });
  revalidatePath("/admin/categories");
  return category;
}

export async function getCategoryById(id: string): Promise<Category | null> {
  return prisma.category.findUnique({
    where: { id },
    include: { types: true },
  });
}

export async function getCategoryTypes(categoryId: string): Promise<Type[]> {
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
    include: { types: true },
  });
  return category?.types || [];
}

export async function getCategoryByLabel(
  label: string
): Promise<Category | null> {
  return prisma.category.findUnique({
    where: { label },
    include: { types: true },
  });
}

export async function updateCategory(
  id: string,
  data: UpdateCategoryInput
): Promise<Category> {
  const category = await prisma.category.update({ where: { id }, data });
  revalidatePath("/admin/categories");
  return category;
}

export async function deleteCategory(id: string): Promise<Category> {
  // First, delete the thumbnail file if it exists
  const category = await prisma.category.findUnique({ where: { id } });
  if (category?.thumbnail) {
    await deleteOldFile(category.thumbnail);
  }

  // Then delete the category from the database
  const deletedCategory = await prisma.category.delete({ where: { id } });
  revalidatePath("/admin/categories");
  return deletedCategory;
}

export async function getAllCategories(
  skip?: number,
  take?: number
): Promise<Category[]> {
  return prisma.category.findMany({
    skip,
    take,
    orderBy: { label: "asc" },
    include: { types: true },
  });
}

export async function getRecentResources(
  take: number
): Promise<FullResource[]> {
  return prisma.resource.findMany({
    orderBy: { publishedAt: "desc" },
    take,
    include: { author: true, category: true, type: true, handler: true },
  });
}

export async function getPopularResources(
  take: number
): Promise<FullResource[]> {
  return prisma.resource.findMany({
    orderBy: { views: "desc" },
    take,
    include: { author: true, category: true, type: true, handler: true },
  });
}

export async function getFeaturedResources(): Promise<
  {
    category: Category;
    resources: FullResource[];
  }[]
> {
  const categories = await getAllCategories();
  const featuredResourcesPromises = categories.map(async (category) => {
    const resources = await getRecentResources(4);
    return { category, resources };
  });

  const featuredResources = await Promise.all(featuredResourcesPromises);
  return featuredResources;
}

export async function getCategoryResources(
  categoryId: string
): Promise<Resource[]> {
  return prisma.resource.findMany({
    where: { categoryId },
  });
}
