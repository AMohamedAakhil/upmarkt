import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { currentUser } from "@clerk/nextjs";



export const createProduct = publicProcedure
  .input(z.object({
    originType: z.string(),
    name: z.string(),
    description: z.string(),
    warranty: z.string(),
    category: z.string(),
    subCategory: z.string(),
    subSubCategory: z.string(),
    productCode: z.string(),
    brand: z.string(),
    unit: z.string(),
    unitPrice: z.number(),
    purchasePrice: z.number(),
    tax: z.number(),
    discount: z.number(),
    typeOfDiscount: z.string(),
    totalQuantity: z.number(),
    shippingCost: z.number(),
    deliveryDuration: z.string(),
    shippingCostMultiplyByQuantity: z.boolean(),
    status: z.boolean(),
    images: z.array(z.object({
        name: z.string(),
        url: z.string(),
        productImagesId: z.string(),
    })),
    thumbnailUrl: z.string(),
    youtubeLink: z.string(),
    metaTitle: z.string(),
    metaDescription: z.string(),
    metaImageUrl: z.string(),
    reviews: z.array(z.object({
        rating: z.number(),
        comment: z.string(),
        userId: z.string(),
    })),
    banner: z.object({
        name: z.string(),
        imageUrl: z.string(),
    }),
    usersInWishList: z.array(z.string()),
    usersInCart: z.array(z.string()),
    orders: z.array(z.string()),
    storeId: z.string(),
    colors: z.array(z.object({
        name: z.string(),
        code: z.string(),
        productId: z.string(),
    })),
    attributes: z.array(z.object({
        name: z.string(),
        storeId: z.string(),

    })),
    variants: z.array(z.object({
        name: z.string(),
        price: z.number(),
        sku: z.string(),
        quantity: z.number(),
        productId: z.string(),
    }))


    
  }))
  .mutation(async ({ ctx, input }) => {

  });

export const getOrder = publicProcedure
  .input(z.string())
  .query(async ({ ctx, input }) => {
    return ctx.prisma.order.findUnique({
      where: { id: input },
    });
  });

export const productRouter = createTRPCRouter({
  create: createProduct,
  get: getOrder,
});
