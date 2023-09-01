import { clerkClient, currentUser } from "@clerk/nextjs";

import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const setRole = publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    const user = await currentUser()
    const id = user!.id
    try {
      const res = await clerkClient.users.updateUserMetadata(id, {
        publicMetadata: {
          role: input
        }
      })
      return JSON.stringify(res)

    } catch(e) {
      return e
    }
    

});

export const clerkRouter = createTRPCRouter({
  setRole: setRole,
});
