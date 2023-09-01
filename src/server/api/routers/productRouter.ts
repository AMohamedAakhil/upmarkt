import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { productSchema } from "../types";
import { currentUser } from "@clerk/nextjs";
import { z } from "zod";

export const createProduct = publicProcedure
  .input(productSchema)
  .mutation(async ({ ctx, input }) => {
    const user = await currentUser();
    const emailAddress = user?.emailAddresses[0]!.emailAddress!;

    const attributes = await ctx.prisma.attribute.findMany({
      where: {
        id: {
          in: input.attributesId,
        },
      },
    });

    const finalRes = await ctx.prisma.product.create({
      data: {
        name: input.name,
        description: input.description,
        warranty: input.warranty,
        ...(input.categoryId !== "" && {
          categories: {
            connect: { id: input.categoryId },
          },
        }),
        ...(input.subCategoryId !== "" && {
          subCategories: {
            connect: { id: input.subCategoryId },
          },
        }),
        productCode: input.productCode,
        brand: {
          connect: { id: input.brandId },
        },
        unit: input.unit,
        attributes: {
          connect: attributes.map((attribute) => ({ id: attribute.id })),
        },
        unitPrice: input.unitPrice,
        purchasePrice: input.purchasePrice,
        tax: input.tax,
        discount: input.discount,
        typeOfDiscount: input.typeOfDiscount,
        totalQuantity: input.totalQuantity,
        minimumQuantity: input.minimumQuantity,
        shippingCost: input.shippingCost,
        deliveryDuration: input.deliveryDuration,
        shippingCostMultiplyByQuantity:
          input.shippingCostMultiplyByQuantity === "yes",
        images: {
          connect: input.images?.map((imageId) => ({ url: imageId })),
        },
        thumbnailUrl: input.thumbnailUrl,
        youtubeLink: input.youtubeLink,
        metaTitle: input.metaTitle,
        metaDescription: input.metaDescription,
        metaImageUrl: input.metaImageUrl,
        store: {
          connect: {
            email: emailAddress,
          },
        },
      },
    });

    console.log(finalRes);
  });

export const updateProduct = publicProcedure
  .input(productSchema)
  .mutation(async ({ ctx, input }) => {
    const attributes = await ctx.prisma.attribute.findMany({
      where: {
        id: {
          in: input.attributesId,
        },
      },
    });

    const finalRes = await ctx.prisma.product.update({
      where: {
        id: input.id,
      },
      data: {
        name: input.name,
        description: input.description,
        warranty: input.warranty,
        ...(input.categoryId !== "" && {
          categories: {
            connect: { id: input.categoryId },
          },
        }),
        ...(input.subCategoryId !== "" && {
          subCategories: {
            connect: { id: input.subCategoryId },
          },
        }),
        productCode: input.productCode,
        brand: {
          connect: { id: input.brandId },
        },
        unit: input.unit,
        attributes: {
          set: attributes.map((attribute) => ({ id: attribute.id })),
        },
        unitPrice: input.unitPrice,
        purchasePrice: input.purchasePrice,
        tax: input.tax,
        discount: input.discount,
        typeOfDiscount: input.typeOfDiscount,
        totalQuantity: input.totalQuantity,
        minimumQuantity: input.minimumQuantity,
        shippingCost: input.shippingCost,
        deliveryDuration: input.deliveryDuration,
        shippingCostMultiplyByQuantity:
          input.shippingCostMultiplyByQuantity === "yes" ? true : false,
        images: {
          set: input.images?.map((imageId) => ({ url: imageId })),
        },
        thumbnailUrl: input.thumbnailUrl,
        youtubeLink: input.youtubeLink,
        metaTitle: input.metaTitle,
        metaDescription: input.metaDescription,
        metaImageUrl: input.metaImageUrl,
      },
    });

    console.log(finalRes);
  });

export const getProducts = publicProcedure.query(async ({ ctx }) => {
  const user = await currentUser();
  const emailAddress = user?.emailAddresses[0]!.emailAddress!;
  console.log(emailAddress);
  return ctx.prisma.product.findMany({
    where: {
      store: {
        email: emailAddress,
      },
    },
    include: {
      brand: true,
    },
  });
});

export const getSpecificProduct = publicProcedure
  .input(z.string())
  .query(async ({ ctx, input }) => {
    const user = await currentUser();
    const emailAddress = user?.emailAddresses[0]!.emailAddress!;
    console.log(emailAddress);
    return ctx.prisma.product.findUnique({
      where: {
        id: input,
      },
      include: {
        images: true,
      },
    });
  });

export const deleteProduct = publicProcedure
  .input(z.string())
  .query(async ({ ctx, input }) => {
    const user = await currentUser();
    const emailAddress = user?.emailAddresses[0]!.emailAddress!;
    const verifyRes = await ctx.prisma.store.findUnique({
      where: {
        email: emailAddress,
      },
    });

    if (verifyRes) {
      return ctx.prisma.product.delete({
        where: {
          id: input,
        },
      });
    } else {
      return false;
    }
  });

export const productRouter = createTRPCRouter({
  create: createProduct,
  get: getProducts,
  getSpecific: getSpecificProduct,
  update: updateProduct,
  delete: deleteProduct,
});
