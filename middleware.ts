import { NextRequest, NextResponse } from 'next/server';
// import { withClerkMiddlewar } from '@clerk/nextjs/server';
import { authMiddleware } from '@clerk/nextjs/server';

export default authMiddleware({
  publicRoutes: ["/api/uploadthing"],
});

export const config = {
  matcher: [
    '/((?!.*\\..*|_next).*)', // Exclude static files and Next.js internals
    '/',
    '/(api|trpc)(.*)', // Include API routes
  ],
};