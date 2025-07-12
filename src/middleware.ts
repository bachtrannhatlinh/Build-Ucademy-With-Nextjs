import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware((auth, req) => {
  // Skip authentication for debug/health endpoints
  if (req.nextUrl.pathname.startsWith('/api/debug') || 
      req.nextUrl.pathname.startsWith('/api/test') ||
      req.nextUrl.pathname.startsWith('/api/health')) {
    return;
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
