/* eslint-disable */

import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { currentUser } from "@clerk/nextjs";

export const createOrder = publicProcedure
  .input(
    z.object({
      status: z.string(),
      total: z.number(),
      address: z.object({
        name: z.string(),
        street: z.string(),
        city: z.string(),
        state: z.string(),
        postalCode: z.string(),
        country: z.string(),
      }),
    })
  )
  .mutation(async ({ ctx, input }) => {
    try {
      const { status, total, address } = input;
      const user = await currentUser();
      const id = JSON.parse(JSON.stringify(user)).id;

      const addressRes = await ctx.prisma.address.create({
        data: {
          ...address,
        },
      });

      const userData = await ctx.prisma.user.findFirst({
        where: {
          clerkId: id,
        },
      });

      return ctx.prisma.order.create({
        data: {
          userId: userData!.id,
          status,
          total,
          addressId: addressRes.id,
        },
      });
    } catch {
      console.log("ERROR");
    }
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
