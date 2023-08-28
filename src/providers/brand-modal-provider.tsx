"use client";

import { useEffect, useState } from "react";

import { BrandModal } from "@/components/modals/brand-modal";

export const BrandModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <BrandModal />
    </>
  );
};
