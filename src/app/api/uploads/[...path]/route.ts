// app/api/uploads/[...path]/route.js
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request, { params }) {
  console.log("CALLING GET FILE");

  try {
    const filePath = path.join(process.cwd(), "uploads", ...params.path);

    console.log("FILE PATH:", filePath);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return new NextResponse("File not found", { status: 404 });
    }

    // Read file as buffer
    const fileBuffer = fs.readFileSync(filePath);

    // Determine content type (basic implementation)
    const extension = path.extname(filePath).toLowerCase();
    const contentTypeMap = {
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".png": "image/png",
      ".gif": "image/gif",
      ".pdf": "application/pdf",
      // Add more types as needed
    };

    const contentType = contentTypeMap[extension] || "application/octet-stream";

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return new NextResponse("Error serving file", { status: 500 });
  }
}
