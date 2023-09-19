"use client";

import React, { useState } from "react";
import { ChevronDown, Heart, Search, ShoppingBag, User2 } from "lucide-react";
import { Questrial } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { StoreCategory } from "@prisma/client";
import { StoreSubCategory } from "@prisma/client";

const questrial = Questrial({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

const Navbar = ({
  categories,
  subcategories,
}: {
  categories: StoreCategory[];
  subcategories: StoreSubCategory[];
}) => {
  
  const [hover, setHover] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<String>("");
  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const filteredSubcategories = subcategories.filter(
    (subcategory: StoreSubCategory) =>
      subcategory.categoryId === selectedCategory
  );
  const clonedData = [...filteredSubcategories];
  clonedData.sort((a, b) => a.priorityNumber - b.priorityNumber);
  console.log("cloned data", clonedData);
  //const topTwoImageUrls = clonedData.slice(0, 2).map(item => item.imageUrl);

  return (
<div className="w-full">
      <style jsx global>{`
        html {
          font-family: ${questrial.style.fontFamily};
        }
      `}</style>
      <div
        onMouseEnter={() => {
          setHover(false);
        }}
        className="flex h-10 w-full items-center justify-end bg-black px-10 text-white"
      >
        <div>
          <h1 className="text-sm font-extralight text-slate-300">
            admin@upmarkt.in
          </h1>
        </div>
      </div>
      <div
        onMouseEnter={() => {
          setHover(false);
        }}
        className="peer flex h-20 w-full items-center justify-between border-b-2 bg-white px-10 text-black"
      >
        <div>
          <h1 className="font-extrabold">LOGO</h1>
        </div>
        <div className="flex space-x-5">
          {categories.map((category: StoreCategory) => {
            return (
              <div
                onMouseEnter={() => {
                  setSelectedCategory(category.id),
                    setSelectedCategoryName(category.name),
                    setHover(true);
                }}
                className="flex items-center space-x-1"
              >
                <h1 className="text-sm uppercase tracking-widest hover:underline">
                  {category.name}
                </h1>
                <ChevronDown className="h-4 w-4" strokeWidth={1} />
              </div>
            );
          })}
        </div>
        <div className="flex items-center space-x-6">
          <Search strokeWidth={1} />
          <ShoppingBag strokeWidth={1} />
          <Heart strokeWidth={1} />
          <User2 strokeWidth={1} />
        </div>
      </div>
      <div
        onMouseLeave={() => {
          setHover(false);
        }}
        className={
          !hover
            ? "hidden"
            : "absolute z-10 w-full h-[30rem] bg-white hover:block peer-hover:block"
        }
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-1">
            <div className="flex flex-col px-44 py-10">
              <h1 className="mb-5 text-4xl text-black">
                {selectedCategoryName}
              </h1>

              {filteredSubcategories.map((subcategory: StoreSubCategory) => (
                <Link
                  href={`/${subcategory.name}`}
                  className={
                    "text-lg uppercase tracking-widest text-black hover:underline "
                  }
                >
                  {subcategory.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex px-44 py-10">
            {clonedData[0] ? (
              <Image
                className="mx-4 hover:drop-shadow-xl"
                alt="categoryImage"
                src={clonedData[0]?.imageUrl}
                width={400}
                height={400}
              />
            ) : (
              <></>
            )}
            {clonedData[1] ? (
              <Image
                className="hover:drop-shadow-xl"
                alt="categoryImage"
                src={clonedData[1]?.imageUrl}
                width={400}
                height={400}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
