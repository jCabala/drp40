import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the request is for the root URL
  if (request.nextUrl.pathname === '/') {
    // Redirect to the login page
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Allow the request to proceed as normal
  return NextResponse.next();
}

export const config = {
  matcher: '/', // Apply middleware to the root URL
};
