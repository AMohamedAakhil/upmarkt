import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import {
  categorySchema,
  subCategorySchema,
  subSubCategorySchema,
} from "@/server/api/types";

export const getBrands = publicProcedure.query(async ({ ctx }) => {
  return ctx.prisma.brand.findMany({});
});

export const createBrand = publicProcedure
  .input(
    z.object({
      name: z.string().min(1),
      logoUrl: z.string().min(1),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const res = await ctx.prisma.brand.create({
      data: {
        name: input.name,
        logoUrl: input.logoUrl,
      },
    });

    return res;
  });

export const getAttributes = publicProcedure.query(async ({ ctx }) => {
  return ctx.prisma.attribute.findMany({});
});

export const miscRouter = createTRPCRouter({
  getBrands: getBrands,
  createBrand: createBrand,
  getAttributes: getAttributes,
});
