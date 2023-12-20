import { api } from "@/trpc/server";
import Navbar from "@/components/main-store-components/navbar";
import {Carousel} from "@/components/main-store-components/carousel";


export default async function Home() {
  const categories = await api.category.getCategories.query();
  const subcategories = await api.category.getAllSubCategories.query();
  return (
    <div className="w-full">
      <Navbar />
      <Carousel />
    </div>
  );
}
