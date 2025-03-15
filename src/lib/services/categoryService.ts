"use server";
import { revalidatePath } from "next/cache";
import { Category, prisma, Resource } from "../db";
import { CreateCategoryInput, UpdateCategoryInput } from "../db/schema";

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
  return prisma.category.delete({ where: { id } });
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

export async function getCategoryResources(
  categoryId: string
): Promise<Resource[]> {
  return prisma.resource.findMany({
    where: { categoryId },
  });
}
