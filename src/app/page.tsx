import { UserButton } from "@clerk/nextjs";
import { Skeleton } from "@/components/ui/skeleton";

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
  return (
    <main className="p-5">
      <UserButton afterSignOutUrl="/" />
    </main>
  );
}
