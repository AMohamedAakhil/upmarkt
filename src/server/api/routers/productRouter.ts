import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { productSchema } from "../types";

export const createProduct = publicProcedure
  .input(productSchema)
  .mutation(async ({ ctx, input }) => {
    const categories = await ctx.prisma.storeCategory.findMany({
      where : {
        id: {
          in: input.categoryId
        }
      }
    });
    const subcategories = await ctx.prisma.storeCategory.findMany({
      where : {
        id: {
          in: input.subCategoryId
        }
      }
    });
    const subsubcategories = await ctx.prisma.storeSubSubCategory.findMany({
      where : {
        id: {
          in: input.subSubCategoryId
        }
      }
    });
    const colors = await ctx.prisma.color.findMany({
      where : {
        id: {
          in: input.colorsId
        }
      }
    })
    const attributes = await ctx.prisma.attribute.findMany({
      where : {
        id: {
          in: input.attributesId
        }
      }
    });
    const variants = await ctx.prisma.variant.findMany({
      where : {
        id: {
          in: input.variantsId
        }
      }
    });
    const images = await ctx.prisma.variant.findMany({
      where : {
        id: {
          in: input.imagesId
        }
      }
    });
    const banners = await ctx.prisma.banner.findMany({
      where: {
        id: {
          in: input.bannersId
        }
      }
    })
    const reviews = await ctx.prisma.customerReview.findMany({
      where: {
        id: {
          in: input.reviews
        }
      }
    })
    const store = await ctx.prisma.store.findUnique({
      where: {
        id: input.storeId
      }
    });

    const finalRes = await ctx.prisma.product.create({
      data: {
        originType: input.originType,
        name: input.name,
        description: input.description,
        warranty: input.warranty,
        categories: {
          connect: categories.map(category => ({ id: category.id }))
        },
        subCategories: {
          connect: subcategories.map(subcategory => ({ id: subcategory.id }))

        },
        subSubCategories: {
          connect: subsubcategories.map(subsubcategory => ({ id: subsubcategory.id }))

        },
        productCode: input.productCode,
        brand: input.brand,
        unit: input.unit,
        colors: {
          connect: colors.map(color => ({ id: color.id }))
        },
        attributes: {
          connect: attributes.map(attribute => ({ id: attribute.id }))
        },
        unitPrice: input.unitPrice,
        purchasePrice: input.purchasePrice,
        tax: input.tax,
        discount: input.discount,
        typeOfDiscount: input.typeOfDiscount,
        variants: {
          connect: variants.map(variant => ({ id: variant.id }))
        },
        totalQuantity: input.totalQuantity,
        minimumQuantity: input.minimumQuantity,
        shippingCost: input.shippingCost,
        deliveryDuration: input.deliveryDuration,
        shippingCostMultiplyByQuantity: input.shippingCostMultiplyByQuantity,
        status: input.status,
        images: {
          connect: images.map(image => ({ id: image.id }))
        },
        thumbnailUrl: input.thumbnailUrl,
        youtubeLink: input.youtubeLink,
        metaTitle: input.metaTitle,
        metaDescription: input.metaDescription,
        metaImageUrl: input.metaImageUrl,
        reviews: {
          connect: reviews.map(review => ({ id: review.id }))
        },
        banners: {
          connect: banners.map(banner => ({ id: banner.id }))
        },
        store: {
          connect: {
            id: store!.id
          }
        },
    }});

  });

export const getProducts = publicProcedure
  .query(async ({ ctx }) => {
    return ctx.prisma.product.findMany({});
  });

export const productRouter = createTRPCRouter({
  create: createProduct,
  get: getProducts,
});
