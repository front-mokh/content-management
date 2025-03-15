import { prisma } from "../db";
import { CreateSubmissionInput, UpdateSubmissionInput } from "../db/schema";
import { Submission } from "@prisma/client";

export async function createSubmission(
  data: CreateSubmissionInput
): Promise<Submission> {
  return prisma.submission.create({ data });
}

export async function getSubmissionById(
  id: string
): Promise<Submission | null> {
  return prisma.submission.findUnique({
    where: { id },
    include: { resource: true },
  });
}

export async function updateSubmission(
  id: string,
  data: UpdateSubmissionInput
): Promise<Submission> {
  return prisma.submission.update({ where: { id }, data });
}

export async function deleteSubmission(id: string): Promise<Submission> {
  return prisma.submission.delete({ where: { id } });
}

export async function getAllSubmissions(
  resourceId?: string,
  skip?: number,
  take?: number
): Promise<Submission[]> {
  return prisma.submission.findMany({
    where: resourceId ? { resourceId } : undefined,
    skip,
    take,
    orderBy: { id: "desc" },
    include: { resource: true },
  });
}
