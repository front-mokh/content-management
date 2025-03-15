import { prisma } from "../db";
import { CreateTypeInput, UpdateTypeInput } from "../db/schema";
import { Type, Resource } from "@prisma/client";

export async function createType(data: CreateTypeInput): Promise<Type> {
  return prisma.type.create({ data });
}

export async function getTypeById(id: string): Promise<Type | null> {
  return prisma.type.findUnique({ where: { id } });
}

export async function getTypeByLabel(label: string): Promise<Type | null> {
  return prisma.type.findUnique({ where: { label } });
}

export async function updateType(
  id: string,
  data: UpdateTypeInput
): Promise<Type> {
  return prisma.type.update({ where: { id }, data });
}

export async function deleteType(id: string): Promise<Type> {
  return prisma.type.delete({ where: { id } });
}

export async function getAllTypes(
  categoryId?: string,
  skip?: number,
  take?: number
): Promise<Type[]> {
  return prisma.type.findMany({
    where: categoryId ? { categoryId } : undefined,
    skip,
    take,
    orderBy: { label: "asc" },
    include: { category: true },
  });
}

export async function getTypeResources(typeId: string): Promise<Resource[]> {
  return prisma.resource.findMany({
    where: { typeId },
  });
}
