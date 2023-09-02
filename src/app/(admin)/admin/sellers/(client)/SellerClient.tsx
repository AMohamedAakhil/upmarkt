"use client"
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useSellerModal } from '@/hooks/use-seller-modal'
import { SellerModalProvider } from '@/providers/seller-modal-provider'
import React from 'react'

const SellerClient = () => {
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
          </div>
    </>
  )
}

export default SellerClient