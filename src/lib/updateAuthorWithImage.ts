"use server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { join } from "path";
import { randomUUID } from "crypto";
import fs from "fs/promises";
import { AuthorCategory } from "@prisma/client";
const prisma = new PrismaClient();

// Reusable File Processing Utility
async function processUploadedFile(file: File): Promise<string> {
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Create a clean filename - use UUID to avoid collisions
    const fileName = `${randomUUID()}-${file.name.replace(/\s/g, "_")}`;
    
    // Ensure upload directory exists
    const uploadDir = join(process.cwd(), "uploads", "authors");
    await fs.mkdir(uploadDir, { recursive: true });
    
    // Write file to disk
    const filePath = join(uploadDir, fileName);
    await fs.writeFile(filePath, buffer);
    
    // Return the path that will be stored in the database
    return `/uploads/authors/${fileName}`;
  } catch (error) {
    console.error("Error processing file:", error);
    throw new Error("Erreur lors du traitement de l'image.");
  }
}

// Zod Schema for Author Update
const updateAuthorSchema = z.object({
  firstName: z.string().min(1, "Le prénom est obligatoire"),
  lastName: z.string().min(1, "Le nom est obligatoire"),
  description: z.string().optional(),
  category: z.nativeEnum(AuthorCategory).optional().default(AuthorCategory.ECRIVAINS)
});

export type UpdateAuthorWithImageInput = z.infer<typeof updateAuthorSchema>;

// Server Action to Update Author with Optional Image Upload
export async function updateAuthorWithImage(
  id: string,
  data: UpdateAuthorWithImageInput, 
  file: File | null,
  currentImagePath?: string
) {
  try {
    // Validate the input data
    const validatedData = updateAuthorSchema.parse(data);
    
    // Process image if provided
    let imagePath = currentImagePath;
    
    if (file) {
      // Optional: Validate that file is an image
      if (!file.type.startsWith("image/")) {
        throw new Error("Le fichier fourni doit être une image.");
      }
      
      // Delete the old image if it exists
      if (currentImagePath) {
        try {
          const oldFilePath = join(process.cwd(), currentImagePath.substring(1));
          await fs.unlink(oldFilePath);
        } catch (err) {
          console.warn("Could not delete previous image file", err);
          // Continue with update even if delete fails
        }
      }
      
      imagePath = await processUploadedFile(file);
    }
    
    // Update the author with the processed data
    const author = await prisma.author.update({
      where: { id },
      data: {
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        description: validatedData.description,
        imagePath: imagePath,
        category: validatedData.category || "ECRIVAINS", // Default to ECRIVAINS if not provided
      },
    });
    
    // Revalidate the authors page
    revalidatePath("/admin/authors");
    
    return { success: true, data: author };
  } catch (error) {
    console.error(`Error updating author ${id}:`, error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Une erreur s'est produite lors de la mise à jour de l'auteur",
    };
  }
}