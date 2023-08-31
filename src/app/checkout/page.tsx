"use client";

import React from "react";
import { api } from "@/trpc/client";
import { useState } from "react";

interface Order {
  id: string;
  date: Date;
  userId: string;
  status: string;
  total: number;
  createdAt: Date;
  updatedAt: Date;
  addressId: string;
}

export default function Checkout() {
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<Order | null | undefined>(null);
  const handleOrder = async () => {
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
        },
      });
      setOrder(result);
      console.log(order);
      setLoading(false);
    } catch (error) {
      console.error("Error creating new order:", error);
    }
  };

  return (
    <div className="p-5">
      <h1 className="mb-5 text-xl">Checkout Page</h1>
      <div>
        <button
          disabled={loading}
          className="w-full rounded-md bg-black p-2 text-white hover:bg-slate-800 disabled:bg-slate-600"
          onClick={handleOrder}
        >
          Generate Sample Order
        </button>
      </div>
    </div>
  );
}
