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
async function processUploadedFile(file: File, subfolder: string = ""): Promise<string> {
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${randomUUID()}-${file.name.replace(/\s/g, "_")}`;
    
    // Create base upload directory
    const baseUploadDir = join(process.cwd(), "uploads");
    await fs.mkdir(baseUploadDir, { recursive: true });
    
    // Create subfolder if specified
    const uploadDir = subfolder 
      ? join(baseUploadDir, subfolder) 
      : baseUploadDir;
    
    await fs.mkdir(uploadDir, { recursive: true });
    const filePath = join(uploadDir, fileName);
    await fs.writeFile(filePath, buffer);
    
    return subfolder 
      ? `/uploads/${subfolder}/${fileName}` 
      : `/uploads/${fileName}`;
  } catch (error) {
    console.error("Error processing file:", error);
    throw new Error("Erreur lors du traitement du fichier.");
  }
}

// --- Zod Schema for Event Creation ---
const addEventSchema = z.object({
  title: z.string().min(1, "Le titre est obligatoire"),
  description: z.string().optional(),
  type: z.nativeEnum(MediaType),
});

export type CreateEventInput = z.infer<typeof addEventSchema>;

// --- Server Action to Create Event with File Upload ---
export async function createEventWithFile(
  data: CreateEventInput, 
  mediaFile: File, 
  pdfFile?: File | null
) {
  try {
    // --- Optional: Authentication Check ---
    // const session = await getSessionOrThrow();
    const validatedData = addEventSchema.parse(data);

    // --- Media File Type Validation ---
    if (
      validatedData.type === MediaType.IMAGE &&
      !mediaFile.type.startsWith("image/")
    ) {
      throw new Error("Le fichier média fourni doit être une image.");
    }
    if (
      validatedData.type === MediaType.VIDEO &&
      !mediaFile.type.startsWith("video/")
    ) {
      throw new Error("Le fichier média fourni doit être une vidéo.");
    }

    // --- PDF File Type Validation (if provided) ---
    if (pdfFile && !pdfFile.type.includes("pdf")) {
      throw new Error("Le document supplémentaire doit être un fichier PDF.");
    }

    // Process the media file
    const mediaPath = await processUploadedFile(mediaFile, "media");
    
    // Process the PDF file if provided
    let pdfPath: string | null = null;
    if (pdfFile) {
      pdfPath = await processUploadedFile(pdfFile, "pdf");
    }

    // Create the event with both media and optional PDF
    const event = await prisma.event.create({
      data: {
        title: validatedData.title,
        description: validatedData.description,
        type: validatedData.type,
        mediaPath: mediaPath,
        ...(pdfPath && { pdfPath }), // Add pdfPath only if it exists
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
