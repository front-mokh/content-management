"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "../db";
import { CreateAuthorInput, UpdateAuthorInput, CreateAuthorSchemaType, UpdateAuthorSchemaType } from "../db/schema";
import { Author, Resource, AuthorCategory } from "@prisma/client";

export async function createAuthor(data: CreateAuthorInput): Promise<Author> {
  console.log("Creating author with data:", data); // Debug log
  const author = await prisma.author.create({ data });
  revalidatePath("/admin/authors");
  return author;
}

// Alternative function using Zod validation
export async function createAuthorWithValidation(data: CreateAuthorSchemaType): Promise<Author> {
  console.log("Creating author with data:", data); // Debug log
  const author = await prisma.author.create({ data });
  revalidatePath("/admin/authors");
  return author;
}

export async function getAuthorById(id: string): Promise<Author | null> {
  return prisma.author.findUnique({ where: { id } });
}

export async function updateAuthor(
  id: string,
  data: UpdateAuthorInput
): Promise<Author> {
  const author = await prisma.author.update({ where: { id }, data });
  revalidatePath("/admin/authors");
  return author;
}

// Alternative function using Zod validation
export async function updateAuthorWithValidation(
  id: string,
  data: UpdateAuthorSchemaType
): Promise<Author> {
  const author = await prisma.author.update({ where: { id }, data });
  revalidatePath("/admin/authors");
  return author;
}

export async function deleteAuthor(id: string): Promise<Author> {
  const author = await prisma.author.delete({ where: { id } });
  revalidatePath("/admin/authors");
  return author;
}

export async function getAllAuthors(
  skip?: number,
  take?: number
): Promise<(Author & { resourceCount: number })[]> {
  const authors = await prisma.author.findMany({
    skip,
    take,
    orderBy: { lastName: "asc" },
    include: {
      _count: {
        select: {
          resources: true
        }
      }
    }
  });
  
  return authors.map(author => ({
    ...author,
    resourceCount: author._count.resources
  }));
}

export async function getAuthorResources(
  authorId: string
): Promise<Resource[]> {
  return prisma.resource.findMany({
    where: { authorId },
  });
}

// New functions for category-specific operations

export async function getAuthorsByCategory(
  category: AuthorCategory,
  skip?: number,
  take?: number
): Promise<(Author & { resourceCount: number })[]> {
  const authors = await prisma.author.findMany({
    where: { category },
    skip,
    take,
    orderBy: { lastName: "asc" },
    include: {
      _count: {
        select: {
          resources: true
        }
      }
    }
  });
  
  return authors.map(author => ({
    ...author,
    resourceCount: author._count.resources
  }));
}

export async function getAuthorCategoryCounts(): Promise<Record<AuthorCategory, number>> {
  const counts = await prisma.author.groupBy({
    by: ['category'],
    _count: {
      id: true
    }
  });
  
  // Initialize all categories with 0
  const result: Record<AuthorCategory, number> = {
    ECRIVAINS: 0,
    POETES: 0,
    CHANTEURS: 0,
    PERSONNAGES_DE_GUERRES: 0,
    PERSONNAGES_LEGENDS: 0
  };
  
  // Fill in actual counts
  counts.forEach(count => {
    result[count.category] = count._count.id;
  });
  
  return result;
}

export async function getAllAuthorsGroupedByCategory(): Promise<Record<AuthorCategory, Author[]>> {
  const authors = await prisma.author.findMany({
    orderBy: { lastName: "asc" }
  });
  
  // Group authors by category
  const grouped: Record<AuthorCategory, Author[]> = {
    ECRIVAINS: [],
    POETES: [],
    CHANTEURS: [],
    PERSONNAGES_DE_GUERRES: [],
    PERSONNAGES_LEGENDS: []
  };
  
  authors.forEach(author => {
    grouped[author.category].push(author);
  });
  
  return grouped;
}

// Updated function to get all authors with category filtering option
export async function getAllAuthorsWithFilters(
  category?: AuthorCategory,
  skip?: number,
  take?: number
): Promise<(Author & { resourceCount: number })[]> {
  const where = category ? { category } : {};
  
  const authors = await prisma.author.findMany({
    where,
    skip,
    take,
    orderBy: { lastName: "asc" },
    include: {
      _count: {
        select: {
          resources: true
        }
      }
    }
  });
  
  return authors.map(author => ({
    ...author,
    resourceCount: author._count.resources
  }));
}