import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const createCategory = publicProcedure
  .input(
    z.object({
      name: z.string(),
      priorityNumber: z.number(),
      imageUrl: z.string(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const res = await ctx.prisma.storeCategory.create({
      data: {
        name: input.name,
        priorityNumber: input.priorityNumber,
        imageUrl: input.imageUrl,
      },
    });

    console.log(res);
  });

export const createSubCategory = publicProcedure
  .input(
    z.object({
      name: z.string(),
      priorityNumber: z.number(),
      imageUrl: z.string(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const res = await ctx.prisma.storeSubCategory.create({
      data: {
        name: input.name,
        priorityNumber: input.priorityNumber,
        imageUrl: input.imageUrl,
      },
    });

    console.log(res);
  });

export const createSubSubCategory = publicProcedure
  .input(
    z.object({
      name: z.string(),
      priorityNumber: z.number(),
      imageUrl: z.string(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const res = await ctx.prisma.storeSubSubCategory.create({
      data: {
        name: input.name,
        priorityNumber: input.priorityNumber,
        imageUrl: input.imageUrl,
      },
    });

    console.log(res);
  });

export const getCategories = publicProcedure.query(async ({ ctx }) => {
  return ctx.prisma.storeCategory.findMany({});
});

export const getSubCategories = publicProcedure.query(async ({ ctx }) => {
  return ctx.prisma.storeSubCategory.findMany({});
});

export const getSubSubCategories = publicProcedure.query(async ({ ctx }) => {
  return ctx.prisma.storeSubSubCategory.findMany({});
});

export const categoryRouter = createTRPCRouter({
  createCategory: createCategory,
  createSubCategory: createSubCategory,
  createSubSubCategory: createSubSubCategory,
  getCategories: getCategories,
  getSubCategories: getSubCategories,
  getSubSubCategories: getSubSubCategories,
});
