import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the username cookie is set
  const username = request.cookies.get('username');
  console.log("MIDDLEWARE USER", username);

  // If username is not set, redirect to the login page
  if (!username) {
    return NextResponse.redirect(new URL('/login', request.url));
  } else {
    if (request.nextUrl.pathname === '/') { 
    return NextResponse.redirect(new URL('/explore', request.url));
    }

  }

  // Allow the request to proceed as normal
  return NextResponse.next();
}

export const config = {
  matcher: '/((?!login|_next|favicon.ico).*)', // Apply middleware to all routes except login, _next (Next.js internals), and favicon.ico
};
