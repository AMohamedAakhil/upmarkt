"use client";

import { useEffect, useState } from "react";
import DeleteProductModal from "@/components/modals/delete-product-modal";

export const DeleteModalProvider = ({productId} : {productId: string}) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <DeleteProductModal productId={productId} />
    </>
  );
};
