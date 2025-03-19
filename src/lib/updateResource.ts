"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { join } from "path";
import { randomUUID } from "crypto";
import fs from "fs/promises";
import { auth } from "../../auth";

const prisma = new PrismaClient();

const updateResourceSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Le titre est obligatoire"),
  description: z.string().min(1, "La description est obligatoire"),
  categoryId: z.string().min(1, "La catégorie est obligatoire"),
  typeId: z.string().min(1, "Le type de ressource est obligatoire"),
  authorId: z.string().optional(),
});

export type UpdateResourceInput = z.infer<typeof updateResourceSchema>;

export async function updateResourceWithFile(
  data: UpdateResourceInput,
  file: File | null,
  originalFilePath: string
) {
  try {
    const validatedData = updateResourceSchema.parse(data);

    await getSessionOrThrow();

    let fileUrl = originalFilePath;
    if (file) {
      fileUrl = await processUploadedFile(file);

      if (originalFilePath) {
        await deleteOldFile(originalFilePath);
      }
    }

    // Use a transaction to ensure both operations succeed or fail together
    const resource = await prisma.$transaction(async (tx) => {
      // Update the resource
      const updatedResource = await tx.resource.update({
        where: { id: validatedData.id },
        data: {
          title: validatedData.title,
          description: validatedData.description,
          path: fileUrl,
          category: {
            connect: { id: validatedData.categoryId },
          },
          type: {
            connect: { id: validatedData.typeId },
          },
          ...(validatedData.authorId
            ? {
                author: {
                  connect: { id: validatedData.authorId },
                },
              }
            : {
                author: {
                  disconnect: true,
                },
              }),
        },
      });

      return updatedResource;
    });

    // Revalidate the resources page
    revalidatePath("/resources");

    return { success: true, data: resource };
  } catch (error) {
    console.error("Error updating resource:", error);

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

async function deleteOldFile(filePath: string) {
  try {
    const fileName = filePath.split("/").pop();
    if (!fileName) return;

    const fullPath = join(process.cwd(), "public", filePath);

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

async function getSessionOrThrow() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Vous devez être connecté pour effectuer cette action");
  }

  return session;
}
