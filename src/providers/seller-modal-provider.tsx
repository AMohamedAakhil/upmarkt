"use client";

import { SellerModal } from "@/components/modals/seller-modal";
import { useEffect, useState } from "react";

export const SellerModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <SellerModal />
    </>
  );
};
