import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

// Define Zod schemas for validation
const orderSchema = z.object({
  customerName: z.string(),
  status: z.string(),
  total: z.number(),
  orderStatus: z.string(),
  paymentMethod: z.string(),
  paymentReference: z.string(),
});


const orderIdSchema = z.string();

export type orderSchemaType = z.infer<typeof orderSchema>
export const createOrder = publicProcedure
  .input(
    z.object({
      orderData: orderSchema,
      addressData: z.object({
        name: z.string(),
        street: z.string(),
        city: z.string(),
        state: z.string(),
        postalCode: z.string(),
        country: z.string(),
      }),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const { orderData, addressData } = input;

    return ctx.prisma.order.create({
      data: {
        ...orderData,
        address: {
          create: addressData,
        },
      },
    });
  });

export const getOrder = publicProcedure
  .input(orderIdSchema)
  .query(async ({ ctx, input }) => {
    return ctx.prisma.order.findUnique({
      where: { id: input },
    });
  });

export const updateOrder = publicProcedure
  .input(
    z.object({
      id: orderIdSchema,
      data: orderSchema,
    })
  )
  .mutation(async ({ ctx, input }) => {
    const { id, data } = input;

    return ctx.prisma.order.update({
      where: { id },
      data,
    });
  });


export const orderRouter = createTRPCRouter({
  create: createOrder,
  get: getOrder,
  update: updateOrder,
});
