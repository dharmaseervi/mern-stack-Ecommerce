
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";


export async function middleware(request) {
    const path = request.nextUrl.pathname;
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    const publicPath = path === '/signin' || path === '/register';

    if (token && publicPath) {
        return NextResponse.redirect(new URL('/', request.nextUrl));

    }
    if (!token && !publicPath) {
        return NextResponse.redirect(new URL('/signin', request.nextUrl));
    }

}

export const config = {
    matcher: ['/', '/register', '/signin']
}

