"use client"

import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs";
import { api } from "@/trpc/server";
import { CategoryModal } from "@/components/modals/category-modal";
import { useCategoryModal } from "@/hooks/use-category-modal";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SubCategoryModal } from "@/components/modals/subcategory-modal";
import { useSubCategoryModal } from "@/hooks/use-sub-category-modal";
import { SubCategoryModalProvider } from "@/providers/sub-category-modal-provider";
import { ModalProvider } from "@/providers/modal-provider";

export default function Home() {
  /* Category actions 
  const categoryRes = await api.category.createCategory.mutate({
    name: "nigaTest1",
    priorityNumber: 1,
    imageUrl: "test",
  });

  const subCategoryRes = await api.category.createSubCategory.mutate({
    name: "testSub",
    priorityNumber: 1,
    imageUrl: "test",
    categoryId: categoryRes.id
  })

  const subSubCategoryRes = await api.category.createSubSubCategory.mutate({
    name: "testSubSub",
    priorityNumber: 1,
    imageUrl: "test",
    subCategoryId: subCategoryRes.id,
  })

  console.log(categoryRes);
  console.log(subCategoryRes);
  console.log(subSubCategoryRes);
  */
 const onOpen = useCategoryModal((state) => state.onOpen);
const subCategoryOnOpen = useSubCategoryModal((state) => state.onOpen);
  return (
    <main className="">
      <UserButton afterSignOutUrl="/" />
      <ModalProvider />
          <SubCategoryModalProvider categoryId="clls50cl20002ic04zrudeex9" />
      <Button onClick={onOpen}>Category</Button>
      <Button onClick={subCategoryOnOpen}>SubCategory</Button>
    </main>
  );
}
