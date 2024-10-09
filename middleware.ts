import { NextRequest, NextResponse } from 'next/server';
import { authMiddleware, clerkMiddleware } from '@clerk/nextjs/server';
// import { authMiddleware } from '@clerk/nextjs/server';

// export default authMiddleware({
//   publicRoutes: ["/api/uploadthing"],
// });

// export default async () => {
//   try {
//     return await authMiddleware({
//       publicRoutes: ["/api/uploadthing"],
//     });
//   } catch (error) {
//     console.error("Error in auth middleware:", error);
//     return NextResponse.error();
//   }
// };

// Define your public routes (accessible without authentication)

export default authMiddleware({ignoredRoutes: ["/((?!api|trpc))(_next.*|.+\.[\w]+$)", "/api/saveuser","/api/uploadthing"]});

// export default async (req: NextRequest) => {
//   try {
//     const response = await authMiddleware({
//       publicRoutes: ["/api/uploadthing"], // Adjust your public routes
//     });

//     // Ensure the response is returned
//     if (response instanceof NextResponse) {
//       return response;
//     }

//     // Fallback in case the authMiddleware didn't return a valid response
//     return NextResponse.next();
//   } catch (error) {
//     console.error("Error in auth middleware:", error);
//     return new NextResponse("Internal Server Error", { status: 500 });
//   }
// };





export const config = {
  matcher: [
    '/((?!.*\\..*|_next).*)', // Exclude static files and Next.js internals
    '/',
    '/(api|trpc)(.*)', // Include API routes
  ],
};