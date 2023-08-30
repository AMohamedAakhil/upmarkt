"use client"

import { Button } from "@/components/ui/button";
import React, { Suspense } from "react";
import { api } from "@/trpc/client";
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/ui/data-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
 
type ProductSubset = {
  id: string | null;
  name: string | undefined | null;
  unit: string | undefined | null;
  unitPrice: number | undefined | null;
  purchasePrice: number | undefined | null;
  totalQuantity: number | null;
  brandName: string | null | undefined;
};

const ProductDataTable = async () => {

  const data = await api.product.get.query();

  const subsetData: ProductSubset[] = data.map(item => ({
    id: item.id,
    name: item.name,
    unit: item.unit,
    unitPrice: item.unitPrice,
    purchasePrice: item.purchasePrice,
    totalQuantity: item.totalQuantity,
    brandName: item.brand?.name,
  }));

  const columns: ColumnDef<ProductSubset>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "brandName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Brand Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "unit",
      header: "Unit",
    },
    {
      accessorKey: "unitPrice",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Unit Price
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "purchasePrice",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Purchase Price
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },  },
  
      {
        accessorKey: "totalQuantity",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Total Quantity
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
      },
      {
        id: "actions",
        cell: ({ row }) => {
          const product = row.original
     
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => window.location.assign(`/admin/products/${product.id}`)}
                >
                  Edit Product
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => window.location.assign(`/admin/products/${product.id}`)}
                >
                  Delete Product
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
      
  ];

  return (
    <>
    <Suspense fallback={<Skeleton className="w-full h-full" />}>
        <div className="p-5">
    <div className="flex justify-between items-center">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold">Products {`(${data.length})`}</h1>
        <h1 className="text-md">List of products in the store</h1>
      </div>
      <Button>
        <Link href="/admin/products/addproduct">Add Product</Link>
      </Button>
    </div>
    <Separator className="mt-5 border-2" />
    <DataTable columns={columns} data={subsetData} filterFor="name" />
    </div>
    </Suspense>
    </>
  );
};

export default ProductDataTable;
