import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { categorySchema, subCategorySchema, subSubCategorySchema } from "@/server/api/types";

export const createCategory = publicProcedure
  .input(categorySchema)
  .mutation(async ({ ctx, input }) => {
    const res = await ctx.prisma.storeCategory.create({
      data: {
        name: input.name,
        priorityNumber: input.priorityNumber,
        imageUrl: input.imageUrl,
      },
    });

    return res;
  });

  export const createSubCategory = publicProcedure
  .input(subCategorySchema) // Assuming you have a schema for subcategory input
  .mutation(async ({ ctx, input }) => {
    const res = await ctx.prisma.storeSubCategory.create({
      data: {
        name: input.name,
        priorityNumber: input.priorityNumber,
        imageUrl: input.imageUrl,
        category: { connect: { id: input.categoryId } }, // Connect to the parent category using categoryId
      },
    });

    return res;
  });

export const createSubSubCategory = publicProcedure
  .input(subSubCategorySchema)
  .mutation(async ({ ctx, input }) => {
    const res = await ctx.prisma.storeSubSubCategory.create({
      data: {
        name: input.name,
        priorityNumber: input.priorityNumber,
        imageUrl: input.imageUrl,
        subCategory: { connect: { id: input.subCategoryId } }, // Connect to the parent subCategory using subCategoryId
      },
    });

    return res;
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
