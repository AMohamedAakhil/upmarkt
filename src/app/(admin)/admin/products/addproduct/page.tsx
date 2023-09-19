import React from "react";
import ProductForm from "./(components)/form";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";

const AddProduct = async () => {
  const check = await api.misc.checkAdmin.query();
  if (!check.adminRole) {
    redirect("/");
  } else if (!check.onboarded) {
    redirect("/admin/onboarding");
  }

  return (
    <div className="p-5">
      <ProductForm />
    </div>
  );
};

export default AddProduct;
