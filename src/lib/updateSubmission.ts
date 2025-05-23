"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { join } from "path";
import { randomUUID } from "crypto";
import fs from "fs/promises";

const prisma = new PrismaClient();

const updateSubmissionSchema = z.object({
  id: z.string(),
  firstName: z.string().min(1, "Le prénom est obligatoire"),
  lastName: z.string().min(1, "Le nom est obligatoire"),
  email: z.string().email("L'adresse email doit être valide"),
  phone: z.string().optional(),
  message: z.string().optional(),
  author: z.string().min(1, "Le nom de l'auteur est obligatoire"),
  status: z.enum(["PENDING", "ACCEPTED", "REJECTED"]).optional(),
});

export type UpdateSubmissionInput = z.infer<typeof updateSubmissionSchema>;

export async function updateSubmissionWithFile(
  data: UpdateSubmissionInput,
  file: File | null,
  originalFilePath: string
) {
  try {
    const validatedData = updateSubmissionSchema.parse(data);

    let fileUrl = originalFilePath;
    if (file) {
      fileUrl = await processUploadedFile(file);

      if (originalFilePath) {
        await deleteOldFile(originalFilePath);
      }
    }

    // Use a transaction to ensure both operations succeed or fail together
    const submission = await prisma.$transaction(async (tx) => {
      // Update the submission
      const updatedSubmission = await tx.submission.update({
        where: { id: validatedData.id },
        data: {
          firstName: validatedData.firstName,
          lastName: validatedData.lastName,
          email: validatedData.email,
          phone: validatedData.phone,
          message: validatedData.message,
          author: validatedData.author,
          filepath: fileUrl,
          ...(validatedData.status && { status: validatedData.status }),
        },
      });

      return updatedSubmission;
    });

    // Revalidate the submissions pages
    revalidatePath("/admin/submissions");
    revalidatePath("/submissions");

    return { success: true, data: submission };
  } catch (error) {
    console.error("Error updating submission:", error);

    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Une erreur s'est produite",
    };
  }
}

async function processUploadedFile(file: File): Promise<string> {
  try {
    // Read file content
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate a unique filename
    const fileName = `${randomUUID()}-${file.name.replace(/\s/g, "_")}`;

    // Set the upload directory - make sure this directory exists and is writable
    const uploadDir = join(process.cwd(), "uploads");

    // Ensure the directory exists
    await fs.mkdir(uploadDir, { recursive: true });

    // Create the full path
    const filePath = join(uploadDir, fileName);

    // Write the file to the uploads directory
    await fs.writeFile(filePath, buffer);

    // Return the URL that can be used to access the file
    return `/uploads/${fileName}`;
  } catch (error) {
    console.error("Error processing file:", error);
    throw new Error("Erreur lors du traitement du fichier");
  }
}

async function deleteOldFile(filePath: string) {
  try {
    const fileName = filePath.split("/").pop();
    if (!fileName) return;

    const fullPath = join(process.cwd(), filePath);

    try {
      await fs.access(fullPath);
      await fs.unlink(fullPath);
      console.log(`Deleted old file: ${fileName}`);
    } catch (error) {
      console.warn(`Could not delete old file at ${fullPath}:`, error);
    }
  } catch (error) {
    console.error("Error deleting old file:", error);
  }
}
