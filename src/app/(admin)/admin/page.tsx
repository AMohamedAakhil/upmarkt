import React from "react";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";
export default async function Admin() {
  const check = await api.misc.checkAdmin.query();
  if (!check.adminRole) {
    redirect("/");
  } else if (!check.onboarded) {
    redirect("/admin/onboarding")
  }

  //const res = await api.clerk.inviteUser.query("awkill.py@gmail.com")
  //const res = await api.clerk.revokeUser.query("awkill.py@gmail.com")
  //console.log(res);

  return (
    <div className="p-5">
      <h1 className="mb-5 text-xl">Dashboard</h1>
      <div></div>
    </div>
  );
}
