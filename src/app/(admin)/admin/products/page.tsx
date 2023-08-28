import { Button } from "@/ui/button";
import React from "react";
import Link from "next/link";

const Products = () => {
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
