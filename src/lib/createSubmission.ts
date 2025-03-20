"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { join } from "path";
import { randomUUID } from "crypto";
import fs from "fs/promises";

const prisma = new PrismaClient();

const addSubmissionSchema = z.object({
  firstName: z.string().min(1, "Le prénom est obligatoire"),
  lastName: z.string().min(1, "Le nom est obligatoire"),
  email: z.string().email("L'adresse email doit être valide"),
  phone: z.string().optional(),
  message: z.string().optional(),
  author: z.string().min(1, "Le nom de l'auteur est obligatoire"),
});

export type CreateSubmissionInput = z.infer<typeof addSubmissionSchema>;

export async function createSubmissionWithFile(
  data: CreateSubmissionInput,
  file: File
) {
  try {
    const validatedData = addSubmissionSchema.parse(data);

    const fileUrl = await processUploadedFile(file);

    const submission = await prisma.submission.create({
      data: {
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email,
        phone: validatedData.phone,
        message: validatedData.message,
        author: validatedData.author,
        filepath: fileUrl,
        status: "PENDING",
      },
    });

    revalidatePath("/submissions");

    return { success: true, data: submission };
  } catch (error) {
    console.error("Error creating submission:", error);

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
    const uploadDir = join(process.cwd(), "public", "uploads");

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