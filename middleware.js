import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const path = request.nextUrl.pathname;
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const privatePaths = ["/useraccounts", "/userorder", "/savedaddress", ]; // Add your private paths here

  if (!token && privatePaths.includes(path)) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  // Check if the path starts with '/register/'
  if (!token && request.nextUrl.pathname.startsWith("/signup/")) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  if (!token && request.nextUrl.pathname.startsWith("/userorder/")) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
}

export const config = {
  // Matcher for all paths
  matcher: ({ req }) => {
    // Match all routes except for API routes and private paths
    const privatePaths = ["/useraccounts", "/userorder", "/savedaddress"];
    const isPrivatePath = privatePaths.some(path => req.url.startsWith(path));
    return !req.url.startsWith("/api") && isPrivatePath;
  },
};

