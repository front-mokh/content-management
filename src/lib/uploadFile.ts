"use server";

import { writeFile } from "fs/promises";
import { join } from "path";
import { randomUUID } from "crypto";

interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

export async function uploadFile(file: File): Promise<UploadResult> {
  try {
    // Read file content
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate a unique filename
    const fileName = `${randomUUID()}-${file.name.replace(/\s/g, "_")}`;

    // Set the upload directory - make sure this directory exists and is writable
    const uploadDir = join(process.cwd(), "public", "uploads");

    // Create the full path
    const path = join(uploadDir, fileName);

    // Write the file to the uploads directory
    await writeFile(path, buffer);

    // Return the URL that can be used to access the file
    const url = `/uploads/${fileName}`;

    return {
      success: true,
      url,
    };
  } catch (error) {
    console.error("Error uploading file:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Une erreur s'est produite lors du téléchargement du fichier",
    };
  }
}
