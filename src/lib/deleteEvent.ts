// lib/deleteEvent.ts
"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path"; // Import path

const prisma = new PrismaClient();

// --- Server Action to Delete Event and its File ---
export async function deleteEvent(eventId: string) {
  try {
    // --- Optional: Authentication/Authorization Check ---
    // const session = await auth(); // Or getSessionOrThrow()
    // Check if user has permission

    // 1. Find the event to get the mediaPath
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      select: { mediaPath: true },
    });

    if (!event) {
      console.log(`Event not found for deletion: ${eventId}`);
      return { success: true, message: "Événement non trouvé." };
    }

    // 2. Delete the event record from the database
    await prisma.event.delete({
      where: { id: eventId },
    });

    // 3. Delete the associated media file from the server
    if (event.mediaPath) {
      try {
        // IMPORTANT: Adjust this path construction if needed!
        const filePath = path.join(
          process.cwd(),
          "uploads",
          path.basename(event.mediaPath)
        );
        // console.log(`Attempting to delete file at: ${filePath}`); // Debugging

        await fs.unlink(filePath);
        console.log(`Deleted media file: ${event.mediaPath}`);
      } catch (fileError: any) {
        if (fileError.code === "ENOENT") {
          console.warn(
            `Media file not found, skipping deletion: ${event.mediaPath}`
          );
        } else {
          console.error(
            `Failed to delete media file ${event.mediaPath}:`,
            fileError.message
          );
        }
      }
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
