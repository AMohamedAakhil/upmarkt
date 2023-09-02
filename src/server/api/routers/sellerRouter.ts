
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const getSellers = publicProcedure.query(async ({ ctx }) => {
  return ctx.prisma.user.findMany({
    where: {
        role: "admin" || "superadmin"
    }
  });
});

export const sellerRouter = createTRPCRouter({
  getSellers: getSellers,
});
