import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { storeSchema } from "../types";
import { currentUser } from "@clerk/nextjs";

export const createStore = publicProcedure
  .input(storeSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      const setInviteStatus = await ctx.prisma.invitations.update({
        where: {
          email: input.email,
        },
        data: {
          status: { set: "accepted" },
        },
      });
    } catch (e) {
      console.log(e);
    }

    const res = await ctx.prisma.store.create({
      data: {
        name: input.name,
        email: input.email,
        phone: input.phone,
        description: input.description,
        address: input.address,
        logoUrl: input.logoUrl,
        bannerUrl: input.bannerUrl,
      },
    });

    return res;
  });

export const getStores = publicProcedure.query(async ({ ctx }) => {
  return ctx.prisma.store.findMany({});
});

export const checkStore = publicProcedure.query(async ({ ctx }) => {
  const user = await currentUser();
  const emailAddress = user?.emailAddresses[0]!.emailAddress!;
  const res = await ctx.prisma.store.findUnique({
    where: {
      email: emailAddress,
    },
  });
  if (res) {
    return true;
  } else {
    return false;
  }
});
export const storeRouter = createTRPCRouter({
  createStore: createStore,
  getStores: getStores,
  checkStore: checkStore,
});
