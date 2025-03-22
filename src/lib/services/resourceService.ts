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
