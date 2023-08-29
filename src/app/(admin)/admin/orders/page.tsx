import { api } from "@/trpc/server";
import { redirect } from "next/navigation";
import React from "react";

const Orders = async () => {
  const onboarded = await api.store.checkStore.query();
  if (!onboarded) {
    redirect("/admin/onboarding")
  }
  return (
    <div className="p-5">
      <h1 className="mb-5 text-xl">Orders</h1>
      {"Order Table goes here"}
    </div>
  );
};

export default Orders;
