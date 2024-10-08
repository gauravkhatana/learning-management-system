import { NextRequest, NextResponse } from 'next/server';
// import { withClerkMiddlewar } from '@clerk/nextjs/server';
import { authMiddleware } from '@clerk/nextjs/server';

// export default authMiddleware({
//   publicRoutes: ["/api/uploadthing"],
// });

export default async () => {
  try {
    return await authMiddleware({
      publicRoutes: ["/api/uploadthing"],
    });
  } catch (error) {
    console.error("Error in auth middleware:", error);
    return NextResponse.error();
  }
};



export const config = {
  matcher: [
    '/((?!.*\\..*|_next).*)', // Exclude static files and Next.js internals
    // '/',
    // '/(api|trpc)(.*)', // Include API routes
  ],
};