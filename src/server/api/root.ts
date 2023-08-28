import { orderRouter } from "@/server/api/routers/orderRouter";
import { createTRPCRouter } from "@/server/api/trpc";
import { productRouter } from "./routers/productRouter";
import { categoryRouter } from "./routers/categoryRouter";
import { miscRouter } from "./routers/miscRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  order: orderRouter,
  product: productRouter,
  category: categoryRouter,
  misc: miscRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
