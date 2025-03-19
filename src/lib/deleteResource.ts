"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

export async function deleteResource(resourceId: string) {
  try {
    // First get the resource to get the file path
    const resource = await prisma.resource.findUnique({
      where: { id: resourceId },
      select: { path: true },
    });

    if (!resource) {
      return {
        success: false,
        error: "Ressource introuvable",
      };
    }

    // Delete the resource from the database
    await prisma.resource.delete({
      where: { id: resourceId },
    });

    // Try to delete the file if it exists
    if (resource.path) {
      try {
        // Get the full path of the file
        const filePath = path.join(process.cwd(), "public", resource.path);

        // Check if file exists before attempting to delete
        await fs.access(filePath);
        await fs.unlink(filePath);
        console.log(`Deleted file: ${resource.path}`);
      } catch (fileError) {
        // Log but don't fail if the file doesn't exist or can't be deleted
        console.warn(`Could not delete file: ${resource.path}`, fileError);
      }
    }

    // Revalidate the resources page
    revalidatePath("/resources");

    return { success: true };
  } catch (error) {
    console.error("Error deleting resource:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Une erreur s'est produite lors de la suppression",
    };
  }
}
