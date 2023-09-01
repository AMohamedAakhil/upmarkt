import { z } from "zod";

export const productSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  warranty: z.string().optional(),
  categoryId: z.string().optional(),
  subCategoryId: z.string().optional(),
  productCode: z.string().optional(),
  brandId: z.string().optional(),
  unit: z.string().optional(),
  unitPrice: z.number().optional(),
  purchasePrice: z.number().optional(),
  tax: z.number().optional(),
  discount: z.number().optional(),
  typeOfDiscount: z.string().optional(),
  totalQuantity: z.number().optional(),
  minimumQuantity: z.number().optional(),
  shippingCost: z.number().optional(),
  deliveryDuration: z.string().optional(),
  shippingCostMultiplyByQuantity: z.string().optional(),
  status: z.boolean().optional(),
  images: z.array(z.string()).optional(),
  thumbnailUrl: z.string().optional(),
  youtubeLink: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  metaImageUrl: z.string().optional(),
  reviews: z.array(z.string()).optional(),
  bannersId: z.array(z.string()).optional(),
  usersInWishList: z.array(z.string()).optional(),
  usersInCart: z.array(z.string()).optional(),
  orders: z.array(z.string()).optional(),
  storeId: z.string().optional(),
  colorsId: z.array(z.string()).optional(),
  attributesId: z.array(z.string()).optional(),
  variantsId: z.array(z.string()).optional(),
});
/*
const variantsSchema = z.record(
  z.object({
    name: z.string(),
    price: z.number(),
    sku: z.string(),
    quantity: z.number(),
  })
);
*/

export const productFormSchema = z.object({
  name: z.string().min(1, "Enter Product Name"),
  description: z.string().optional(),
  warranty: z.string().optional(),
  categoryId: z.string().min(1, "Select Category"),
  subCategoryId: z.string().optional(),
  subSubCategoryId: z.string().optional(),
  productCode: z.string().min(8, "Enter Product Code"),
  brandId: z.string().min(1, "Select Brand"),
  unit: z.string().min(1, "Select Unit Type"),
  unitPrice: z.string().min(1, "Enter Unit Price"),
  purchasePrice: z.string().min(1, "Enter Purchase Price"),
  tax: z.string().optional(),
  discount: z.string().optional(),
  typeOfDiscount: z.string().optional(),
  totalQuantity: z.string().min(1, "Enter Total Quantity"),
  minimumQuantity: z.string().optional(),
  shippingCost: z.string().optional(),
  deliveryDuration: z.string().optional(),
  shippingCostMultiplyByQuantity: z.string().optional(),
  status: z.boolean().optional(),
  images: z.array(z.string()).optional(),
  thumbnailUrl: z.string().optional(),
  youtubeLink: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  metaImageUrl: z.string().optional(),
  reviews: z.array(z.string()).optional(),
  bannersId: z.array(z.string()).optional(),
  usersInWishList: z.array(z.string()).optional(),
  usersInCart: z.array(z.string()).optional(),
  orders: z.array(z.string()).optional(),
  storeId: z.string().optional(),
  colorsId: z.array(z.string()).optional(),
  attributesId: z
    .array(
      z.object({
        name: z.string(),
        id: z.string(),
        createdAt: z.date(),
        storeId: z.string().optional(),
        updatedAt: z.date(),
      })
    )
    .optional(),
  attributeValues: z.record(z.array(z.string())).optional(),
});

export const categorySchema = z.object({
  name: z.string().min(1, "Category name must be at least 1 character"),
  priorityNumber: z.string(),
  imageUrl: z.string(),
});

export const subCategorySchema = z.object({
  name: z.string().min(1, "Category name must be at least 1 character"),
  priorityNumber: z.string(),
  imageUrl: z.string(),
  categoryId: z.string(),
});

export const subSubCategorySchema = z.object({
  name: z.string().min(1, "Category name must be at least 1 character"),
  priorityNumber: z.string(),
  imageUrl: z.string(),
  subCategoryId: z.string(),
});

export const storeSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email(),
  phone: z.string().min(8, "Phone number must be at least 8 digits."),
  description: z.string().optional(),
  address: z.string(),
  logoUrl: z.string(),
  bannerUrl: z.string(),
});
