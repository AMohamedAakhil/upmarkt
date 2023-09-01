import React from "react";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";
import ProductDataTable from "./product-data-table";

const Products = async () => {
  const check = await api.misc.checkAdmin.query();
  if (!check.adminRole) {
    redirect("/");
  } else if (!check.onboarded) {
    redirect("/admin/onboarding")
  }


  return (
    <>
      <ProductDataTable />
    </>
  );
};

export default Products;
