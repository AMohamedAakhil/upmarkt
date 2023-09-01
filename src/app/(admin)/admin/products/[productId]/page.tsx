import React from "react";
import EditProductForm from "./(components)/form";
import { api } from "@/trpc/server";

const EditProduct = async ({ params }: { params: { productId: string } }) => {
  const { productId } = params;
  const prevFormRes = await api.product.getSpecific.query(productId);
  return (
    <div>
      <EditProductForm productId={productId} previousFormValues={prevFormRes} />
    </div>
  );
};

export default EditProduct;
