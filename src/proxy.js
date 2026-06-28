import { NextResponse } from 'next/server'
import { auth } from './lib/auth'
import { headers } from 'next/headers'
 
export async function proxy(request) {
    const { pathname } = request.nextUrl;

    if (
      pathname.startsWith('/_next') || 
      pathname.startsWith('/api') ||
      pathname.includes('.')
    ) {
      return NextResponse.next();
    }

    const session = await auth.api.getSession({
        headers: await headers()
    })

    if(!session) {
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    return NextResponse.next();
}
 
export const config = {
  matcher: [
    "/dashboard/admin",
    "/dashboard/creator",
    "/dashboard/user",
    "/pricing",
    "/checkout",
    "/prompts/:path*" 
  ],
}