import { authMiddleware } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { prisma } from "./server/db";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({
  publicRoutes: ["/api/webhooks/user", "/"],
  ignoredRoutes: ["/((?!api|trpc))(_next|.+\..+)(.*)", "/api/trpc/category.getCategories"]
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
