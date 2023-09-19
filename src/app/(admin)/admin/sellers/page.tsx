import React from "react";
import SellerClient from "./(client)/SellerClient";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";

const Sellers = async () => {
  const check = await api.misc.checkAdmin.query();
  if (!check.adminRole) {
    redirect("/");
  } else if (!check.onboarded) {
    redirect("/admin/onboarding");
  }
  const data = await api.seller.getSellers.query();

  return (
    <>
      <SellerClient data={data} />
    </>
  );
};

export default Sellers;
