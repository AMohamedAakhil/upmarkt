"use client"

import { api } from "@/trpc/client";

export default function Home() {
  /*

  const createNewOrder = async () => {
    try {
      const result = await api.order.create.mutate({
          orderData: {
            customerName: "asdfasdf sddsdfsdfas",
            status: "Sundals",
            total: 100.00,
            orderStatus: "New",
            paymentMethod: "Credit Card",
            paymentReference: "1234567890",
          },
          addressData: {
            name: "John Doe",
            street: "123 Main St",
            city: "Sample City",
            state: "CA",
            postalCode: "12345",
            country: "USA",
          }
      });
      console.log("New order created:", result);
    } catch (error) {
      console.error("Error creating new order:", error);
    }
  };
  
  
  
  createNewOrder();

  */

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">

    </main>
  );
}
