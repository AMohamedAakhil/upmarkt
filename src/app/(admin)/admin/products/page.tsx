import React from "react";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";
import ProductDataTable from "./product-data-table";

const Products = async () => {
  const onboarded = await api.store.checkStore.query();
  if (!onboarded) {
    redirect("/admin/onboarding");
  }
  return (
<>
<ProductDataTable />
</>
  );
};

export default Products;
