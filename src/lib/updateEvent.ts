"use server";

import { PrismaClient, MediaType } from "@prisma/client";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { UpdateEventInput } from "@/app/admin/events/[id]/edit/UpdateEventPage";

const prisma = new PrismaClient();

export async function updateEventWithFile(
  data: UpdateEventInput,
  file: File | null,
  currentMediaPath: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Check if we need to update the file
    let mediaPath = currentMediaPath;

    if (file) {
      // Get file extension and generate unique name
      const originalName = file.name;
      const extension = originalName.split(".").pop()?.toLowerCase() || "";
      const uniqueFileName = `${uuidv4()}.${extension}`;

      // Determine upload directory based on media type
      const uploadDir = path.join(process.cwd(), "uploads");

      // Create directory if it doesn't exist
      try {
        await fs.access(uploadDir);
      } catch {
        await fs.mkdir(uploadDir, { recursive: true });
      }

      // Set the new file path
      const filePath = path.join(uploadDir, uniqueFileName);

      // Convert File to ArrayBuffer and save it
      const buffer = await file.arrayBuffer();
      await fs.writeFile(filePath, Buffer.from(buffer));

      // Update the media path
      mediaPath = `/uploads/${uniqueFileName}`;

      // Delete the old file if it exists
      try {
        const oldFilePath = path.join(
          process.cwd(),
          "public",
          currentMediaPath
        );
        await fs.access(oldFilePath);
        await fs.unlink(oldFilePath);
      } catch (error) {
        console.warn(`Could not delete old file: ${currentMediaPath}`, error);
      }
    }

    // Update the database record
    await prisma.event.update({
      where: { id: data.id },
      data: {
        title: data.title,
        description: data.description,
        type: data.type,
        mediaPath: file ? mediaPath : currentMediaPath,
        updatedAt: new Date(),
      },
    });

    // Revalidate the events page
    revalidatePath("/admin/events");
    return { success: true };
  } catch (error) {
    console.error("Error updating event:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Une erreur s'est produite lors de la mise à jour de l'événement",
    };
  }
}
