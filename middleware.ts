import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// List your supported locales
const locales = ["en", "fr", "ar"];
const defaultLocale = "en";

// Routes that require authentication
const authRoutes = ["/submit", "/admin"];

// Admin-only routes
const adminRoutes = ["/admin"];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Language handling part (from your i18n setup)
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    // Extract locale from accept-language header
    const acceptLanguage =
      request.headers.get("accept-language")?.split(",")[0].split("-")[0] ||
      defaultLocale;
    const locale = locales.includes(acceptLanguage)
      ? acceptLanguage
      : defaultLocale;

    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
        request.url
      )
    );
  }

  // Extract the locale and the path without locale
  const parts = pathname.split("/");
  const locale = parts[1];
  const path = "/" + parts.slice(2).join("/");

  // Auth protection
  const isAuthRoute = authRoutes.some((route) => path.startsWith(route));
  const isAdminRoute = adminRoutes.some((route) => path.startsWith(route));

  if (isAuthRoute) {
    const token = await getToken({ req: request });

    // No token - redirect to login
    if (!token) {
      return NextResponse.redirect(
        new URL(`/${locale}/auth/login`, request.url)
      );
    }

    // Admin routes check
    if (isAdminRoute && token.role !== "ADMIN") {
      return NextResponse.redirect(
        new URL(`/${locale}/auth/unauthorized`, request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  // Match all paths except static assets, images and API routes
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|robots.txt).*)"],
};
