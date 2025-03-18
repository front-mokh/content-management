import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  console.log("Middleware running for path:", request.nextUrl.pathname);
  const { pathname } = request.nextUrl;

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
  matcher: ["/admin", "/admin/:path*", "/auth/:path*"],
};
