import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { productSchema } from "../types";
import { currentUser } from "@clerk/nextjs";
import { z } from "zod";

export const createProduct = publicProcedure
  .input(productSchema)
  .mutation(async ({ ctx, input }) => {
    const user = await currentUser();
    const emailAddress = user?.emailAddresses[0]!.emailAddress!;
    const colors = await ctx.prisma.color.findMany({
      where: {
        id: {
          in: input.colorsId,
        },
      },
    });
    const attributes = await ctx.prisma.attribute.findMany({
      where: {
        id: {
          in: input.attributesId,
        },
      },
    });
    const variants = await ctx.prisma.variant.findMany({
      where: {
        id: {
          in: input.variantsId,
        },
      },
    });
    const images = await ctx.prisma.variant.findMany({
      where: {
        id: {
          in: input.images,
        },
      },
    });
    const banners = await ctx.prisma.banner.findMany({
      where: {
        id: {
          in: input.bannersId,
        },
      },
    });
    const reviews = await ctx.prisma.customerReview.findMany({
      where: {
        id: {
          in: input.reviews,
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
        colors: {
          connect: colors.map((color) => ({ id: color.id })),
        },
        attributes: {
          connect: attributes.map((attribute) => ({ id: attribute.id })),
        },
        unitPrice: input.unitPrice,
        purchasePrice: input.purchasePrice,
        tax: input.tax,
        discount: input.discount,
        typeOfDiscount: input.typeOfDiscount,
        variants: {
          connect: variants.map((variant) => ({ id: variant.id })),
        },
        totalQuantity: input.totalQuantity,
        minimumQuantity: input.minimumQuantity,
        shippingCost: input.shippingCost,
        deliveryDuration: input.deliveryDuration,
        shippingCostMultiplyByQuantity:
          input.shippingCostMultiplyByQuantity === "yes",
        images: {
          connect: images.map((image) => ({ id: image.id })),
        },
        thumbnailUrl: input.thumbnailUrl,
        youtubeLink: input.youtubeLink,
        metaTitle: input.metaTitle,
        metaDescription: input.metaDescription,
        metaImageUrl: input.metaImageUrl,
        reviews: {
          connect: reviews.map((review) => ({ id: review.id })),
        },
        banners: {
          connect: banners.map((banner) => ({ id: banner.id })),
        },
        store: {
            connect: {
              email: emailAddress,
            },
          },
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
      }
    },
    include: {
      brand: true,
    }
  });
});

export const getSpecificProduct = publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
  const user = await currentUser();
  const emailAddress = user?.emailAddresses[0]!.emailAddress!;
  console.log(emailAddress);
  return ctx.prisma.product.findUnique({
    where: {
      id: input,
    },
    include : {
      images: true,
    }
  });
});

export const productRouter = createTRPCRouter({
  create: createProduct,
  get: getProducts,
  getSpecific: getSpecificProduct,
});
