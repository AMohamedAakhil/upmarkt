import React from "react";
import EditProductForm from "./(components)/form";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";

const EditProduct = async ({ params }: { params: { productId: string } }) => {
  const check = await api.misc.checkAdmin.query();
  if (!check.adminRole) {
    redirect("/");
  } else if (!check.onboarded) {
    redirect("/admin/onboarding")
  }

  const { productId } = params;
  const prevFormRes = await api.product.getSpecific.query(productId);
  return (
    <div>
      <EditProductForm productId={productId} previousFormValues={prevFormRes} />
    </div>
  );
};

export default EditProduct;
