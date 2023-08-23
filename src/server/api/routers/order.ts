import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const createOrder = publicProcedure
  .input(z.object({
    userId: z.string(),
    status: z.string(),
    total: z.number(),
    addressId: z.string(),
  }))
  .mutation(async ({ ctx, input }) => {
    const { userId, status, total, addressId } = input;
    return ctx.prisma.order.create({
      data: {
        userId,
        status,
        total,
        addressId,
      },
    });

  });

export const getOrder = publicProcedure
  .input(z.string())
  .query(async ({ ctx, input }) => {
    return ctx.prisma.order.findUnique({
      where: { id: input },
    });
  });

export const orderRouter = createTRPCRouter({
  create: createOrder,
  get: getOrder,
});
