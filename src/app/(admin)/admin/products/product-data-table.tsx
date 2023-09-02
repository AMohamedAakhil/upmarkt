"use client";

import { Button } from "@/components/ui/button";
import React, { Suspense, useState } from "react";
import { api } from "@/trpc/client";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteModal } from "@/hooks/use-delete-modal";
import { useToast } from "@/components/ui/use-toast";
import { DeleteProductModal } from "@/components/modals/delete-product-modal";

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
  const onOpen = useDeleteModal((state) => state.onOpen);
  const data = await api.product.get.query();
  const subsetData: ProductSubset[] = data.map((item) => ({
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
        );
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
        );
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
        );
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
        );
      },
    },

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
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const product = row.original;

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
                onClick={() =>
                  window.location.assign(`/admin/products/${product.id}`)
                }
              >
                Edit Product
              </DropdownMenuItem>
              <Button className="bg-red-700 hover:bg-red-800 h-[30px] mt-1 mb-1 text-white font-normal" onClick={onOpen}>Delete Product</Button>
              <DeleteProductModal productId={product.id!} productName={product.name!} />
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <>
      <Suspense fallback={<Skeleton className="h-full w-full" />}>
        <div className="p-5">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold">
                Products {`(${data.length})`}
              </h1>
              <h1 className="text-md">List of products in the store</h1>
            </div>
            <Link href="/admin/products/addproduct">
            <Button>
              Add Product
            </Button>
              </Link>
          </div>
          <Separator className="mt-5" />
          <DataTable columns={columns} data={subsetData} filterFor="name" />
        </div>
      </Suspense>
    </>
  );
};

export default ProductDataTable;
