"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../db";
import { CreateAuthorInput, UpdateAuthorInput } from "../db/schema";
import { Author, Resource } from "@prisma/client";

export async function createAuthor(data: CreateAuthorInput): Promise<Author> {
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
