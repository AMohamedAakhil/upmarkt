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

export const createAttribute = publicProcedure
  .input(
    z.object({
      name: z.string().min(1),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const res = await ctx.prisma.attribute.create({
      data: {
        name: input.name,
      },
    });

    return res;
  });

export const getAttributes = publicProcedure.query(async ({ ctx }) => {
  return ctx.prisma.attribute.findMany({});
});

export const createImage = publicProcedure
  .input(
    z.object({
      url: z.string().min(1),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const res = await ctx.prisma.image.create({
      data: {
        url: input.url,
      },
    });

    return res;
  });

export const getImage = publicProcedure
  .input(z.string())
  .query(async ({ ctx, input }) => {
    const res = await ctx.prisma.image.findUnique({
      where: {
        id: input,
      },
    });

    return res;
  });

export const miscRouter = createTRPCRouter({
  getBrands: getBrands,
  createBrand: createBrand,
  createAttribute: createAttribute,
  getAttributes: getAttributes,
  createImage: createImage,
  getImage: getImage,
});
