import { z } from "zod";

export const productSchema = z.object({
  originType: z.string(),
  name: z.string(),
  description: z.string(),
  warranty: z.string(),
  categoryId: z.string(),
  subCategoryId: z.string(),
  subSubCategoryId: z.string(),
  productCode: z.string(),
  brand: z.string(),
  unit: z.string(),
  unitPrice: z.number(),
  purchasePrice: z.number(),
  tax: z.number(),
  discount: z.number(),
  typeOfDiscount: z.string(),
  totalQuantity: z.number(),
  minimumQuantity: z.number(),
  shippingCost: z.number(),
  deliveryDuration: z.string(),
  shippingCostMultiplyByQuantity: z.boolean(),
  status: z.boolean(),
  imagesId: z.array(z.string()),
  thumbnailUrl: z.string(),
  youtubeLink: z.string(),
  metaTitle: z.string(),
  metaDescription: z.string(),
  metaImageUrl: z.string(),
  reviews: z.array(z.string()),
  bannersId: z.array(z.string()),
  usersInWishList: z.array(z.string()),
  usersInCart: z.array(z.string()),
  orders: z.array(z.string()),
  storeId: z.string(),
  colorsId: z.array(z.string()),
  attributesId: z.array(z.string()),
  variantsId: z.array(z.string()),
});

export const categorySchema = z.object({
  name: z.string(),
  priorityNumber: z.number(),
  imageUrl: z.string(),
})

export const subCategorySchema = z.object({
  name: z.string(),
  priorityNumber: z.number(),
  imageUrl: z.string(),
})

export const subSubCategorySchema = z.object({
  name: z.string(),
  priorityNumber: z.number(),
  imageUrl: z.string(),
});
