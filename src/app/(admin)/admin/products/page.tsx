import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";

const Products = async () => {
  const onboarded = await api.store.checkStore.query();
  if (!onboarded) {
    redirect("/admin/onboarding");
  }
  return (
    <div className="flex w-full flex-col p-5">
      <h1 className="mb-5 text-xl">Products</h1>
      <Button>
        <Link href="/admin/products/addproduct">Add Product</Link>
      </Button>
    </div>
  );
};

export default Products;
