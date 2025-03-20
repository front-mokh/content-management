"use server";

import { PrismaClient, SubmissionStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function acceptSubmission(submissionId: string) {
  try {
    const submission = await prisma.submission.update({
      where: { id: submissionId },
      data: { status: SubmissionStatus.ACCEPTED },
    });

    revalidatePath("/admin/submissions/pending");
    revalidatePath("/admin/submissions/accepted");

    return { success: true, data: submission };
  } catch (error) {
    console.error("Error accepting submission:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Une erreur s'est produite lors de l'acceptation",
    };
  }
}

export async function rejectSubmission(submissionId: string) {
  try {
    const submission = await prisma.submission.update({
      where: { id: submissionId },
      data: { status: SubmissionStatus.REJECTED },
    });

    revalidatePath("/admin/submissions/pending");
    revalidatePath("/admin/submissions/rejected");

    return { success: true, data: submission };
  } catch (error) {
    console.error("Error rejecting submission:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Une erreur s'est produite lors du rejet",
    };
  }
}