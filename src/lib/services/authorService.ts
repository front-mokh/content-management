import { prisma } from "../db";
import { CreateAuthorInput, UpdateAuthorInput } from "../db/schema";
import { Author, Resource } from "@prisma/client";

export async function createAuthor(data: CreateAuthorInput): Promise<Author> {
  return prisma.author.create({ data });
}

export async function getAuthorById(id: string): Promise<Author | null> {
  return prisma.author.findUnique({ where: { id } });
}

export async function updateAuthor(
  id: string,
  data: UpdateAuthorInput
): Promise<Author> {
  return prisma.author.update({ where: { id }, data });
}

export async function deleteAuthor(id: string): Promise<Author> {
  return prisma.author.delete({ where: { id } });
}

export async function getAllAuthors(
  skip?: number,
  take?: number
): Promise<Author[]> {
  return prisma.author.findMany({
    skip,
    take,
    orderBy: { lastName: "asc" },
  });
}

export async function getAuthorResources(
  authorId: string
): Promise<Resource[]> {
  return prisma.resource.findMany({
    where: { authorId },
  });
}
