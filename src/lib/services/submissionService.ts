"use server";
import { prisma } from "../db";
import { revalidatePath } from "next/cache";
import { Submission, SubmissionStatus }  from "@prisma/client";

export type CreateSubmissionInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  message?: string | null;
  filepath: string;
  author: string;
};

export type UpdateSubmissionInput = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string | null;
  message?: string | null;
  filepath?: string;
  author?: string;
  status?: SubmissionStatus;
};

export async function createSubmission(
  data: CreateSubmissionInput
): Promise<Submission> {
  return prisma.submission.create({
    data: {
      ...data,
      status: SubmissionStatus.PENDING,
    },
  });
}

export async function getSubmissionById(
  id: string
): Promise<Submission | null> {
  return prisma.submission.findUnique({
    where: { id },
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

export async function getAllSubmissions(): Promise<Submission[]> {
  return prisma.submission.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getPendingSubmissions(): Promise<Submission[]> {
  return prisma.submission.findMany({
    where: { status: SubmissionStatus.PENDING },
    orderBy: { createdAt: "desc" },
  });
}

export async function getAcceptedSubmissions(): Promise<Submission[]> {
  return prisma.submission.findMany({
    where: { status: SubmissionStatus.ACCEPTED },
    orderBy: { createdAt: "desc" },
  });
}

export async function getRejectedSubmissions(): Promise<Submission[]> {
  return prisma.submission.findMany({
    where: { status: SubmissionStatus.REJECTED },
    orderBy: { createdAt: "desc" },
  });
}
export async function getConvertedSubmissions(): Promise<Submission[]> {
  return prisma.submission.findMany({
    where: { status: SubmissionStatus.CONVERTED },
    orderBy: { createdAt: "desc" },
  });
}


export async function acceptSubmission(id: string) {
  const submission = await prisma.submission.update({
    where: { id },
    data: { status: SubmissionStatus.ACCEPTED },
  });
  
  revalidatePath("/admin/submissions/pending");
  revalidatePath("/admin/submissions/accepted");
  return submission;
}

export async function rejectSubmission(id: string) {
  const submission = await prisma.submission.update({
    where: { id },
    data: { status: SubmissionStatus.REJECTED },
  });
  
  revalidatePath("/admin/submissions/pending");
  revalidatePath("/admin/submissions/rejected");
  return submission;
}

export async function convertSubmissionToResource(id: string) {
  
  const submission = await prisma.submission.findUnique({
    where: { id },
  });

  if (!submission) {
    throw new Error("Soumission introuvable");
  }

  // Create a resource from the submission
  const resource = await prisma.resource.create({
    data: {
      title: "",
      description:" ",
      path: submission.filepath,
      status: "UNPUBLISHED",
      categoryId: "", 
      typeId: "", 
      submissionId: submission.id
    },
  });

  // Update submission status
  await prisma.submission.update({
    where: { id },
    data: { status: SubmissionStatus.ACCEPTED },
  });

  
  revalidatePath("/admin/submissions/accepted");
  revalidatePath("/admin/submissions/converted");
  revalidatePath("/admin/resources/unpublished");
  return resource;
}