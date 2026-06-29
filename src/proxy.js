import { NextResponse } from 'next/server';
import { auth } from './lib/auth'; // আপনার Better Auth সার্ভার কনফিগ পাথ
import { headers } from 'next/headers';

// 🎯 Next.js 16 এ মেইন ফাংশনের নাম এখন 'proxy'
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

    try {
      // 🎯 সেশন চেক করার একদম সেফ ও আধুনিক উপায়
      const session = await auth.api.getSession({
          headers: await headers()
      });

      // ২. সেশন না থাকলে সোজা লগইন পেজে রিডাইরেক্ট
      if (!session) {
          return NextResponse.redirect(new URL('/auth/login', request.url));
      }
    } catch (err) {
      console.error("Auth proxy error:", err);
      // কোনো কারণে ইন্টারনাল ফেইল করলে সেফটির জন্য রিকোয়েস্ট পাস করে দেওয়া
      return NextResponse.next();
    }

    return NextResponse.next();
}

// 🎯 কোন কোন রাউটে পাহারা বসবে (ম্যাচার আগের মতোই থাকবে)
export const config = {
  matcher: [
    "/dashboard/admin/:path*",
    "/dashboard/creator/:path*",
    "/dashboard/user/:path*",
    "/pricing",
    "/checkout",
    "/prompts/:id" 
  ],
};