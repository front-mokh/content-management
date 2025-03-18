"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { writeFile } from "fs/promises";
import { join } from "path";
import { randomUUID } from "crypto";
import fs from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

// Define the schema for resource creation
const addResourceSchema = z.object({
  title: z.string().min(1, "Le titre est obligatoire"),
  description: z.string().min(1, "La description est obligatoire"),
  categoryId: z.string().min(1, "La catégorie est obligatoire"),
  typeId: z.string().min(1, "Le type de ressource est obligatoire"),
  authorId: z.string().optional(),
});

export type CreateResourceInput = z.infer<typeof addResourceSchema>;

export async function createResourceWithFile(
  data: CreateResourceInput,
  file: File
) {
  try {
    // Validate input data
    const validatedData = addResourceSchema.parse(data);

    // Get the current user ID (you'll need to implement auth in your application)
    // This is just a placeholder - replace with your actual auth logic
    const session = await getSessionOrThrow();
    const userId = session.user.id;

    // Process the file
    const fileUrl = await processUploadedFile(file);

    // Use a transaction to ensure both operations succeed or fail together
    const resource = await prisma.$transaction(async (tx) => {
      // Create the resource
      const newResource = await tx.resource.create({
        data: {
          title: validatedData.title,
          description: validatedData.description,
          path: fileUrl,
          status: "PENDING", // Default status
          views: 0n,
          upvotes: 0n,
          category: {
            connect: { id: validatedData.categoryId },
          },
          type: {
            connect: { id: validatedData.typeId },
          },
          handler: {
            connect: { id: userId },
          },
          ...(validatedData.authorId && {
            author: {
              connect: { id: validatedData.authorId },
            },
          }),
        },
      });

      return newResource;
    });

    // Revalidate the resources page
    revalidatePath("/resources");

    return { success: true, data: resource };
  } catch (error) {
    console.error("Error creating resource:", error);

    // Clean up any created files in case of error
    // Note: We would need to know the file path here, which we don't
    // This is why handling this in a transaction is important

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

// Helper function to get the current session
// Replace this with your actual auth logic
async function getSessionOrThrow() {
  // This is a placeholder - implement your actual session management
  const session = { user: { id: "user-id-placeholder" } };

  if (!session?.user?.id) {
    throw new Error("Vous devez être connecté pour effectuer cette action");
  }

  return session;
}

// A cleanup job that should run periodically to remove orphaned files
// This could be triggered by a cron job or similar mechanism
export async function cleanupOrphanedFiles() {
  try {
    const uploadDir = join(process.cwd(), "public", "uploads");
    const files = await fs.readdir(uploadDir);

    for (const file of files) {
      // Skip hidden files and directories
      if (file.startsWith(".")) continue;

      const filePath = path.join(uploadDir, file);
      const stats = await fs.stat(filePath);

      // Check if the file is older than 24 hours
      const fileAge = Date.now() - stats.mtime.getTime();
      const oneDayInMs = 24 * 60 * 60 * 1000;

      if (fileAge > oneDayInMs) {
        // Check if this file is referenced in the database
        const fileUrl = `/uploads/${file}`;
        const resource = await prisma.resource.findFirst({
          where: { path: fileUrl },
        });

        // If no resource references this file, delete it
        if (!resource) {
          await fs.unlink(filePath);
          console.log(`Deleted orphaned file: ${file}`);
        }
      }
    }

    return { success: true };
  } catch (error) {
    console.error("Error cleaning up orphaned files:", error);
    return { success: false, error: "Failed to clean up orphaned files" };
  }
}
