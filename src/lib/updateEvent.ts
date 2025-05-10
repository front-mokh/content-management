"use server";
import { PrismaClient, MediaType } from "@prisma/client";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { UpdateEventInput } from "@/app/admin/events/[id]/edit/UpdateEventPage";

const prisma = new PrismaClient();

// Helper function to process file upload
async function processFile(file: File, subfolder: string = ""): Promise<string> {
  // Get file extension and generate unique name
  const originalName = file.name;
  const extension = originalName.split(".").pop()?.toLowerCase() || "";
  const uniqueFileName = `${uuidv4()}.${extension}`;
  
  // Determine base upload directory and create if needed
  const baseUploadDir = path.join(process.cwd(), "uploads");
  await fs.mkdir(baseUploadDir, { recursive: true });
  
  // Create subfolder if specified
  const uploadDir = subfolder 
    ? path.join(baseUploadDir, subfolder) 
    : baseUploadDir;
  
  await fs.mkdir(uploadDir, { recursive: true });
  
  // Set the file path and save the file
  const filePath = path.join(uploadDir, uniqueFileName);
  
  // Convert File to ArrayBuffer and save it
  const buffer = await file.arrayBuffer();
  await fs.writeFile(filePath, Buffer.from(buffer));
  
  // Return the public path
  return subfolder 
    ? `/uploads/${subfolder}/${uniqueFileName}` 
    : `/uploads/${uniqueFileName}`;
}

// Helper function to delete a file
async function deleteFile(filePath: string): Promise<void> {
  if (!filePath) return;
  
  try {
    // Check if path starts with /uploads
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

export async function updateEventWithFile(
  data: UpdateEventInput,
  mediaFile: File | null,
  currentMediaPath: string,
  pdfFile: File | null = null,
  currentPdfPath: string | null = null,
  removePdf: boolean = false
): Promise<{ success: boolean; error?: string }> {
  try {
    // 1. Handle media file if present
    let mediaPath = currentMediaPath;
    if (mediaFile) {
      // Process the new media file
      const subfolder = data.type === MediaType.IMAGE ? "images" : "videos";
      mediaPath = await processFile(mediaFile, subfolder);
      
      // Delete the old media file
      await deleteFile(currentMediaPath);
    }
    
    // 2. Handle PDF file
    let pdfPath = currentPdfPath;
    
    // If a PDF should be removed
    if (removePdf && currentPdfPath) {
      await deleteFile(currentPdfPath);
      pdfPath = null;
    }
    
    // If a new PDF is uploaded
    if (pdfFile) {
      // Validate it's a PDF
      if (!pdfFile.type.includes('pdf')) {
        return {
          success: false,
          error: "Le fichier doit être au format PDF."
        };
      }
      
      // Upload the new PDF
      pdfPath = await processFile(pdfFile, "pdf");
      
      // Delete old PDF if it exists and we're replacing it
      if (currentPdfPath && !removePdf) {
        await deleteFile(currentPdfPath);
      }
    }
    
    // 3. Update the database record
    await prisma.event.update({
      where: { id: data.id },
      data: {
        title: data.title,
        description: data.description,
        type: data.type,
        mediaPath: mediaPath,
        pdfPath: pdfPath, // Update with new PDF path or null if removed
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