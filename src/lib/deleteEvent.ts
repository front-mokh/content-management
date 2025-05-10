"use server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

// Helper function to delete a file safely
async function deleteFileIfExists(filePath: string | null): Promise<void> {
  if (!filePath) return;
  
  try {
    // Handle paths starting with /uploads differently than relative paths
    const resolvedPath = filePath.startsWith('/uploads')
      ? path.join(process.cwd(), filePath.substring(1)) // Remove the leading slash
      : path.join(process.cwd(), "uploads", path.basename(filePath));
      
    await fs.access(resolvedPath);
    await fs.unlink(resolvedPath);
    console.log(`Deleted file: ${filePath}`);
  } catch (error: any) {
    if (error.code === "ENOENT") {
      console.warn(`File not found, skipping deletion: ${filePath}`);
    } else {
      console.error(`Failed to delete file ${filePath}:`, error);
    }
  }
}

// --- Server Action to Delete Event and its Files ---
export async function deleteEvent(eventId: string) {
  try {
    // --- Optional: Authentication/Authorization Check ---
    // const session = await auth(); // Or getSessionOrThrow()
    
    // 1. Find the event to get the mediaPath and pdfPath
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      select: { mediaPath: true, pdfPath: true },
    });
    
    if (!event) {
      console.log(`Event not found for deletion: ${eventId}`);
      return { success: true, message: "Événement non trouvé." };
    }
    
    // 2. Delete the event record from the database
    await prisma.event.delete({
      where: { id: eventId },
    });
    
    // 3. Delete the associated media file
    await deleteFileIfExists(event.mediaPath);
    
    // 4. Delete the associated PDF file if it exists
    if (event.pdfPath) {
      await deleteFileIfExists(event.pdfPath);
    }
    
    revalidatePath("/admin/events");
    return { success: true };
  } catch (error) {
    console.error("Error deleting event:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Une erreur s'est produite lors de la suppression de l'événement",
    };
  }
}