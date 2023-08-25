"use client"

import React from 'react'
import { api } from "@/trpc/client";
import { useState } from 'react';

interface Order {
  id: string;
  date: Date;
  userId: String;
  status: String;
  total: number;    
  createdAt: Date;
  updatedAt: Date;
  addressId: string;
}


export default function Checkout() {
    const [loading, setLoading] = useState(false);
    const [order, setOrder] = useState<Order | null | undefined>(null);
      const handleOrder = async() => {
        try {
            setLoading(true);
            const result = await api.order.create.mutate({
              status: "Created",
              total: 100,
              address: {
                name: "Aakhil",
                street: "123 Main St",
                city: "San Francisco",
                state: "CA",
                postalCode: "94103",
                country: "India",
              }
            })
            setOrder(result);
            console.log(order)
            setLoading(false);
          } catch (error) {
            console.error("Error creating new order:", error);
          }
      }

  return (
    <div className="p-5">
        <h1 className="text-xl mb-5">Checkout Page</h1>
        <div>
        <button disabled={loading} className="disabled:bg-slate-600 bg-black w-full p-2 text-white rounded-md hover:bg-slate-800" onClick={handleOrder}>Generate Sample Order</button>

        </div>
    </div>
  )
}