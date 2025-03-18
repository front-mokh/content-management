import { prisma } from "../db";
import {
  CreateResourceInput,
  UpdateResourceInput,
  ResourceFilters,
} from "../db/schema";
import { Resource, Status, Submission } from "@prisma/client";
import { FullResource } from "../types";

export async function createResource(
  data: CreateResourceInput
): Promise<Resource> {
  return prisma.resource.create({
    data: {
      ...data,
      status: data.status || Status.PENDING,
    },
  });
}

export async function getResourceById(id: string): Promise<Resource | null> {
  return prisma.resource.findUnique({
    where: { id },
    include: {
      category: true,
      type: true,
      author: true,
      handler: true,
      submissions: true,
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
    orderBy: { submittedAt: "desc" },
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

export async function updateResourceStatus(
  id: string,
  status: Status,
  handlerId?: string
): Promise<Resource> {
  const data: Partial<Resource> = { status };

  // Set appropriate timestamps based on status
  if (status === Status.REVIEWING) {
    data.reviewedAt = new Date();
  }
  if (status === Status.PUBLISHED) {
    data.publishedAt = new Date();
  }

  // Assign handler if provided
  if (handlerId) {
    data.handlerId = handlerId;
  }

  return prisma.resource.update({
    where: { id },
    data,
  });
}

export async function getResourceSubmissions(
  resourceId: string
): Promise<Submission[]> {
  return prisma.submission.findMany({
    where: { resourceId },
  });
}
