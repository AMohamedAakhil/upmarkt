"use client";
import React, { useEffect, useState } from "react";
import { api } from "@/trpc/server";
import { SubCategoryModal } from "@/components/modals/subcategory-modal";
import { useSubCategoryModal } from "@/hooks/use-sub-category-modal";
import { Button } from "@/ui/button";

const SamplePage = () => {
  const [client, setClient] = useState(false);
  useEffect(() => {
    setClient(true);
  }, []);
  const subCategoryOnOpen = useSubCategoryModal((state) => state.onOpen);

  return (
    <div>
      {client && (
        <>
          <SubCategoryModal categoryId="cllr1kkgv000uicvki5we8aml" />
          <Button onClick={subCategoryOnOpen}>SubCategory</Button>
        </>
      )}
    </div>
  );
};

export default SamplePage;
