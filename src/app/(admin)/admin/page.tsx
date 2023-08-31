import React from "react";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";
export default async function Admin() {
  const onboarded = await api.store.checkStore.query();
  if (!onboarded) {
    redirect("/admin/onboarding");
  }

  return (
    <div className="p-5">
      <h1 className="mb-5 text-xl">Dashboard</h1>
      <div></div>
    </div>
  );
}
