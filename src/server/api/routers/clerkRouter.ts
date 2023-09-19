import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCClientError } from "@trpc/client";

export const setRole = publicProcedure
  .input(z.string())
  .mutation(async ({ ctx, input }) => {
    try {
      const res = await ctx.prisma.user.update({
        where: {
          email: input,
        },
        data: {
          role: "admin",
        },
      });
      return res;
    } catch (e) {
      return e;
    }
  });

export const inviteUser = publicProcedure
  .input(z.string())
  .query(async ({ ctx, input }) => {
    const url = "https://api.clerk.com/v1/invitations";
    const data = {
      email_address: input,
      redirect_url: "https://upmarkt.vercel.app/admin/",
      public_metadata: { role: "admin" },
    };

    const headers = {
      Authorization:
        "Bearer sk_test_olASBmStwX6TeRMwBaPxQqx5goaPht4nOnHoA1JAGp",
      "Content-Type": "application/json",
    };

    const res = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    });
    const newRes = await res.json();
    if (newRes.status === "pending") {
      const insertInviteDbRes = await ctx.prisma.invitations.create({
        data: {
          email: input,
          status: newRes.status,
          invitationId: newRes.id,
        },
      });
      return insertInviteDbRes;
    } else if (newRes.errors[0].code === "form_identifier_exists") {
      try {
        const res = await ctx.prisma.user.update({
          where: {
            email: input,
          },
          data: {
            role: "admin",
          },
        });
        return res;
      } catch (e) {
        return e;
      }
    } else if (newRes.errors[0].code === "duplicate_record") {
      const setRole = await ctx.prisma.user.update({
        where: {
          email: input,
        },
        data: {
          role: "admin",
        },
      });
      //throw new TRPCClientError(errs[0].message);
      return setRole;
    } else {
      const errs = newRes.errors;
      throw new TRPCClientError(errs[0].message);
    }
  });

export const revokeUser = publicProcedure
  .input(z.string())
  .query(async ({ ctx, input }) => {
    const invitation = await ctx.prisma.invitations.findUnique({
      where: {
        email: input,
      },
    });

    if (!invitation) {
      return "email does not have an active invite.";
    }

    const url = `https://api.clerk.com/v1/invitations/${invitation?.invitationId}/revoke`;

    const headers = {
      Authorization:
        "Bearer sk_test_olASBmStwX6TeRMwBaPxQqx5goaPht4nOnHoA1JAGp",
      "Content-Type": "application/json",
    };

    const res = await fetch(url, {
      method: "POST",
      headers: headers,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.error("Error:", error));

    const deleteInvitations = await ctx.prisma.invitations.delete({
      where: {
        email: input,
      },
    });

    return res;
  });
export const clerkRouter = createTRPCRouter({
  setRole: setRole,
  inviteUser: inviteUser,
  revokeUser: revokeUser,
});
