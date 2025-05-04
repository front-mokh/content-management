// lib/createEvent.ts
"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { PrismaClient, MediaType } from "@prisma/client";
import { join } from "path";
import { randomUUID } from "crypto";
import fs from "fs/promises";
// import { auth } from "@/auth"; // Uncomment if auth is needed

const prisma = new PrismaClient();

// --- Reusable File Processing Utility ---
// (Ensure this is consistent with your setup, especially the 'uploads' directory)
async function processUploadedFile(file: File): Promise<string> {
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${randomUUID()}-${file.name.replace(/\s/g, "_")}`;
    const uploadDir = join(process.cwd(), "uploads"); // Or "public/uploads" if served directly
    await fs.mkdir(uploadDir, { recursive: true });
    const filePath = join(uploadDir, fileName);
    await fs.writeFile(filePath, buffer);
    return `/uploads/${fileName}`; // Path accessible by the client
  } catch (error) {
    console.error("Error processing file:", error);
    throw new Error("Erreur lors du traitement du fichier média.");
  }
}

// --- Optional Auth Check Utility ---
// async function getSessionOrThrow() { ... } // If needed

// --- Zod Schema for Event Creation ---
const addEventSchema = z.object({
  title: z.string().min(1, "Le titre est obligatoire"),
  description: z.string().optional(),
  type: z.nativeEnum(MediaType),
});

export type CreateEventInput = z.infer<typeof addEventSchema>;

// --- Server Action to Create Event with File Upload ---
export async function createEventWithFile(data: CreateEventInput, file: File) {
  try {
    // --- Optional: Authentication Check ---
    // const session = await getSessionOrThrow();

    const validatedData = addEventSchema.parse(data);

    // --- Optional: File Type Validation ---
    if (
      validatedData.type === MediaType.IMAGE &&
      !file.type.startsWith("image/")
    ) {
      throw new Error("Le fichier fourni doit être une image.");
    }
    if (
      validatedData.type === MediaType.VIDEO &&
      !file.type.startsWith("video/")
    ) {
      throw new Error("Le fichier fourni doit être une vidéo.");
    }

    const mediaPath = await processUploadedFile(file);

    const event = await prisma.event.create({
      data: {
        title: validatedData.title,
        description: validatedData.description,
        type: validatedData.type,
        mediaPath: mediaPath,
        // createdById: userId, // If linking event to user
      },
    });

    revalidatePath("/admin/events");

    return { success: true, data: event };
  } catch (error) {
    console.error("Error creating event:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Une erreur s'est produite lors de la création de l'événement",
    };
  }
}
