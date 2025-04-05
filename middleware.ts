import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import fs from "fs/promises";
import path from "path";

export async function middleware(request: NextRequest) {
  console.log(
    "#############################################################################"
  );

  console.log("Middleware running for path:", request.nextUrl.pathname);
  console.log(
    "#############################################################################"
  );

  const url = request.nextUrl;

  const pathname = url.pathname;

  if (request.nextUrl.pathname.startsWith("/uploads/")) {
    const filePath = path.join(
      process.cwd(),
      "uploads",
      request.nextUrl.pathname.slice("/uploads/".length)
    );

    try {
      if (fs.access(filePath)) {
        const fileBuffer = fs.readFile(filePath);
        const extension = path.extname(filePath).toLowerCase();

        // Same content type map as before
        const contentTypeMap = {
          ".jpg": "image/jpeg",
          ".jpeg": "image/jpeg",
          ".png": "image/png",
          ".gif": "image/gif",
          ".pdf": "application/pdf",
        };

        const contentType =
          contentTypeMap[extension] || "application/octet-stream";

        return new NextResponse(fileBuffer, {
          headers: {
            "Content-Type": contentType,
            "Cache-Control": "no-store",
          },
        });
      }
    } catch {
      // Handle error
    }
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const publicRoutes = ["/auth/signin", "/api/auth"];

  const isAdminRoute = pathname.startsWith("/admin");

  console.log({ pathname }, { isAdminRoute }, { token });

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const signinUrl = new URL("/auth/signin", request.url);

  if (isPublicRoute) {
    return NextResponse.next();
  }

  if (isAdminRoute && !token) {
    return NextResponse.redirect(signinUrl);
  }

  if (token && pathname.startsWith("/auth") && !pathname.includes("signout")) {
    const dashboardUrl = new URL("/admin", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/(.*)", "/uploads/:path*"],
};
