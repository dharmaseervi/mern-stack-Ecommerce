import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const path = request.nextUrl.pathname;
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const privatePaths = ["/useraccount", "/order", "/address", "/register"]; // Add your private paths here

  if (!token && privatePaths.includes(path)) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  // Check if the path starts with '/register/'
  if (!token && request.nextUrl.pathname.startsWith("/register/")) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
}

export const config = {
  // Matcher for all paths
  matcher: ({ req }) => {
    // Match all routes except for API routes
    if (!req.nextUrl.pathname.startsWith("/api")) {
      return { match: true };
    }
    return { match: false };
  },
};
