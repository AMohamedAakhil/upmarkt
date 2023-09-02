"use client"
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { Separator } from '@/components/ui/separator'
import { useSellerModal } from '@/hooks/use-seller-modal'
import { SellerModalProvider } from '@/providers/seller-modal-provider'
import React from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { api } from "@/trpc/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { useDeleteModal } from "@/hooks/use-delete-modal";
import { useToast } from "@/components/ui/use-toast";
import { DeleteProductModal } from "@/components/modals/delete-product-modal";
import type { User } from '@prisma/client'

const SellerClient = ({data} : {data: User[]}) => {
  type SellerData = {
    id: string | null;
    name: string | undefined | null;
    email: string | undefined | null;
    role: string | undefined | null;
  };
  const subsetData: SellerData[] = data.map((item) => ({
    id: item.id,
    name: item.firstName + " " + item.lastName,
    email: item.email,
    role: item.role,
  }));

  const columns: ColumnDef<SellerData>[] = [
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
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "role",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Role
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const user = row.original;
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
              <Button className="bg-red-700 hover:bg-red-800 h-[30px] mt-1 mb-1 text-white font-normal" onClick={onOpen}>Delete Product</Button>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const onOpen = useSellerModal((state) => state.onOpen)
  return (
    <>
      <SellerModalProvider />
      <div className="p-5">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold">
                Sellers
              </h1>
              <h1 className="text-md">List of sellers on the store</h1>
            </div>
            <Button onClick={onOpen}>
              Add Seller
            </Button>
          </div>
          <Separator className="mt-5" />
          <DataTable columns={columns} data={subsetData} filterFor="name" />
          </div>
    </>
  )
}

export default SellerClient