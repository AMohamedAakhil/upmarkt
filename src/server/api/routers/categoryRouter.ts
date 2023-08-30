import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import {
  categorySchema,
  subCategorySchema,
  subSubCategorySchema,
} from "@/server/api/types";
import { currentUser } from "@clerk/nextjs";

export const createCategory = publicProcedure
  .input(categorySchema)
  .mutation(async ({ ctx, input }) => {
    const user = await currentUser();
    const emailAddress = user?.emailAddresses[0]!.emailAddress!;
    console.log(emailAddress);
    const res = await ctx.prisma.storeCategory.create({
      data: {
        name: input.name,
        priorityNumber: parseInt(input.priorityNumber),
        imageUrl: input.imageUrl,
        store: {
          connect: {
            email: emailAddress,
          }
        }
      },
    });

    return res;
  });

export const createSubCategory = publicProcedure
  .input(subCategorySchema) // Assuming you have a schema for subcategory input
  .mutation(async ({ ctx, input }) => {
    const user = await currentUser();
    const emailAddress = user?.emailAddresses[0]!.emailAddress!;
    console.log(emailAddress);
    const res = await ctx.prisma.storeSubCategory.create({
      data: {
        name: input.name,
        priorityNumber: parseInt(input.priorityNumber),
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
        priorityNumber: parseInt(input.priorityNumber),
        imageUrl: input.imageUrl,
        subCategory: { connect: { id: input.subCategoryId } }, // Connect to the parent subCategory using subCategoryId
      },
    });

    return res;
  });

export const getCategories = publicProcedure.query(async ({ ctx }) => {
  const user = await currentUser();
  const emailAddress = user?.emailAddresses[0]!.emailAddress!;
  return ctx.prisma.storeCategory.findMany({
    where: {
      store: {
        email: emailAddress,
      }
    }
  });
});

export const getLastCategory = publicProcedure.query(async ({ ctx }) => {
  return ctx.prisma.storeCategory.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 1,
  });
});

export const getSubCategories = publicProcedure
  .input(z.object({ categoryId: z.string() }))
  .query(async ({ ctx, input }) => {
    return ctx.prisma.storeSubCategory.findMany({
      where: {
        categoryId: input.categoryId,
      },
    });
  });

export const getSubSubCategories = publicProcedure.query(async ({ ctx }) => {
  return ctx.prisma.storeSubSubCategory.findMany({});
});

export const categoryRouter = createTRPCRouter({
  createCategory: createCategory,
  createSubCategory: createSubCategory,
  createSubSubCategory: createSubSubCategory,
  getCategories: getCategories,
  getLastCategory: getLastCategory,
  getSubCategories: getSubCategories,
  getSubSubCategories: getSubSubCategories,
});
