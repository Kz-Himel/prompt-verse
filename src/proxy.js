import { NextResponse } from 'next/server';
import { auth } from './lib/auth'; // আপনার Better Auth সার্ভার কনফিগ পাথ

export async function proxy(request) {
    const { pathname } = request.nextUrl;

    // ১. স্ট্যাটিক এবং ইন্টারনাল ফাইল ইগনোর
    if (
      pathname.startsWith('/_next') || 
      pathname.startsWith('/api') ||
      pathname.includes('.')
    ) {
      return NextResponse.next();
    }

    // 🎯 ম্যাজিক লজিক: যদি শুধু '/prompts' বা '/prompts/' হয় (ডিটেইলস পেজ না), তবে লগইন চেক ছাড়াই ছেড়ে দাও
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
    "/prompts/:path*" // 👈 এটা থাকবে, কিন্তু ভেতরের কন্ডিশন শুধু মেইন পেজটাকে ছাড় দেবে
  ],
};