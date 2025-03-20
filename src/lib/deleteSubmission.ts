"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

export async function deleteSubmission(submissionId: string) {
  try {
    // First get the submission to get the file path
    const submission = await prisma.submission.findUnique({
      where: { id: submissionId },
      select: { filepath: true },
    });

    if (!submission) {
      return {
        success: false,
        error: "Soumission introuvable",
      };
    }

    // Delete the submission from the database
    await prisma.submission.delete({
      where: { id: submissionId },
    });

    // Try to delete the file if it exists
    if (submission.filepath) {
      try {
        // Get the full path of the file
        const filePath = path.join(process.cwd(), "public", submission.filepath);
        
        // Check if file exists before attempting to delete
        await fs.access(filePath);
        await fs.unlink(filePath);
        console.log(`Deleted file: ${submission.filepath}`);
      } catch (fileError) {
        // Log but don't fail if the file doesn't exist or can't be deleted
        console.warn(`Could not delete file: ${submission.filepath}`, fileError);
      }
    }

    // Revalidate the submissions pages
    revalidatePath("/admin/submissions");
    revalidatePath("/submissions");

    return { success: true };
  } catch (error) {
    console.error("Error deleting submission:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Une erreur s'est produite lors de la suppression",
    };
  }
}