// lib/services/VillageService.ts
"use server";
import { PrismaClient, Village, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

const prisma = new PrismaClient();

// --- Zod Schema for Village Creation ---
const createVillageSchema = z.object({
  title: z.string().min(1, "Le titre est obligatoire"),
  description: z.string().optional(),
});

const updateVillageSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Le titre est obligatoire"),
  description: z.string().optional(),
});

export type CreateVillageInput = z.infer<typeof createVillageSchema>;
export type UpdateVillageInput = z.infer<typeof updateVillageSchema>;

// --- Reusable File Processing Utility ---
async function processFile(file: File, subfolder: string = ""): Promise<string> {
  try {
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
  } catch (error) {
    console.error("Error processing file:", error);
    throw new Error("Erreur lors du traitement du fichier.");
  }
}

// --- Helper function to delete a file ---
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.code === "ENOENT") {
      console.warn(`File not found, skipping deletion: ${filePath}`);
    } else {
      console.error(`Failed to delete file ${filePath}:`, error);
    }
  }
}

// --- CRUD Operations ---

export async function getAllVillages(): Promise<Village[]> {
  try {
    const villages = await prisma.village.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return villages;
  } catch (error) {
    console.error("Error fetching villages:", error);
    throw new Error("Could not fetch villages.");
  }
}

export async function getVillageById(id: string): Promise<Village | null> {
  try {
    const village = await prisma.village.findUnique({
      where: { id },
    });
    return village;
  } catch (error) {
    console.error(`Error fetching village with id ${id}:`, error);
    throw new Error("Could not fetch village.");
  }
}

// --- Create Village with Image Upload ---
export async function createVillageWithFile(
  data: CreateVillageInput,
  imageFile: File
): Promise<{ success: boolean; data?: Village; error?: string }> {
  try {
    // Validate input data
    const validatedData = createVillageSchema.parse(data);

    // Validate that the file is an image
    if (!imageFile.type.startsWith("image/")) {
      return {
        success: false,
        error: "Le fichier fourni doit être une image."
      };
    }

    // Process the image file
    const mediaPath = await processFile(imageFile, "images");

    // Create the village record
    const village = await prisma.village.create({
      data: {
        title: validatedData.title,
        description: validatedData.description,
        mediaPath: mediaPath,
      },
    });

    // Revalidate the villages page
    revalidatePath("/admin/villages");
    
    return { success: true, data: village };
  } catch (error) {
    console.error("Error creating village:", error);
    return {
      success: false,
      error: error instanceof Error 
        ? error.message 
        : "Une erreur s'est produite lors de la création du village"
    };
  }
}

// --- Update Village with Optional Image Upload ---
export async function updateVillageWithFile(
  data: UpdateVillageInput,
  imageFile: File | null,
  currentMediaPath: string
): Promise<{ success: boolean; data?: Village; error?: string }> {
  try {
    // Validate input data
    const validatedData = updateVillageSchema.parse(data);

    // Handle image file if present
    let mediaPath = currentMediaPath;
    if (imageFile) {
      // Validate that the file is an image
      if (!imageFile.type.startsWith("image/")) {
        return {
          success: false,
          error: "Le fichier fourni doit être une image."
        };
      }

      // Process the new image file
      mediaPath = await processFile(imageFile, "images");
      
      // Delete the old image file
      await deleteFile(currentMediaPath);
    }

    // Update the database record
    const village = await prisma.village.update({
      where: { id: validatedData.id },
      data: {
        title: validatedData.title,
        description: validatedData.description,
        mediaPath: mediaPath,
        updatedAt: new Date(),
      },
    });

    // Revalidate the villages page
    revalidatePath("/admin/villages");
    
    return { success: true, data: village };
  } catch (error) {
    console.error("Error updating village:", error);
    return {
      success: false,
      error: error instanceof Error 
        ? error.message 
        : "Une erreur s'est produite lors de la mise à jour du village"
    };
  }
}

// --- Update Village without File (for text-only updates) ---
export async function updateVillage(
  id: string,
  data: Prisma.VillageUpdateInput
): Promise<Village> {
  try {
    const village = await prisma.village.update({ 
      where: { id }, 
      data: {
        ...data,
        updatedAt: new Date(),
      }
    });
    
    // Revalidate the villages page
    revalidatePath("/admin/villages");
    
    return village;
  } catch (error) {
    console.error(`Error updating village record ${id}:`, error);
    throw new Error("Could not update village record.");
  }
}

// --- Delete Village and its associated file ---
export async function deleteVillageRecord(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    // First, get the village to access the mediaPath
    const village = await prisma.village.findUnique({
      where: { id },
      select: { mediaPath: true }
    });

    if (!village) {
      return {
        success: false,
        error: "Village not found."
      };
    }

    // Delete the village record
    await prisma.village.delete({ where: { id } });

    // Delete the associated image file
    if (village.mediaPath) {
      await deleteFile(village.mediaPath);
    }

    // Revalidate the villages page
    revalidatePath("/admin/villages");
    
    return { success: true };
  } catch (error) {
    console.error(`Error deleting village record ${id}:`, error);
    return {
      success: false,
      error: error instanceof Error 
        ? error.message 
        : "Could not delete village record."
    };
  }
}