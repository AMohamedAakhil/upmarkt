"use client"

import React, {useState} from 'react'
import { ChevronDown, Heart, Search, ShoppingBag, User2 } from 'lucide-react'
import { Questrial } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'
import { StoreCategory } from '@prisma/client'
import { StoreSubCategory } from '@prisma/client'

const questrial = Questrial({
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
})

const Navbar = ({categories, subcategories} : {categories: StoreCategory[], subcategories: StoreSubCategory[]}) => {
  const [hover, setHover] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<String>("");
  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const filteredSubcategories = subcategories.filter((subcategory: StoreSubCategory) => subcategory.categoryId === selectedCategory)
  const clonedData = [...filteredSubcategories];
  clonedData.sort((a, b) => a.priorityNumber - b.priorityNumber);
  console.log("cloned data", clonedData);
  //const topTwoImageUrls = clonedData.slice(0, 2).map(item => item.imageUrl);

  return (
    <div className="w-full fixed">
                 <style jsx global>{`
        html {
          font-family: ${questrial.style.fontFamily};
        }
      `}</style>
      <div onMouseEnter={() => {setHover(false)}} className="px-10 w-full h-10 bg-black text-white flex justify-end items-center">
        <div>
          <h1 className="text-slate-300 text-sm font-extralight">admin@upmarkt.in</h1>
        </div>
      </div>
      <div onMouseEnter={() => {setHover(false)}} className="peer px-10 w-full h-20 bg-white border-b-2 text-black flex items-center justify-between">
        <div>
          <h1 className="font-extrabold">LOGO</h1>
        </div>
        <div className="flex space-x-5">
          {categories.map((category: StoreCategory) => {
            return (
            <div onMouseEnter={() => {setSelectedCategory(category.id), setSelectedCategoryName(category.name), setHover(true)}} className="flex items-center space-x-1">
            <h1 className="uppercase text-sm tracking-widest hover:underline">{category.name}</h1>
            <ChevronDown className="w-4 h-4" strokeWidth={1} />
          </div>
            )
          })}
        </div>
        <div className="flex items-center space-x-6">
          <Search strokeWidth={1} />
          <ShoppingBag strokeWidth={1} />
          <Heart strokeWidth={1} />
          <User2 strokeWidth={1} />
        </div>
      </div>
      <div onMouseLeave={() => {setHover(false)}} className={!hover ? "opacity-0 transition-opacity duration-500 ease-in-out" : 'opacity-100 duration-500 transition-opacity ease-in-out peer-hover:block h-[30rem] bg-white drop-shadow-2xl hover:block hidden'}>
      <div
      className="flex justify-between items-start"
    >
      <div className="flex items-center space-x-1">

                <div className="flex flex-col px-44 py-10">
                <h1 className="text-4xl text-black mb-5">{selectedCategoryName}</h1>

                {filteredSubcategories
            .map((subcategory: StoreSubCategory) => (
                  <Link href={`/${subcategory.name}`} className={"uppercase text-black text-lg tracking-widest hover:underline "}>{subcategory.name}</Link>
            ))}
          </div>
      </div>
      <div className="flex px-44 py-10">
        {
          clonedData[0] ? <Image className="hover:drop-shadow-xl mx-4" alt="categoryImage" src={clonedData[0]?.imageUrl} width={400} height={400} /> : <></>
        }
        {
          clonedData[1] ? <Image className="hover:drop-shadow-xl" alt="categoryImage" src={clonedData[1]?.imageUrl} width={400} height={400} /> : <></>
        }
      </div>
    </div>
      </div>
    </div>
  )
}

export default Navbar