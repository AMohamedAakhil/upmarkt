import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs";
import { api } from "@/trpc/server";

export default async function Home() {
  const categoryRes = await api.category.createCategory.mutate({
      name: "test",
      priorityNumber: 1,
      imageUrl: "test",
  })

  console.log(categoryRes);
  return (
    <main className="">
      <UserButton afterSignOutUrl="/"/>
    </main>
  );
}
