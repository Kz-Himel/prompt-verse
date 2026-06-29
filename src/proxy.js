import { NextResponse } from 'next/server';
import { auth } from './lib/auth';

export async function proxy(request) {
    const { pathname } = request.nextUrl;

    if (
      pathname.startsWith('/_next') || 
      pathname.startsWith('/api') ||
      pathname.includes('.')
    ) {
      return NextResponse.next();
    }

    if (pathname === '/prompts' || pathname === '/prompts/') {
      return NextResponse.next();
    }

    try {
      // Better Auth-এ সেশন চেক করা
      const session = await auth.api.getSession({
          headers: request.headers
      });

      // ২. সেশন না থাকলে সোজা লগইন পেজে রিডাইরেক্ট
      if (!session) {
          const loginUrl = new URL('/auth/login', request.url);
          loginUrl.searchParams.set('callbackUrl', pathname);

          return NextResponse.redirect(loginUrl);
      }
    } catch (err) {
      console.error("Auth proxy error:", err);
      return NextResponse.next();
    }

    return NextResponse.next();
}

export async function middleware(request) {
    return proxy(request);
}

// 🎯 ম্যাচার আগের মতোই থাকবে
export const config = {
  matcher: [
    "/dashboard/admin/:path*",
    "/dashboard/creator/:path*",
    "/dashboard/user/:path*",
    "/pricing", 
    "/checkout",
    "/prompts/:path*"
  ],
};