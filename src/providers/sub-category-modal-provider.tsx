"use client";

import { useEffect, useState } from "react";

import { SubCategoryModal } from "@/components/modals/subcategory-modal";

export const SubCategoryModalProvider = ({
  categoryId,
}: {
  categoryId: string;
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <SubCategoryModal categoryId={categoryId} />
    </>
  );
};
