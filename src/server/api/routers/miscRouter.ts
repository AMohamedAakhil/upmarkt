import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import {
  categorySchema,
  subCategorySchema,
  subSubCategorySchema,
} from "@/server/api/types";
import { currentUser } from "@clerk/nextjs";

export const getBrands = publicProcedure.query(async ({ ctx }) => {
  const user = await currentUser();
  const emailAddress = user?.emailAddresses[0]!.emailAddress!;
  console.log(emailAddress);
  return ctx.prisma.brand.findMany({
    where: {
      store: {
        email: emailAddress,
      },
    },
  });
});

export const createBrand = publicProcedure
  .input(
    z.object({
      name: z.string().min(1),
      logoUrl: z.string().min(1),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const user = await currentUser();
    const emailAddress = user?.emailAddresses[0]!.emailAddress!;
    console.log(emailAddress);
    const res = await ctx.prisma.brand.create({
      data: {
        name: input.name,
        logoUrl: input.logoUrl,
        store: {
          connect: { email: emailAddress },
        },
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
    const user = await currentUser();
    const emailAddress = user?.emailAddresses[0]!.emailAddress!;
    console.log(emailAddress);
    const res = await ctx.prisma.attribute.create({
      data: {
        name: input.name,
        store: {
          connect: {
            email: emailAddress,
          },
        },
      },
    });

    return res;
  });

export const getAttributes = publicProcedure.query(async ({ ctx }) => {
  const user = await currentUser();
  const emailAddress = user?.emailAddresses[0]!.emailAddress!;
  console.log(emailAddress);
  return ctx.prisma.attribute.findMany({
    where: {
      store: {
        email: emailAddress,
      },
    },
  });
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

export const checkAdmin = publicProcedure.query(async ({ ctx }) => {
  const user = await currentUser();
  const emailAddress = user?.emailAddresses[0]!.emailAddress!;
  console.log(emailAddress);
  const onboarded = await ctx.prisma.store.findUnique({
    where: {
      email: emailAddress
    }
  })
  const adminRole = await ctx.prisma.user.findUnique({
    where: {
      email: emailAddress
    }
  })
  const isAdmin = adminRole?.role === "admin" ? true : false
  return {
    onboarded: onboarded ? true : false,
    adminRole: isAdmin
  }
});

export const miscRouter = createTRPCRouter({
  getBrands: getBrands,
  createBrand: createBrand,
  createAttribute: createAttribute,
  getAttributes: getAttributes,
  createImage: createImage,
  getImage: getImage,
  checkAdmin: checkAdmin,
});
