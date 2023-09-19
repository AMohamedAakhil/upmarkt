import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const getSellers = publicProcedure.query(async ({ ctx }) => {
  return ctx.prisma.user.findMany({
    where: {
      role: "admin" || "superadmin",
    },
  });
});

export const deleteSeller = publicProcedure
  .input(z.string())
  .query(async ({ ctx, input }) => {
    return ctx.prisma.user.update({
      where: {
        email: input,
      },
      data: {
        role: "customer",
      },
    });
  });

export const sellerRouter = createTRPCRouter({
  getSellers: getSellers,
  deleteSeller: deleteSeller,
});
