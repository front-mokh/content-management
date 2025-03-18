"use server";

import { prisma } from "../db";
import { CreateTypeInput, UpdateTypeInput } from "../db/schema";
import { Type, Resource } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createType(data: CreateTypeInput): Promise<Type> {
  const type = await prisma.type.create({ data });
  revalidatePath("/admin/types");
  return type;
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
  const type = await prisma.type.update({ where: { id }, data }); 
  revalidatePath("/admin/types");
  return type;
}

export async function deleteType(id: string): Promise<Type> {
  const type = await prisma.type.delete({ where: { id } });
  revalidatePath("/admin/types");
  return type
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
