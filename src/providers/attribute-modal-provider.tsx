"use client";

import { useEffect, useState } from "react";

import { AttributeModal } from "@/components/modals/attribute-modal";

export const AttributeModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AttributeModal />
    </>
  );
};
