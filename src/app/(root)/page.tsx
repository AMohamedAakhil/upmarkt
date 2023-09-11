import Navbar from "@/components/main-store-components/navbar";
import { api } from "@/trpc/server";

export default async function Home() {
  const categories = await api.category.getCategories.query();
  const subcategories = await api.category.getAllSubCategories.query();
  return (
    <main className="">
      <Navbar categories={categories} subcategories={subcategories} />
      <div className="h-96 bg-black w-full">
hi
      </div>
    </main>
  );
}
