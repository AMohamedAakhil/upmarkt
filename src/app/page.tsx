import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs";
import { api } from "@/trpc/server";

export default async function Home() {
  const categoryRes = await api.category.createCategory.mutate({
    name: "nigaTest1",
    priorityNumber: 1,
    imageUrl: "test",
  });

  const subCategoryRes = await api.category.createSubCategory.mutate({
    name: "testSub",
    priorityNumber: 1,
    imageUrl: "test",
    categoryId: categoryRes.id,
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
  return (
    <main className="">
      <UserButton afterSignOutUrl="/" />
    </main>
  );
}
